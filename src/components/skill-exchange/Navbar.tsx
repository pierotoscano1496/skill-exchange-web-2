import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-accent-primary font-montserrat text-2xl">
          ServiceExchange
        </div>
        <div className="flex space-x-4">
          <Link href="/" className="text-primary hover:text-accent-primary">
            Home
          </Link>
          <Link
            href="/about"
            className="text-primary hover:text-accent-primary"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-primary hover:text-accent-primary"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
