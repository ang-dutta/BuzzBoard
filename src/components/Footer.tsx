import { Instagram, Youtube, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              BuzzBoard
            </h3>
            <p className="text-gray-400">Smarter Influencer Marketing ROI</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-8">
            <nav className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">About</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
            </nav>
            
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg p-2 hover:scale-110 transition-transform">
                <Instagram className="w-full h-full text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-2 hover:scale-110 transition-transform">
                <Youtube className="w-full h-full text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg p-2 hover:scale-110 transition-transform">
                <Twitter className="w-full h-full text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-2 hover:scale-110 transition-transform">
                <Linkedin className="w-full h-full text-white" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          © 2024 BuzzBoard. All rights reserved.
        </div>
      </div>
    </footer>
  );
}