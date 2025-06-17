import axios from 'axios';

const API_URL = 'http://localhost:4444/articles';

export const uploadArticle = async (formData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
      withCredentials: true,
    });
    
    // Возвращаем данные в ожидаемом формате
    return {
      article: response.data // Оберните ответ в объект с полем article
    };
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const fetchAllArticles = async () => {
    try {
        const response = await axios.get(API_URL);
        
        // Обрабатываем все возможные варианты структуры ответа
        if (Array.isArray(response.data)) {
            return response.data; // Если ответ - массив
        } else if (response.data.articles?.docs) {
            return response.data.articles.docs; // Если {success: true, articles: {docs: [...]}}
        } else if (response.data.articles) {
            return response.data.articles; // Если {success: true, articles: [...]}
        } else if (response.data.docs) {
            return response.data.docs; // Если {docs: [...]}
        } else {
            throw new Error(`Unexpected API structure: ${JSON.stringify(response.data)}`);
        }
    } catch (error) {
        throw error.response?.data?.message || error.message;
    }
};

export const fetchArticleById = async (id) => {
  try {
    console.log(`Fetching article with ID: ${id}`); // Log the ID being requested
    const response = await axios.get(`${API_URL}/${id}`);
    console.log('Article response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Error fetching article:', error.response?.data || error.message);
    throw error.response?.data?.message || error.message;
  }
};