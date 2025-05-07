import React from 'react';
import { NewsGridSection } from '../../modules/News';
import { Footer } from '../../modules/Footer';

export const NewsPage = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <header className="py-16 px-4 text-center bg-gradient-to-b from-gray-800 to-gray-900">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight max-w-4xl mx-auto">
          Explore New Articles About the World of CGI, 3D Modelling & Digital Art
        </h1>
        <p className="text-gray-400 mt-4 text-base sm:text-lg max-w-2xl mx-auto">
          Stay up to date with the latest trends, techniques, and artist spotlights from the digital art universe.
        </p>
      </header>

      <section className="px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-center">
        Latest Articles
     </h2>

        <NewsGridSection />
      </section>

      {/* Футер */}
      <Footer />
    </div>
  );
};

