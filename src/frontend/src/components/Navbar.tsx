import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { MapPin, Menu, X } from "lucide-react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function Navbar() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const qc = useQueryClient();
  const [menuOpen, setMenuOpen] = useState(false);

  const isAuthenticated = !!identity;

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      qc.clear();
    } else {
      try {
        await login();
      } catch (e: any) {
        if (e?.message === "User is already authenticated") {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  const navLinks = [
    { label: "Categories", to: "/search" },
    { label: "How it Works", to: "/" },
    { label: "Add Business", to: "/vendor" },
    { label: "Vendor Portal", to: "/vendor" },
    { label: "Admin", to: "/admin" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-card shadow-xs border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-xl text-primary"
          data-ocid="nav.link"
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          <span>
            Dhoondho<span className="text-orange">.App</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to as string}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              data-ocid="nav.link"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated && (
            <span className="text-sm text-muted-foreground">Signed in</span>
          )}
          <Button
            onClick={handleAuth}
            disabled={loginStatus === "logging-in"}
            className="bg-primary hover:bg-primary/90 text-white rounded-full"
            data-ocid="nav.button"
          >
            {loginStatus === "logging-in"
              ? "Signing in..."
              : isAuthenticated
                ? "Sign Out"
                : "Sign In"}
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="md:hidden p-2 text-foreground"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          data-ocid="nav.toggle"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-card border-t border-border px-4 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to as string}
              className="text-sm font-medium text-foreground py-2"
              onClick={() => setMenuOpen(false)}
              data-ocid="nav.link"
            >
              {link.label}
            </Link>
          ))}
          <Button
            onClick={() => {
              handleAuth();
              setMenuOpen(false);
            }}
            disabled={loginStatus === "logging-in"}
            className="bg-primary text-white rounded-full mt-2"
            data-ocid="nav.button"
          >
            {isAuthenticated ? "Sign Out" : "Sign In"}
          </Button>
        </div>
      )}
    </header>
  );
}
