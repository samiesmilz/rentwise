import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/images/logo-white.png";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-black text-white py-4 mt-24">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="mb-4 md:mb-0">
          <Image src={logo} alt="Logo" className="h-8 w-auto" />
        </div>
        <div className="flex flex-wrap justify-center md:justify-start mb-4 md:mb-0">
          <ul className="flex space-x-4">
            <li>
              <Link href="/properties">Properties</Link>
            </li>
            <li className="text">
              | <Link href="/">Terms of Service</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text text-white mt-2 md:mt-0">
            &copy; {currentYear} JustCoHost. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
