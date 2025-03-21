import React from 'react';
import { Mail, PhoneCall, MapPin, Facebook, Youtube, Globe } from 'lucide-react';
import Link from 'next/link';
import { Logo } from './Logo';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="bg-gray-900 text-gray-300 mt-auto w-full">
            {/* Main footer container */}
            <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {/* Grid container with responsive columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Contact Information */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-white">Contact Us</h2>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href="mailto:info@clevers.co.ke"
                                    className="flex items-center space-x-3 hover:text-white transition-colors duration-200 text-sm lg:text-base group"
                                >
                                    <Mail className="h-5 w-5 lg:h-6 lg:w-6 flex-shrink-0 group-hover:text-blue-400" />
                                    <span>info@clevers.co.ke</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="tel:+254725449122"
                                    className="flex items-center space-x-3 hover:text-white transition-colors duration-200 text-sm lg:text-base group"
                                >
                                    <PhoneCall className="h-5 w-5 lg:h-6 lg:w-6 flex-shrink-0 group-hover:text-green-400" />
                                    <span>+254725449122</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://maps.app.goo.gl/rtoW3cY5wWmvAA5e7"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start space-x-3 hover:text-white transition-colors duration-200 text-sm lg:text-base group"
                                >
                                    <MapPin className="h-5 w-5 lg:h-6 lg:w-6 flex-shrink-0 mt-1 group-hover:text-red-400" />
                                    <span className="flex-1">Mitihani house 3rd floor, along Mfangano Street opposite KNUT HOUSE</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-white">Quick Links</h2>
                        <ul className="space-y-4">
                            <li>
                                <Link
                                    href="https://clevers.co.ke/founder"
                                    className="hover:text-white transition-colors duration-200 text-sm lg:text-base flex items-center space-x-2"
                                    aria-label="About Us"
                                >
                                    <Logo className="h-5 w-5 lg:h-6 lg:w-6" />
                                    <span>About Us</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://clevers.co.ke/"
                                    className="hover:text-white transition-colors duration-200 text-sm lg:text-base flex items-center space-x-2"
                                    aria-label="Visit Our Website"
                                >
                                    <Globe className="h-5 w-5 lg:h-6 lg:w-6" />
                                    <span>Visit Our Website</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-white">Follow Us</h2>
                        <ul className="flex space-x-6">
                            <li>
                                <a
                                    href="https://www.facebook.com/cleverskenya.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-blue-400 transition-colors duration-200"
                                    aria-label="Facebook"
                                >
                                    <Facebook className="h-6 w-6 lg:h-8 lg:w-8" />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.youtube.com/@cleversschool8832"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-red-500 transition-colors duration-200"
                                    aria-label="YouTube"
                                >
                                    <Youtube className="h-6 w-6 lg:h-8 lg:w-8" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-6 border-t border-gray-700">
                    <p className="text-sm lg:text-base text-center text-gray-400">&copy; {currentYear} Clevers Schools. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;