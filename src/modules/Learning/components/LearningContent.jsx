import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from '../../../store/slices/articleSlice';
import { LearningHero } from './LearningHero';
import { LearningResources } from './LearningResources';

export const LearningContent = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.list);
  const loading = useSelector((state) => state.articles.loading);
  const error = useSelector((state) => state.articles.error);

  useEffect(() => {
    if (articles.length === 0) dispatch(fetchArticles(1));
  }, [articles.length, dispatch]);

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <LearningHero />
      <LearningResources articles={articles} loading={loading} error={error} />
    </main>
  );
};
