import Link from "next/link";
import Image from "next/image";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaPinterest,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import TechStoreSvg from "../public/images/icon.svg";

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src={TechStoreSvg}
                alt="TechStore Logo"
                width={40}
                height={40}
              />
              <span className="text-2xl font-bold">TechStore</span>
            </Link>
          </div>

          <div className="mb-6 md:mb-0">
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <div className="space-y-2">
              <p className="flex items-center space-x-2">
                <FaEnvelope className="text-gray-600" />
                <a
                  href="mailto:hr@techstore.com"
                  className="text-gray-600 hover:text-black"
                >
                  hr@techstore.com
                </a>
              </p>
              <p className="flex items-center space-x-2">
                <FaPhone className="text-gray-600" />
                <a
                  href="tel:+919904867973"
                  className="text-gray-600 hover:text-black"
                >
                  777-048-7973
                </a>
              </p>
              <div className="mt-2 flex items-start space-x-2">
                <FaMapMarkerAlt className="text-gray-600 mt-1" />
                <div>
                  <p className="font-medium">TechStore PVT LTD</p>
                  <p className="text-gray-600">Near Gangotari Circle</p>
                  <p className="text-gray-600">BTM Layout, 1st Stage,</p>
                  <p className="text-gray-600">Bangalore 560076, Karnataka.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-600 hover:text-black">
                <FaFacebook size={20} />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-black">
                <FaTwitter size={20} />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-black">
                <FaLinkedin size={20} />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-black">
                <FaInstagram size={20} />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-black">
                <FaPinterest size={20} />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-black">
                <FaYoutube size={20} />
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 pt-4 border-t text-sm text-gray-600">
          © {new Date().getFullYear()} by TechStore All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
