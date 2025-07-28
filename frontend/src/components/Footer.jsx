import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-base-100 w-full text-base-content px-6 py-4 mt-10 border-t border-base-300">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm">&copy; {new Date().getFullYear()} Think Blogs. All rights reserved.</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-accent transition text-sm">Privacy Policy</a>
          <a href="#" className="hover:text-accent transition text-sm">Terms of Service</a>
          <a href="#" className="hover:text-accent transition text-sm">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
