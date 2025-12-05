// /home/newton/projects/myava/frontend/app/marketplace/page.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// Listing data – structured for scalability
const listings = [
  {
    id: 1,
    type: 'Pig Weaners',
    seller: 'Kairos Kaposa',
    image: '/images/piglets.jpg',
    description: 'Selling 5 weeks pig weaners, healthy and disease free, high quality pigs.',
    subtitle: 'Get yours today and earn free vet services from Ligmati Farms',
    whatsapp: '265888809685',
    email: 'kairoskaposa@gmail.com',
    category: 'Livestock',
  },
  {
    id: 2,
    type: 'Poultry Kroilers',
    seller: 'Inkosi Mlangeni',
    image: '/images/kroilers.jpg',
    description: 'Selling breedable Kroiler chickens. Healthy and disease free, high quality chickens.',
    subtitle: 'Get yours at your reliable and affordable source — Kulima Kotsogola Farms',
    whatsapp: '26599959417',
    email: 'kulimakotsogora@gmail.com',
    category: 'Poultry',
  },
  {
    id: 3,
    type: 'Black Australorp Chicks (Mikolongwe)',
    seller: 'Dickson Kwakwala',
    image: '/images/BA.jpg',
    description: 'Selling 6 weeks Black Australorp chickens. Healthy and disease free, high quality breedable Mikolongwe chicks.',
    subtitle: 'Get yours today from Mikolongwe Vet Station. Supplied by Psalms Farms',
    whatsapp: '265990248200',
    email: 'kwakwalad@gmail.com',
    category: 'Poultry',
  },
  {
    id: 4,
    type: 'Day-Old Broiler Chicks (Ross)',
    seller: 'Stephano Mundira',
    image: '/images/ross.png',
    description: 'Selling day-old broiler chicks. Ross strain — high quality and disease free.',
    subtitle: 'Get yours today and receive a surplus, from Angoni Farms',
    whatsapp: '265993829387', // Default fallback
    email: '',
    category: 'Poultry',
  },
  {
    id: 5,
    type: 'Fresh Farm Eggs',
    seller: 'Newton Yankho Siyani',
    image: '/images/eggs.png',
    description: 'Selling high quality, nutritious eggs. Healthy and clean.',
    subtitle: 'Get yours from your reliable source — NIT Farms',
    whatsapp: '265993829387',
    email: 'newtonyankho@outlook.com',
    category: 'Eggs & Produce',
  },
  {
    id: 6,
    type: 'German Shepherd Puppies',
    seller: 'Paul Richard',
    image: '/images/puppies.jpg',
    description: 'Selling highly trained German Shepherd dogs. Friendly and good-looking pets.',
    subtitle: 'Get yours at an affordable price, and get free vet services for 3 months. Supplied by Moyelhva Pets',
    whatsapp: '2654148151',
    email: 'paulrichard@gmail.com',
    category: 'Pets',
  },
];

export default function Marketplace() {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const copyEmail = (email: string) => {
    if (email) {
      navigator.clipboard.writeText(email);
      setCopiedEmail(email);
      setTimeout(() => setCopiedEmail(null), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Header */}
      <header className="bg-emerald-900 text-white py-6 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl">←</span>
            <h1 className="text-2xl font-bold">MY-AVA Marketplace</h1>
          </Link>
          <div className="text-sm text-emerald-200">Trusted Agri-Commerce Platform</div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-700 to-teal-600 text-white py-12 text-center">
        <h2 className="text-4xl font-extrabold mb-4">Livestock & Farm Supplies</h2>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          Buy directly from verified farmers and breeders across Malawi. All animals are healthy, disease-free, and come with support.
        </p>
      </div>

      {/* Listings Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-xl border border-emerald-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              {/* Image */}
              <div className="h-56 w-full relative bg-emerald-50">
                <Image
                  src={item.image}
                  alt={`${item.type} from ${item.seller}`}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                  }}
                />
                <div className="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {item.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-800">{item.type}</h3>
                  <span className="text-sm font-medium bg-amber-100 text-amber-800 px-2 py-1 rounded">
                    {item.seller}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 flex-grow">{item.description}</p>

                <p className="text-emerald-700 font-semibold italic mb-4 text-sm">
                  {item.subtitle}
                </p>

                {/* Contact Section */}
                <div className="mt-auto space-y-3">
                  <a
                    href={`https://wa.me/${item.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg shadow transition-colors"
                  >
                    <span>💬</span>
                    Contact Seller on WhatsApp
                  </a>

                  {item.email && (
                    <button
                      onClick={() => copyEmail(item.email)}
                      className="w-full text-center text-sm text-emerald-700 hover:text-emerald-900 font-medium"
                    >
                      {copiedEmail === item.email ? '✓ Copied!' : `Email: ${item.email}`}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Banner */}
        <div className="mt-16 bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
          <h3 className="text-xl font-bold text-emerald-800 mb-2">Why Buy on MY-AVA Marketplace?</h3>
          <p className="text-emerald-600 max-w-3xl mx-auto">
            All sellers are verified. Animals come with health certifications. Enjoy free veterinary support on select purchases. 
            WhatsApp integration ensures fast, private, and reliable communication — just like the WhatsApp experience you trust.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-emerald-700">
            <span>🔒 Secure</span>
            <span>📱 WhatsApp Verified</span>
            <span>🩺 Vet Supported</span>
            <span>🌱 Local Farmers</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-emerald-900 text-emerald-200 py-8 text-center text-sm">
        <p>MY-AVA Marketplace — Connecting Malawian Farmers & Buyers</p>
        <p className="mt-2">
          Powered by NIT Innovation •{' '}
          <Link href="/" className="text-white hover:underline">
            Return to Home
          </Link>
        </p>
      </footer>
    </div>
  );
}