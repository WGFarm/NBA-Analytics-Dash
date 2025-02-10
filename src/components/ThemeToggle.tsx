'use client';

import { useState, useEffect } from 'react';
import { Button } from "@tremor/react";
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

export default function ThemeToggle() {
  // Initialize state from localStorage if available, otherwise default to false
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Update localStorage when darkMode changes
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  // Check system preference on initial load
  useEffect(() => {
    // Check if user has system-wide dark mode preference
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // If no saved preference, use system preference
    if (!localStorage.getItem('darkMode')) {
      setDarkMode(systemPrefersDark);
    }
  }, []);

  if (!mounted) return null;

  return (
    <Button
      size="xs"
      variant="secondary"
      className="p-2 relative overflow-hidden transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-700"
      onClick={() => {
        setDarkMode(!darkMode);
      }}
    >
      <div className="relative">
        <div
          className={`
            absolute top-0 left-0 transform transition-transform duration-500
            ${darkMode ? 'rotate-0 translate-y-0' : 'rotate-180 translate-y-full'}
          `}
        >
          <SunIcon className="h-5 w-5 text-yellow-500 theme-toggle-icon" />
        </div>
        <div
          className={`
            transform transition-transform duration-500
            ${darkMode ? '-rotate-180 -translate-y-full' : 'rotate-0 translate-y-0'}
          `}
        >
          <MoonIcon className="h-5 w-5 text-gray-700 dark:text-gray-300 theme-toggle-icon" />
        </div>
      </div>
    </Button>
  );
} 