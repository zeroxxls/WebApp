import React from 'react';
import { Link } from 'react-router-dom';

export const LearningHero = () => (
  <section className="bg-gradient-to-b from-gray-800 to-gray-900 px-5 py-16 text-center sm:py-20">
    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">
      Luminio Learning
    </p>
    <h1 className="mx-auto max-w-4xl text-3xl font-bold sm:text-5xl">
      Learn CGI and 3D creation
    </h1>
    <p className="mx-auto mt-5 max-w-2xl text-gray-300">
      Explore community articles, techniques, and ideas from digital artists.
    </p>
    <Link
      to="/NewsPage"
      className="mt-7 inline-flex rounded-lg bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-500"
    >
      Browse all articles
    </Link>
  </section>
);
