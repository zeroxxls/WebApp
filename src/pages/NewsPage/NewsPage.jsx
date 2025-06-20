import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NewsGridSection } from '../../modules/News';
import { Footer } from '../../modules/Footer';
import { setIsPostLoading } from '../../store/slices/loadingSlice';
import { Loader } from '../../shared/ui/Loader';
import { fetchArticles } from '../../store/slices/articleSlice'; 
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export const NewsPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isPostLoading = useSelector((state) => state.loading.isPostLoading);
    const articles = useSelector((state) => state.articles.list); 
    const articlesLoading = useSelector((state) => state.articles.loading);
    console.log('Redux articles:', articles);

    useEffect(() => {
        dispatch(setIsPostLoading(true));
        dispatch(fetchArticles());
        
        const timer = setTimeout(() => {
            dispatch(setIsPostLoading(false));
        }, 1000);
        
        return () => clearTimeout(timer);
    }, [dispatch]);

    if (!articles || !Array.isArray(articles)) {
        return (
            <div className="text-center py-10">
                <p className="text-gray-400">Articles data is not available</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <button 
                onClick={() => navigate(-1)} 
                className="absolute top-4 left-4 z-10 p-2 text-white hover:text-gray-300 transition duration-300"
                aria-label="Go back"
            >
                <ArrowLeftIcon className="h-6 w-6" />
            </button>
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
                {isPostLoading || articlesLoading ? <Loader /> : <NewsGridSection articles={articles} />}
            </section>

            <Footer />
        </div>
    );
};