"use client";

import React, { useEffect, useState } from "react";

const Footer: React.FC = () => {
  const [os, setOs] = useState<string>("");
  const [browser, setBrowser] = useState<string>("");
  const [showDownloadPrompt, setShowDownloadPrompt] = useState<boolean>(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();

    // Detect OS
    if (/android/.test(userAgent)) {
      setOs("Android");
      setShowDownloadPrompt(true);
    } else if (/iphone|ipad|ipod/.test(userAgent)) {
      setOs("iOS");
      setShowDownloadPrompt(true);
    } else if (/win/.test(userAgent)) {
      setOs("Windows");
      setShowDownloadPrompt(false);
    } else if (/mac/.test(userAgent)) {
      setOs("MacOS");
      setShowDownloadPrompt(false);
    } else {
      setOs("Unknown");
      setShowDownloadPrompt(false);
    }

    // Detect Browser
    if (/chrome/.test(userAgent) && !/edg/.test(userAgent)) {
      setBrowser("Chrome");
    } else if (/safari/.test(userAgent) && !/chrome/.test(userAgent)) {
      setBrowser("Safari");
    } else if (/firefox/.test(userAgent)) {
      setBrowser("Firefox");
    } else if (/edg/.test(userAgent)) {
      setBrowser("Edge");
    } else {
      setBrowser("Unknown Browser");
    }
  }, []);

  // Check if user is using browser on mobile
  const isMobileBrowser = showDownloadPrompt && browser !== "";

  return (
    <footer className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-900 text-white border-t border-emerald-700/30">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Download Prompt for Mobile Browser Users */}
        {isMobileBrowser && (
          <div className="mb-6 p-4 bg-emerald-800/50 backdrop-blur-sm rounded-xl border border-emerald-600/30 animate-pulse">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">📱</span>
                <div>
                  <p className="font-semibold text-emerald-100">
                    Hey there! Download MY-AVA now
                  </p>
                  <p className="text-sm text-emerald-300">
                    Only 3MB • Better experience on the app • {os}/{browser} detected
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                {os === "Android" && (
                  <a
                    href="https://play.google.com/store" // Replace with your actual Play Store link
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-all flex items-center gap-2"
                  >
                    <span>📲</span>
                    Play Store
                  </a>
                )}
                {os === "iOS" && (
                  <a
                    href="https://apps.apple.com" // Replace with your actual App Store link
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all flex items-center gap-2"
                  >
                    <span>🍎</span>
                    App Store
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span>🩺</span>
              MY-AVA
            </h3>
            <p className="text-emerald-200 text-sm leading-relaxed">
              Empowering veterinary professionals, farmers, and the agricultural 
              community through innovation and knowledge sharing.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-emerald-100">Quick Links</h4>
            <ul className="space-y-2 text-sm text-emerald-300">
              <li>
                <a href="/about" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/study" className="hover:text-white transition-colors">
                  Study Materials
                </a>
              </li>
              <li>
                <a href="/marketplace" className="hover:text-white transition-colors">
                  Marketplace
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4 text-emerald-100">Get in Touch</h4>
            <ul className="space-y-2 text-sm text-emerald-300">
              <li className="flex items-center gap-2">
                <span>📧</span>
                <a href="mailto:info@myava.com" className="hover:text-white transition-colors">
                  info@myava.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>📱</span>
                <a href="https://api.whatsapp.com/send?phone=265993829387" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="hover:text-white transition-colors">
                  +265 99 382 9387
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>🌐</span>
                <a href="https://nit-home.netlify.app" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="hover:text-white transition-colors">
                  NIT Official
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-emerald-700/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-emerald-300">
              © 2025 NIT. All rights reserved. ™
            </p>
            <div className="flex gap-6 text-sm text-emerald-300">
              <a href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
          
          {/* Platform Info */}
          <div className="mt-4 text-center">
            <p className="text-xs text-emerald-400/60">
              Built with ❤️ for the veterinary community • 
              {os && browser && ` Detected: ${os} • ${browser}`}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;