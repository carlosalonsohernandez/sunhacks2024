import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white py-6">
      {/* Removed the container class */}
      <div className="w-full px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold">Company Name</h1>
          <p className="text-gray-400">© {new Date().getFullYear()} All Rights Reserved</p>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link href="/about">
            About Us
          </Link>
          <Link href="/contact">Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
