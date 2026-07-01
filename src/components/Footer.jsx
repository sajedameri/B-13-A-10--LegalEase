'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  const pathname = usePathname();
  if (pathname.includes('dashboard')) {
    return null;
  }
  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-3">
        {/* Logo & Copyright */}
        <div>
          <h2 className="text-2xl font-bold text-white">LegalEase</h2>

          <p className="mt-4 text-sm">Find & Hire Expert Legal Counsel.</p>

          <p className="mt-6 text-sm">
            © {new Date().getFullYear()} LegalEase. All Rights Reserved.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">Quick Links</h3>

          <div className="space-y-3">
            <Link href="/about" className="block hover:text-blue-500">
              About
            </Link>

            <Link href="/contact" className="block hover:text-blue-500">
              Contact
            </Link>

            <Link href="/privacy-policy" className="block hover:text-blue-500">
              Privacy Policy
            </Link>
          </div>
        </div>

        {/* Newsletter & Social Icons */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">Newsletter</h3>

          <p className="mb-4 text-sm">Subscribe to get legal updates.</p>

          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="w-full rounded-lg border border-gray-700 bg-slate-800 px-4 py-2 outline-none"
            />

            <button className="rounded-lg bg-blue-600 px-4 py-2 text-white">Join</button>
          </div>

          {/* Social Icons */}
          <div className="mt-6 flex gap-4 text-xl">
            <a href="#" className="hover:text-blue-500">
              <FaFacebookF />
            </a>

            <a href="#" className="hover:text-blue-500">
              <FaTwitter />
            </a>

            <a href="#" className="hover:text-blue-500">
              <FaLinkedinIn />
            </a>

            <a href="#" className="hover:text-blue-500">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
