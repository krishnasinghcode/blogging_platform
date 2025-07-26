import React from 'react';

const Footer = () => {
  return (
    <footer className=" bg-grey w-full bg-background text-text px-6 py-4 mt-10 border-t border-gray-300">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-primary-content">&copy; {new Date().getFullYear()} Think Blogs. All rights reserved.</div>
        <div className="flex gap-6">
          <a href="#" className="text-primary-content hover:text-accent transition text-sm">Privacy Policy</a>
          <a href="#" className="text-primary-content hover:text-accent transition text-sm">Terms of Service</a>
          <a href="#" className="text-primary-content hover:text-accent transition text-sm">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
