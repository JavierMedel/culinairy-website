"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import CulinAIryioLogo from './CulinAIryioLogo';
import EmailPopup from '@/components/EmailPopup';
import { ThemeToggle } from '@/components/ThemeToggle';

interface HeaderWithTransparencyProps {
  showNav?: boolean;
  showWaitlist?: boolean;
  backLink?: string;
  backLinkText?: string;
}

const HeaderWithTransparency = ({
  showNav = true,
  showWaitlist = true,
  backLink,
  backLinkText
}: HeaderWithTransparencyProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scroll direction and visibility
      setIsVisible(currentScrollY < lastScrollY.current || currentScrollY < 10);
      
      // Update scroll state
      if (currentScrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initial check in case page is loaded scrolled down
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`w-full py-4 px-4 md:px-8 flex items-center justify-between border-b dark:border-gray-800 border-culinairy-teal fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled 
        ? 'dark:bg-gradient-to-r dark:from-culinairy-darkTeal/90 dark:to-culinairy-darkBlue/90 bg-gradient-to-r from-white/90 to-culinairy-lightGray/30 backdrop-blur-sm' 
        : 'dark:bg-gradient-to-r dark:from-culinairy-darkTeal dark:to-culinairy-darkBlue bg-gradient-to-r from-white to-culinairy-lightGray/50'} ${!isVisible ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <div className="flex items-center">
        <Link href={backLink || "/"} className="flex items-center">
          <CulinAIryioLogo />
          {backLink && backLinkText && (
            <span className="text-culinairy-teal hover:text-culinairy-cyan transition-colors inline-flex items-center ml-4">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {backLinkText}
            </span>
          )}
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        {showNav && (
          <nav className="hidden md:flex items-center justify-center space-x-6 mr-4 dark:text-white text-culinairy-darkBlue">
            <a
              href="#features"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-culinairy-teal transition-colors cursor-pointer font-medium"
            >
              Features
            </a>
            <a
              href="#faq"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-culinairy-teal transition-colors cursor-pointer font-medium"
            >
              FAQs
            </a>
            <Link
              href="/recipes"
              className="hover:text-culinairy-teal transition-colors cursor-pointer font-medium"
            >
              Recipes
            </Link>
          </nav>
        )}
        <ThemeToggle />
        {showWaitlist && <EmailPopup triggerText="Join Waitlist" />}
      </div>
    </header>
  );
};

export default HeaderWithTransparency;