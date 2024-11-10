import React from 'react';
import { Mail, PhoneCall, MapPin, Facebook, Youtube, Globe } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-headertext lg:ml-64 md:ml-60 sm:ml-0 transition-all duration-300">
            {/* Main footer container with responsive margin */}
            <div className="max-w-screen-xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                {/* Grid container with responsive columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* Contact Information */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold">Contact Us</h2>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="mailto:info@clevers.co.ke"
                                    className="flex items-center space-x-2 hover:opacity-80 transition-colors duration-200 text-sm lg:text-base"
                                >
                                    <Mail className="h-4 w-4 lg:h-5 lg:w-5 flex-shrink-0" />
                                    <span>info@clevers.co.ke</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="tel:+254725449122"
                                    className="flex items-center space-x-2 hover:opacity-80 transition-colors duration-200 text-sm lg:text-base"
                                >
                                    <PhoneCall className="h-4 w-4 lg:h-5 lg:w-5 flex-shrink-0" />
                                    <span>+254725449122</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://maps.app.goo.gl/rtoW3cY5wWmvAA5e7"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start space-x-2 hover:opacity-80 transition-colors duration-200 text-sm lg:text-base"
                                >
                                    <MapPin className="h-4 w-4 lg:h-5 lg:w-5 flex-shrink-0 mt-1" />
                                    <span className="flex-1">Mitihani house 3rd floor, along Mfangano Street opposite KNUT HOUSE</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold">Quick Links</h2>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="https://clevers.co.ke/founder"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:opacity-80 transition-colors duration-200 text-sm lg:text-base"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li className='flex'>
                                <Link
                                    href="https://clevers.co.ke/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:opacity-80 transition-colors duration-200 text-sm lg:text-base"
                                >
                                    <Globe />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold">Follow Us</h2>
                        <ul className="flex space-x-4">
                            <li>
                                <Link
                                    href="https://www.facebook.com/cleverskenya.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:opacity-80 transition-colors duration-200"
                                    aria-label="Facebook"
                                >
                                    <Facebook className="h-5 w-5 lg:h-6 lg:w-6" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://www.youtube.com/@cleversschool8832"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:opacity-80 transition-colors duration-200"
                                    aria-label="YouTube"
                                >
                                    <Youtube className="h-5 w-5 lg:h-6 lg:w-6" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-4 border-t border-gray-600 text-center">
                    <p className="text-sm lg:text-base">&copy; {new Date().getFullYear()} Clevers Schools. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;