import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/articles`; 

export const uploadArticle = async (formData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-formdata',
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

export const fetchAllArticles = async () => {
  try {
    const response = await axios.get(API_URL); 
    
    if (Array.isArray(response.data)) {
        return response.data; 
    } else if (response.data.articles?.docs) {
        return response.data.articles.docs; 
    } else if (response.data.articles) {
        return response.data.articles; 
    } else if (response.data.docs) {
        return response.data.docs; 
    } else {
        throw new Error(`Unexpected API structure: ${JSON.stringify(response.data)}`);
    }
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
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