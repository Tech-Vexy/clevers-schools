import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const ScrollButtons = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);

        const handleScroll = () => {
            setScrollPosition(window.pageYOffset);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollUp = () => {
        if (isClient) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    const scrollDown = () => {
        if (isClient) {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="fixed bottom-40 right-4 flex flex-col space-y-2">
            <button
                className="p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                onClick={scrollUp}
                disabled={scrollPosition === 0}
            >
                <ChevronUp size={20} />
            </button>
            <button
                className="p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                onClick={scrollDown}
                disabled={isClient && window.pageYOffset + window.innerHeight >= document.body.scrollHeight}
            >
                <ChevronDown size={20} />
            </button>
        </div>
    );
};

export default ScrollButtons;