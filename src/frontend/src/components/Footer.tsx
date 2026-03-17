import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import type { SearchParams } from "../App";

const emptySearch: SearchParams = {};

export default function Footer() {
  const year = new Date().getFullYear();
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer className="bg-navy text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-10 border-b border-white/10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-orange flex items-center justify-center">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg">
                Dhoondho<span className="text-orange">.App</span>
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              India's local business search engine. Find trusted services near
              you.
            </p>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold text-sm mb-3 text-white/80 uppercase tracking-wide">
              About
            </h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  How it Works
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Browse */}
          <div>
            <h4 className="font-semibold text-sm mb-3 text-white/80 uppercase tracking-wide">
              Browse Categories
            </h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <Link
                  to="/search"
                  search={emptySearch}
                  className="hover:text-white transition-colors"
                >
                  Restaurants
                </Link>
              </li>
              <li>
                <Link
                  to="/search"
                  search={emptySearch}
                  className="hover:text-white transition-colors"
                >
                  Doctors &amp; Clinics
                </Link>
              </li>
              <li>
                <Link
                  to="/search"
                  search={emptySearch}
                  className="hover:text-white transition-colors"
                >
                  Salons &amp; Spas
                </Link>
              </li>
              <li>
                <Link
                  to="/search"
                  search={emptySearch}
                  className="hover:text-white transition-colors"
                >
                  Plumbers
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm mb-3 text-white/80 uppercase tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <Link
                  to="/vendor"
                  className="hover:text-white transition-colors"
                >
                  Add Business
                </Link>
              </li>
              <li>
                <Link
                  to="/vendor"
                  className="hover:text-white transition-colors"
                >
                  Vendor Portal
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="hover:text-white transition-colors"
                >
                  Admin Panel
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm mb-3 text-white/80 uppercase tracking-wide">
              Contact Us
            </h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>support@dhoondho.app</li>
              <li>+91 98000 00000</li>
              <li>Mon–Sat, 9 AM–6 PM</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/50">
          <span>© {year} Dhoondho.App. All rights reserved.</span>
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/80 transition-colors"
          >
            Built with ❤️ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
