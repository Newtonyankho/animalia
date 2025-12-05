// /home/newton/projects/myava/frontend/app/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaComments, FaCalculator, FaDiagnoses, FaUtensils, FaFlask, FaStore, FaUserShield, FaBook } from 'react-icons/fa';

// ========== Features Dashboard (was page2.tsx) ==========
const FeaturesDashboard = () => {
  const features = [
    {
      title: 'Chat with Vet',
      description: 'Talk to AI or live veterinary experts',
      href: '/chat',
      icon: <FaComments size={32} />,
      color: 'from-blue-500 to-indigo-600',
    },
    {
      title: 'Calculator',
      description: 'Dosage, weight, nutrition & more',
      href: '/calculator',
      icon: <FaCalculator size={32} />,
      color: 'from-emerald-500 to-teal-600',
    },
    {
      title: 'Diagnosis Assistant',
      description: 'AI-powered disease identification',
      href: '/diagnosis',
      icon: <FaDiagnoses size={32} />,
      color: 'from-amber-500 to-orange-600',
    },
    {
      title: 'Feed Library',
      description: 'Browse livestock feed formulations',
      href: '/feed',
      icon: <FaUtensils size={32} />,
      color: 'from-green-500 to-lime-600',
    },
    {
      title: 'Feed Formulator',
      description: 'Create custom balanced rations',
      href: '/feed-formulator',
      icon: <FaFlask size={32} />,
      color: 'from-purple-500 to-fuchsia-600',
    },
    {
      title: 'Marketplace',
      description: 'Buy & sell livestock, feed, meds',
      href: '/marketplace',
      icon: <FaStore size={32} />,
      color: 'from-rose-500 to-pink-600',
    },
    {
      title: 'Farmer Portal',
      description: 'Manage animals, records & health',
      href: '/portal',
      icon: <FaUserShield size={32} />,
      color: 'from-cyan-500 to-sky-600',
    },
    {
      title: 'Study Hub',
      description: 'Courses, guides & certifications',
      href: '/study',
      icon: <FaBook size={32} />,
      color: 'from-violet-500 to-purple-600',
    },
  ];

  return (
    <div className="py-16 bg-gradient-to-b from-teal-900/20 to-emerald-900/10 backdrop-blur-sm border-t border-emerald-700/30 mt-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Your Veterinary Toolkit</h2>
          <p className="text-emerald-200 mt-2">Select any tool to begin your journey</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Link key={index} href={feature.href} className="block h-full group">
              <div className={`relative h-full bg-white/10 backdrop-blur rounded-2xl shadow-lg border border-white/10 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:bg-white/20`}>
                <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${feature.color}`}></div>
                <div className="p-6 flex flex-col items-center text-center h-full">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 bg-gradient-to-r ${feature.color} text-white shadow-md group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{feature.title}</h3>
                  <p className="text-emerald-200 text-sm mb-4 flex-grow">{feature.description}</p>
                  <span className="text-sm text-emerald-300 group-hover:text-white transition-colors">
                    Open →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12 text-emerald-300/80 text-sm">
          All tools are secure, offline-capable, and optimized for rural connectivity.
        </div>
      </div>
    </div>
  );
};

// ========== Main Home Page ==========
export default function Home() {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-teal-950 via-emerald-900 to-teal-900">
      {/* Background Effects (unchanged) */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="vet-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <text x="10" y="30" fontSize="24" fill="currentColor">🐄</text>
              <text x="60" y="70" fontSize="24" fill="currentColor">🐓</text>
              <text x="30" y="90" fontSize="24" fill="currentColor">🐖</text>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#vet-pattern)" />
        </svg>
      </div>

      <main className="relative z-10 flex flex-col items-center text-center px-6 py-20 max-w-6xl mx-auto">
        {/* Hero content (unchanged) */}
        <div className="mb-8 relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-2xl ring-4 ring-emerald-300/30 animate-pulse">
            <span className="text-5xl" aria-label="Medical cross">🩺</span>
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-green-400 flex items-center justify-center shadow-lg">
            <span className="text-lg" aria-label="Verified">✓</span>
          </div>
        </div>

        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-4 drop-shadow-2xl bg-gradient-to-r from-white via-emerald-100 to-teal-200 bg-clip-text text-transparent">
          MY-AVA
        </h1>
        <p className="text-2xl md:text-3xl font-light text-emerald-200 mb-8 tracking-wide">
          Assistant Veterinary Platform
        </p>

        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-emerald-800/50 backdrop-blur-sm border border-emerald-600/30 mb-12">
          <span className="text-emerald-300 text-sm font-medium">🌍 Empowering Animal Health & Agriculture</span>
        </div>

        <div className="max-w-4xl mb-16 space-y-6">
          <p className="text-lg md:text-xl text-emerald-100 leading-relaxed">
            A modern digital veterinary ecosystem connecting the agricultural community 
            through innovation, knowledge, and commerce.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {[
              { emoji: '👨‍🌾', title: 'Farmers', desc: 'Connect with fellow farmers' },
              { emoji: '🩺', title: 'AVOs', desc: 'Professional Vets' },
              { emoji: '🛒', title: 'Marketplace', desc: 'Buy & sell products' },
              { emoji: '📚', title: 'Learn', desc: 'Study materials' },
            ].map((item, i) => (
              <div key={i} className="bg-emerald-800/40 backdrop-blur-sm rounded-2xl p-6 border border-emerald-600/30 hover:border-emerald-500/50 transition-all hover:scale-105">
                <div className="text-4xl mb-3" aria-hidden="true">{item.emoji}</div>
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-emerald-200">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 w-full justify-center items-center">
          {/* ✅ FIXED: Reveal dashboard instead of navigating */}
          <button
            onClick={() => setShowDashboard(true)}
            className="group relative px-10 py-4 rounded-full bg-white text-emerald-900 font-bold text-lg shadow-2xl hover:shadow-emerald-400/50 transition-all hover:scale-105 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Get Started
              <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-emerald-100 to-teal-100 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></span>
          </button>

          <a
            href="https://api.whatsapp.com/send?phone=265993829387"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-lg shadow-2xl hover:shadow-emerald-500/50 transition-all hover:scale-105 flex items-center gap-2"
          >
            <span aria-hidden="true">💬</span>
            Learn More
          </a>

          <a
            href="https://nit-home.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 rounded-full border-2 border-emerald-300 text-emerald-100 font-bold text-lg hover:bg-emerald-700/30 backdrop-blur-sm transition-all hover:scale-105 flex items-center gap-2"
          >
            Visit NIT
            <span className="text-xl" aria-hidden="true">🏢</span>
          </a>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-8 mb-16 w-full max-w-2xl mt-12">
          <div className="text-center">
            <p className="text-4xl font-bold text-white mb-2">24/7</p>
            <p className="text-sm text-emerald-300">Support</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-white mb-2">100%</p>
            <p className="text-sm text-emerald-300">Secure</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-white mb-2">∞</p>
            <p className="text-sm text-emerald-300">Resources</p>
          </div>
        </div>
      </main>

      {/* ✅ DASHBOARD REVEAL - Smooth animation */}
      {showDashboard && (
        <div className="relative z-20">
          <FeaturesDashboard />
        </div>
      )}

      {/* Floating Animals */}
      <div className="absolute top-10 right-10 animate-bounce delay-300" aria-hidden="true">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 backdrop-blur-sm flex items-center justify-center text-3xl">🐄</div>
      </div>
      <div className="absolute bottom-20 left-10 animate-bounce delay-700" aria-hidden="true">
        <div className="w-16 h-16 rounded-full bg-teal-500/20 backdrop-blur-sm flex items-center justify-center text-3xl">🐓</div>
      </div>
    </div>
  );
}