import React from "react";

const Footer = () => {
  return (
    <footer className="bg-amber-50 border-t py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-xl font-bold mb-2 md:mb-0">UrbanNest</h1>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} UrbanNest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
