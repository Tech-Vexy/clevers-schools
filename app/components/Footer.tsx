import React from 'react';
import { Mail, PhoneCall, MapPin, Facebook, Youtube, Instagram, Twitter, Globe, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Logo } from './Logo';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="bg-gray-900 text-gray-300 mt-auto w-full">
            {/* Newsletter Subscription Bar */}
            <div className="bg-emerald-700 py-6">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div>
                            <h3 className="text-white text-lg md:text-xl font-bold">Subscribe to Our Newsletter</h3>
                            <p className="text-emerald-100 text-sm">Get weekly updates and educational resources</p>
                        </div>
                        <div className="w-full md:w-auto">
                            <form className="flex">
                                <input 
                                    type="email" 
                                    placeholder="Your email address" 
                                    className="px-4 py-2 w-full md:w-64 rounded-l-md focus:outline-none"
                                />
                                <button 
                                    type="submit" 
                                    className="bg-gray-900 text-white px-4 py-2 rounded-r-md hover:bg-gray-800 transition-colors flex items-center"
                                >
                                    Subscribe <ArrowRight className="ml-2 h-4 w-4" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main footer container */}
            <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {/* Logo and Tagline */}
                <div className="flex flex-col items-center mb-10">
                    <Logo className="h-10 w-auto text-white" />
                    <p className="mt-3 text-center text-gray-400 max-w-md">
                        Empowering students with quality educational resources for academic excellence
                    </p>
                </div>

                {/* Grid container with responsive columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Contact Information */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-white border-b border-gray-700 pb-2">Contact Us</h2>
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

                    {/* Resources */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-white border-b border-gray-700 pb-2">Resources</h2>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/kcse"
                                    className="hover:text-white transition-colors duration-200 text-sm lg:text-base hover:translate-x-1 inline-block"
                                >
                                    KCSE Revision Materials
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/schemes"
                                    className="hover:text-white transition-colors duration-200 text-sm lg:text-base hover:translate-x-1 inline-block"
                                >
                                    Schemes of Work
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/quizes"
                                    className="hover:text-white transition-colors duration-200 text-sm lg:text-base hover:translate-x-1 inline-block"
                                >
                                    Weekly Quizzes
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/revision-booklets"
                                    className="hover:text-white transition-colors duration-200 text-sm lg:text-base hover:translate-x-1 inline-block"
                                >
                                    Revision Booklets
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-white border-b border-gray-700 pb-2">Quick Links</h2>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="https://clevers.co.ke/founder"
                                    className="hover:text-white transition-colors duration-200 text-sm lg:text-base hover:translate-x-1 inline-block"
                                    aria-label="About Us"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/subscribe"
                                    className="hover:text-white transition-colors duration-200 text-sm lg:text-base hover:translate-x-1 inline-block"
                                >
                                    Subscription Plans
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://clevers.co.ke/"
                                    className="hover:text-white transition-colors duration-200 text-sm lg:text-base hover:translate-x-1 inline-block"
                                    aria-label="Visit Our Website"
                                >
                                    Visit Our Website
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/research"
                                    className="hover:text-white transition-colors duration-200 text-sm lg:text-base hover:translate-x-1 inline-block"
                                >
                                    Research Papers
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-white border-b border-gray-700 pb-2">Follow Us</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <a
                                href="https://www.facebook.com/cleverskenya.org"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gray-800 hover:bg-blue-600 transition-colors duration-200 p-3 rounded-lg flex flex-col items-center"
                                aria-label="Facebook"
                            >
                                <Facebook className="h-6 w-6" />
                                <span className="text-xs mt-1">Facebook</span>
                            </a>
                            <a
                                href="https://www.youtube.com/@cleversschool8832"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gray-800 hover:bg-red-600 transition-colors duration-200 p-3 rounded-lg flex flex-col items-center"
                                aria-label="YouTube"
                            >
                                <Youtube className="h-6 w-6" />
                                <span className="text-xs mt-1">YouTube</span>
                            </a>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gray-800 hover:bg-purple-600 transition-colors duration-200 p-3 rounded-lg flex flex-col items-center"
                                aria-label="Instagram"
                            >
                                <Instagram className="h-6 w-6" />
                                <span className="text-xs mt-1">Instagram</span>
                            </a>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gray-800 hover:bg-blue-400 transition-colors duration-200 p-3 rounded-lg flex flex-col items-center"
                                aria-label="Twitter"
                            >
                                <Twitter className="h-6 w-6" />
                                <span className="text-xs mt-1">Twitter</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-400">&copy; {currentYear} Clevers Schools. All rights reserved.</p>
                    <div className="flex space-x-4 text-sm text-gray-400">
                        <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
                        <Link href="/terms-of-service" className="hover:text-white">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;