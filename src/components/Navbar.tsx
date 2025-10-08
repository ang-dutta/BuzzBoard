import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';

export function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'evolution', 'features', 'planning', 'dashboard'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200"
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              BuzzBoard
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection('hero')}
              className={`text-sm transition-colors ${
                activeSection === 'hero' ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('evolution')}
              className={`text-sm transition-colors ${
                activeSection === 'evolution' ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              Evolution
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className={`text-sm transition-colors ${
                activeSection === 'features' ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('planning')}
              className={`text-sm transition-colors ${
                activeSection === 'planning' ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              Plan
            </button>
          </div>

          <Button
            onClick={() => scrollToSection('planning')}
            size="sm"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            Get Started
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}