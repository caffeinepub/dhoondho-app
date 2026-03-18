import Map "mo:core/Map";
import Set "mo:core/Set";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Float "mo:core/Float";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Char "mo:core/Char";
import Int "mo:core/Int";
import List "mo:core/List";
import Bool "mo:core/Bool";
import Principal "mo:core/Principal";
import MixinStorage "blob-storage/Mixin";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  type City = Text;
  type State = Text;
  type DistanceKm = Float;
  type Latitude = Float;
  type Longitude = Float;

  type Category = {
    id : Nat;
    name : Text;
    icon : Text;
    description : Text;
  };

  module Category {
    public func compare(a : Category, b : Category) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  type Location = {
    lat : Latitude;
    lng : Longitude;
  };

  type ListingStatus = {
    #pending;
    #approved;
    #rejected;
  };

  type Listing = {
    id : Nat;
    name : Text;
    categoryId : Nat;
    address : Text;
    city : City;
    state : State;
    phone : Text;
    description : Text;
    website : Text;
    location : Location;
    photoIds : [Text];
    status : ListingStatus;
    owner : Principal;
    createdTime : Time.Time;
  };

  module Listing {
    public func compare(a : Listing, b : Listing) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  type Vendor = {
    principal : Principal;
    name : Text;
    businessName : Text;
    phone : Text;
  };

  module Vendor {
    public func compare(a : Vendor, b : Vendor) : Order.Order {
      Text.compare(a.businessName, b.businessName);
    };
  };

  type ListingInput = {
    name : Text;
    categoryId : Nat;
    address : Text;
    city : City;
    state : State;
    phone : Text;
    description : Text;
    website : Text;
    location : Location;
    photoIds : [Text];
  };

  public type UserProfile = {
    name : Text;
    businessName : Text;
    phone : Text;
  };

  let nextCategoryId = Map.empty<Nat, Category>();
  let categories = Map.empty<Nat, Category>();
  let listings = Map.empty<Nat, Listing>();
  let vendors = Map.empty<Principal, Vendor>();
  let cityIndex = Map.empty<City, Set.Set<Nat>>();
  let pendingListings = Set.empty<Nat>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  let listingProximityQueue = List.empty<Nat>();
  let pendingListingsQueue = List.empty<Nat>();
  let tempVariable = List.empty<Nat>();

  var nextListingId = 1;
  var categoryCounter = 1;

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  // Custom mapFilter function for arrays
  func mapFilterArray<T, U>(array : [T], mappingFunction : (T) -> ?U) : [U] {
    let iter = array.values();
    let list = List.empty<U>();
    iter.forEach(
      func(item) {
        switch (mappingFunction(item)) {
          case (null) {};
          case (?value) { list.add(value) };
        };
      }
    );
    list.toArray();
  };

  // User Profile Management (required by frontend)
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Category Management - Public Read
  public query ({ caller }) func getCategories() : async [Category] {
    categories.values().toArray().sort();
  };

  // Category Management - Admin Only
  public shared ({ caller }) func addCategory(category : Category) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add categories");
    };

    let newCategory = {
      category with
      id = categoryCounter;
    };
    categories.add(categoryCounter, newCategory);
    categoryCounter += 1;
  };

  public shared ({ caller }) func updateCategory(categoryId : Nat, category : Category) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update categories");
    };

    switch (categories.get(categoryId)) {
      case (null) { Runtime.trap("Category not found"); };
      case (?_) {
        let updatedCategory = {
          category with
          id = categoryId;
        };
        categories.add(categoryId, updatedCategory);
      };
    };
  };

  public shared ({ caller }) func deleteCategory(categoryId : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete categories");
    };
    categories.remove(categoryId);
  };

  // Public Listing Search - Only returns approved listings
  public query ({ caller }) func searchListingsByCity(city : Text) : async [Listing] {
    switch (cityIndex.get(city)) {
      case (null) { [] };
      case (?listingIds) {
        let idArray = listingIds.toArray();
        let allListings = idArray.map(
          func(id) {
            listings.get(id);
          }
        );
        // Filter for approved listings only
        mapFilterArray(
          allListings,
          func(listing) {
            switch (listing) {
              case (null) { null };
              case (?l) {
                if (l.status == #approved) { ?l } else { null };
              };
            };
          }
        );
      };
    };
  };

  public type SortBy = {
    #byName;
    #byDistance;
  };

  // Public Listing Search by Category and Location - Only returns approved listings
  public query ({ caller }) func getListingsByCategoryAndLocation(
    categoryId : Nat,
    center : Location,
    radius : DistanceKm,
    sortBy : SortBy,
  ) : async [Listing] {
    var filteredListings : [Listing] = [];

    for ((_, listing) in listings.entries()) {
      // Only include approved listings for public access
      if ((listing.categoryId == categoryId) and (listing.status == #approved) and locationInRange(listing.location, center, radius)) {
        filteredListings := filteredListings.concat([listing]);
      };
    };

    // Sort based on sortBy parameter
    switch sortBy {
      case (#byName) {
        filteredListings.sort(
          func(a : Listing, b : Listing) : Order.Order {
            Text.compare(a.name, b.name);
          }
        );
      };
      case (#byDistance) {
        filteredListings.sort(
          func(a : Listing, b : Listing) : Order.Order {
            let distA = calculateDistance(a.location, center);
            let distB = calculateDistance(b.location, center);
            Float.compare(distA, distB);
          }
        );
      };
    };
  };

  // Vendor Listing Management
  public shared ({ caller }) func submitListing(input : ListingInput) : async () {
    // Allow user, vendor (user role), and admin roles; auto-register if needed
    if (caller.isAnonymous()) {
      Runtime.trap("Please log in to submit a listing");
    };
    if (accessControlState.userRoles.get(caller) == null) {
      accessControlState.userRoles.add(caller, #user);
    };



    let newListing = {
      id = nextListingId;
      name = input.name;
      categoryId = input.categoryId;
      address = input.address;
      city = input.city;
      state = input.state;
      phone = input.phone;
      description = input.description;
      website = input.website;
      location = input.location;
      photoIds = input.photoIds;
      status = #pending;
      owner = caller;
      createdTime = Time.now();
    };

    listings.add(nextListingId, newListing);
    updateCityIndex(input.city, nextListingId);
    pendingListings.add(nextListingId);

    nextListingId += 1;
  };

  public shared ({ caller }) func updateListing(listingId : Nat, input : ListingInput) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only vendors can update listings");
    };

    switch (listings.get(listingId)) {
      case (null) { Runtime.trap("Listing not found"); };
      case (?listing) {
        // Vendors can only update their own listings
        if (listing.owner != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only update your own listings");
        };

        let updatedListing = {
          id = listingId;
          name = input.name;
          categoryId = input.categoryId;
          address = input.address;
          city = input.city;
          state = input.state;
          phone = input.phone;
          description = input.description;
          website = input.website;
          location = input.location;
          photoIds = input.photoIds;
          status = listing.status; // Preserve status
          owner = listing.owner; // Preserve owner
          createdTime = listing.createdTime; // Preserve creation time
        };

        listings.add(listingId, updatedListing);
        updateCityIndex(input.city, listingId);
      };
    };
  };

  public shared ({ caller }) func deleteListing(listingId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only vendors can delete listings");
    };

    switch (listings.get(listingId)) {
      case (null) { Runtime.trap("Listing not found"); };
      case (?listing) {
        // Vendors can only delete their own listings
        if (listing.owner != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only delete your own listings");
        };

        listings.remove(listingId);
        pendingListings.remove(listingId);
        // Remove from city index
        switch (cityIndex.get(listing.city)) {
          case (null) {};
          case (?listingsSet) {
            listingsSet.remove(listingId);
          };
        };
      };
    };
  };

  // Admin Listing Management
  public shared ({ caller }) func changeListingStatus(listingId : Nat, newStatus : ListingStatus) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can change listing status");
    };

    switch (listings.get(listingId)) {
      case (null) { Runtime.trap("Listing not found"); };
      case (?listing) {
        let updatedListing = {
          listing with
          status = newStatus;
        };
        listings.add(listingId, updatedListing);

        // Update pending listings set
        if (newStatus != #pending) {
          pendingListings.remove(listingId);
        } else {
          pendingListings.add(listingId);
        };
      };
    };
  };

  public shared ({ caller }) func adminUpdateListing(listingId : Nat, input : ListingInput) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can edit any listing");
    };

    switch (listings.get(listingId)) {
      case (null) { Runtime.trap("Listing not found"); };
      case (?listing) {
        let updatedListing = {
          id = listingId;
          name = input.name;
          categoryId = input.categoryId;
          address = input.address;
          city = input.city;
          state = input.state;
          phone = input.phone;
          description = input.description;
          website = input.website;
          location = input.location;
          photoIds = input.photoIds;
          status = listing.status;
          owner = listing.owner;
          createdTime = listing.createdTime;
        };

        listings.add(listingId, updatedListing);
        updateCityIndex(input.city, listingId);
      };
    };
  };

  public shared ({ caller }) func adminDeleteListing(listingId : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete any listing");
    };

    switch (listings.get(listingId)) {
      case (null) { Runtime.trap("Listing not found"); };
      case (?listing) {
        listings.remove(listingId);
        pendingListings.remove(listingId);
        switch (cityIndex.get(listing.city)) {
          case (null) {};
          case (?listingsSet) {
            listingsSet.remove(listingId);
          };
        };
      };
    };
  };

  public query ({ caller }) func getPendingListings() : async [Listing] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view pending listings");
    };

    let pendingIds = pendingListings.toArray();
    mapFilterArray(
      pendingIds,
      func(id) {
        listings.get(id);
      }
    );
  };

  // Vendor Management
  public shared ({ caller }) func addVendor(vendor : Vendor) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can register as vendors");
    };

    // Ensure the vendor is registering themselves
    let vendorRecord = {
      vendor with
      principal = caller;
    };
    vendors.add(caller, vendorRecord);
  };

  public query ({ caller }) func getAllVendors() : async [Vendor] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all vendors");
    };

    vendors.values().toArray().sort();
  };

  // Admin bulk operations
  public shared ({ caller }) func deletePendingListingsRange(startId : Nat, endId : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete listings");
    };

    let range = Nat.range(startId, endId + 1).toArray();
    for (listingId in range.values()) {
      switch (listings.get(listingId)) {
        case (null) {};
        case (?listing) {
          if (listing.status == #pending) {
            listings.remove(listingId);
            pendingListings.remove(listingId);
            switch (cityIndex.get(listing.city)) {
              case (null) {};
              case (?listingsSet) {
                listingsSet.remove(listingId);
              };
            };
          };
        };
      };
    };
  };

  // Helper functions
  public type SortKey = {
    #byName;
    #byBusinessName;
  };

  func locationInRange(location1 : Location, location2 : Location, radius : DistanceKm) : Bool {
    let distance = calculateDistance(location1, location2);
    distance <= radius;
  };

  func calculateDistance(loc1 : Location, loc2 : Location) : DistanceKm {
    // Haversine formula for distance calculation
    let earthRadiusKm = 6371.0;
    let dLat = (loc2.lat - loc1.lat) * Float.pi / 180.0;
    let dLon = (loc2.lng - loc1.lng) * Float.pi / 180.0;

    let lat1Rad = loc1.lat * Float.pi / 180.0;
    let lat2Rad = loc2.lat * Float.pi / 180.0;

    let a = Float.sin(dLat / 2.0) * Float.sin(dLat / 2.0) +
            Float.sin(dLon / 2.0) * Float.sin(dLon / 2.0) *
            Float.cos(lat1Rad) * Float.cos(lat2Rad);
    let c = 2.0 * Float.arctan2(Float.sqrt(a), Float.sqrt(1.0 - a));

    earthRadiusKm * c;
  };

  func updateCityIndex(city : City, listingId : Nat) : () {
    switch (cityIndex.get(city)) {
      case (null) {
        let newSet = Set.fromArray<Nat>([listingId]);
        cityIndex.add(city, newSet);
      };
      case (?listingsSet) {
        listingsSet.add(listingId);
      };
    };
  };
};
