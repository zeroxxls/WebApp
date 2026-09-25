import React from 'react';
import { NewsGridSection } from '../../News';
import { Loader } from '../../../shared/ui/Loader';

export const LearningResources = ({ articles, loading, error }) => (
  <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
    <h2 className="mb-6 text-2xl font-semibold">Learning resources</h2>
    {loading && articles.length === 0 ? <Loader /> : <NewsGridSection articles={articles} />}
    {error && <p className="text-center text-red-400">Could not load learning resources.</p>}
  </section>
);
