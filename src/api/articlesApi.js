import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/articles`; 

export const uploadArticle = async (formData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return {
      article: response.data 
    };
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const fetchArticlesPage = async (page = 1, limit = 12) => {
  try {
    const response = await axios.get(API_URL, { params: { page, limit } });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const fetchAllArticles = async ({ page = 1, limit = 12 } = {}) => {
  const result = await fetchArticlesPage(page, limit);
  return result.articles;
};

export const fetchArticleById = async (id) => {
  try {
    console.log(`Fetching article with ID: ${id}`);
    const response = await axios.get(`${API_URL}/${id}`); 
    console.log('Article response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching article:', error.response?.data || error.message);
    throw error.response?.data?.message || error.message;
  }
};
