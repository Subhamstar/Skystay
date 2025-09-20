import React from "react";
import facebook from "../../assets/socialMedia/facebook.png";
import twitter from "../../assets/socialMedia/twitter.png";
import linkedin from "../../assets/socialMedia/linkedin.png";
import github from "../../assets/socialMedia/github.png";

const Footer = () => {
  const socialLinks = [
    { src: facebook, link: "https://facebook.com", alt: "Facebook" },
    { src: twitter, link: "https://twitter.com", alt: "Twitter" },
    { src: github, link: "https://github.com/Subhamstar", alt: "GitHub" },
    { src: linkedin, link: "https://linkedin.com", alt: "LinkedIn" },
  ];

  return (
    <footer className="bg-gradient-to-t from-blue-50 via-white to-purple-50 pt-12 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          
          {/* Brand & Social */}
          <div>
            <h4 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              <span className="text-pink-600">No 1</span> Trusted Home Rental
            </h4>
            <p className="text-gray-600 mb-4">
              Find us on any of these platforms, we respond within 1-2 business days.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-3 rounded-full shadow-md hover:scale-110 hover:shadow-lg transition transform duration-300"
                >
                  <img src={item.src} alt={item.alt} className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h5 className="text-lg font-semibold text-gray-700 mb-3">Company</h5>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-600 hover:text-gray-900 transition">About Us</a></li>
              <li><a href="/" className="text-gray-600 hover:text-gray-900 transition">Team</a></li>
              <li><a href="/" className="text-gray-600 hover:text-gray-900 transition">Careers</a></li>
              <li><a href="/" className="text-gray-600 hover:text-gray-900 transition">Blog</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h5 className="text-lg font-semibold text-gray-700 mb-3">Resources</h5>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-600 hover:text-gray-900 transition">FAQ</a></li>
              <li><a href="/" className="text-gray-600 hover:text-gray-900 transition">Guides</a></li>
              <li><a href="/" className="text-gray-600 hover:text-gray-900 transition">Help Center</a></li>
              <li><a href="/" className="text-gray-600 hover:text-gray-900 transition">Terms of Service</a></li>
            </ul>
          </div>

          {/* Support / Contact */}
          <div>
            <h5 className="text-lg font-semibold text-gray-700 mb-3">Support</h5>
            <ul className="space-y-2">
              <li><a href="mailto:support@abash.com" className="text-gray-600 hover:text-gray-900 transition">support@abash.com</a></li>
              <li><a href="tel:+911234567890" className="text-gray-600 hover:text-gray-900 transition">+91 987654321</a></li>
              <li><a href="/" className="text-gray-600 hover:text-gray-900 transition">Contact Form</a></li>
              <li><a href="/" className="text-gray-600 hover:text-gray-900 transition">Live Chat</a></li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-300 mb-6" />

        <div className="text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Subham. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
