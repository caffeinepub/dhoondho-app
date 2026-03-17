import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Location {
    lat: Latitude;
    lng: Longitude;
}
export interface Category {
    id: bigint;
    icon: string;
    name: string;
    description: string;
}
export type Time = bigint;
export interface Listing {
    id: bigint;
    categoryId: bigint;
    status: ListingStatus;
    owner: Principal;
    city: City;
    name: string;
    description: string;
    photoIds: Array<string>;
    createdTime: Time;
    website: string;
    state: State;
    address: string;
    phone: string;
    location: Location;
}
export type Latitude = number;
export type City = string;
export interface ListingInput {
    categoryId: bigint;
    city: City;
    name: string;
    description: string;
    photoIds: Array<string>;
    website: string;
    state: State;
    address: string;
    phone: string;
    location: Location;
}
export type DistanceKm = number;
export type State = string;
export interface Vendor {
    principal: Principal;
    name: string;
    businessName: string;
    phone: string;
}
export interface UserProfile {
    name: string;
    businessName: string;
    phone: string;
}
export type Longitude = number;
export enum ListingStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum SortBy {
    byName = "byName",
    byDistance = "byDistance"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addCategory(category: Category): Promise<void>;
    addVendor(vendor: Vendor): Promise<void>;
    adminDeleteListing(listingId: bigint): Promise<void>;
    adminUpdateListing(listingId: bigint, input: ListingInput): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    changeListingStatus(listingId: bigint, newStatus: ListingStatus): Promise<void>;
    deleteCategory(categoryId: bigint): Promise<void>;
    deleteListing(listingId: bigint): Promise<void>;
    deletePendingListingsRange(startId: bigint, endId: bigint): Promise<void>;
    getAllVendors(): Promise<Array<Vendor>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCategories(): Promise<Array<Category>>;
    getListingsByCategoryAndLocation(categoryId: bigint, center: Location, radius: DistanceKm, sortBy: SortBy): Promise<Array<Listing>>;
    getPendingListings(): Promise<Array<Listing>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchListingsByCity(city: string): Promise<Array<Listing>>;
    submitListing(input: ListingInput): Promise<void>;
    updateCategory(categoryId: bigint, category: Category): Promise<void>;
    updateListing(listingId: bigint, input: ListingInput): Promise<void>;
}
