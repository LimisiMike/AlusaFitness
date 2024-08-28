import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000';

// Axios instance
const api = axios.create({
    baseURL: API_URL,
    Headers:{
        'Content-Type': 'application/json',
    },
});

//Register func
export const registerUser = async (userData) => {
    try {
        const response = await api.post('/register', userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error.response?.data || error.message);
        throw error;
    }
};

//Login func
export const loginUser = async (credentials) => {
    try {
        const response = await api.post('/login', credentials);
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error.response?.data || error.message);
        throw error;
    }
};

//Get all clients for authenticated coach
export const getClients = async (token) => {
    try {
        const response = await api.get('/clients', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching clients:', error.response?.data || error.message);
        throw error
    }
};

//Create a new client
export const createClient = async (clientData, token) => {
    try {
        const response = await api.post('/clients', clientData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating client:', error.response?.data || error.message);
        throw error;
    }
};

//Get a single client
export const getClient = async (clientId, token) => {
    try {
        const response = await api.get(`/clients/${clientId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating client:', error.response?.data || error.message);
        throw error;
    }
};

//Update client
export const updateClient = async (clientId, clientData, token) => {
    try {
        const response = await api.put(`/clients/${clientId}`, clientData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating client:', error.response?.data || error.message);
        throw error;
    }
};

//Update client
export const deleteClient = async (clientId, token) => {
    try {
        const response = await api.delete(`/clients/${clientId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting client:', error.response?.data || error.message);
        throw error;
    }
};

//Create new plan for  a client
export const createPlan = async (planData, token) => {
    try {
        const response = await api.post('/plans', planData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating plan:', error.response?.data || error.message);
        throw error;
    }
};

//Get all plans for  a client
export const getPlans = async (clientId, token) => {
    try {
        const response = await api.get(`/plans/${clientId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching plans:', error.response?.data || error.message);
        throw error;
    }
};

//Fetch workout videos func
export const getWorkoutVideos = async (difficultyLevel) => {
    try {
        const response = await api.get(`/videos/${difficultyLevel}`, userData);
        return response.data;
    } catch (error) {
        console.error('Error getting vdeos:', error.response?.data || error.message);
        throw error;
    }
};

//upload workout videos func(admin)
export const uploadWorkoutVideo = async (videoData, token) => {
    try {
        const response = await api.post('/upload_workout', videoData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error cuploading workout video:', error.response?.data || error.message);
        throw error;
    }
};

//generate custom meal plan func
export const generateMealPlan = async (mealPlanData, token) => {
    try {
        const response = await api.post('/generate_meal_plan', mealPlanData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error generating meal plan:', error.response?.data || error.message);
        throw error;
    }
};

// Function to fetch existing meal plans for the logged-in user
export const getMealPlans = async (token) => {
    try {
      const response = await api.get('/meal_plans', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
        console.error('Error fetching meal plans:', error.response?.data || error.message);
        throw error;
    }
  };
  
  // Function to handle bookings
  export const createSession = async (sessionData, token) => {
    try {
      const response = await api.post('/sessions', sessionData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
        console.error('Error creating session:', error.response?.data || error.message);
        throw error;
    }
  };

  //Get all sessions for a client
  export const getSessions = async (clientId, token) => {
    try {
      const response = await api.get(`/sessions/${clientId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
        console.error('Error fetching session:', error.response?.data || error.message);
        throw error;
    }
  };
  
  // Function to send messages between clients and coaches
  export const sendMessage = async (messageData, token) => {
    try {
      const response = await api.post('/messages', messageData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
        console.error('Error sending message:', error.response?.data || error.message);
        throw error;
    }
  };

  // Get all messages for the authenticated user
  export const getMessages = async (token) => {
    try {
      const response = await api.get('/messages', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
        console.error('Error fetching messages:', error.response?.data || error.message);
        throw error;
    }
  };
  
  //Create a progress record
  export const createProgress = async (progressData, token) => {
    try {
      const response = await api.post('/progress', progressData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
        console.error('Error creating session:', error.response?.data || error.message);
        throw error;
    }
  };

  // Get all progress records for a client
  export const getProgress = async (clientId, token) => {
    try {
      const response = await api.get(`/progress/${clientId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
        console.error('Error fetching progress records:', error.response?.data || error.message);
        throw error;
    }
  };
  
  // Function to handle payments
  export const makePayment = async (paymentData, token) => {
    try {
      const response = await api.post('/make_payment', paymentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

// Add to Cart
export const addToCart = async (client_id, challenge_id) => {
  try {
      const response = await api.post('/cart', { client_id, challenge_id });
      return response.data;
  } catch (error) {
      console.error('Error adding to cart:', error.response?.data || error.message);
      throw error;
  }
};

// Get Cart Items
export const getCartItems = async (client_id) => {
  try {
      const response = await api.get(`/cart/${client_id}`);
      return response.data;
  } catch (error) {
      console.error('Error fetching cart items:', error.response?.data || error.message);
      throw error;
  }
};

// Checkout
export const checkout = async (client_id) => {
  try {
      const response = await api.post(`/cart/${client_id}/checkout`);
      return response.data;
  } catch (error) {
      console.error('Error during checkout:', error.response?.data || error.message);
      throw error;
  }
};

// Get Blogs
export const getBlogs = async () => {
  try {
      const response = await api.get('/blogs');
      return response.data;
  } catch (error) {
      console.error('Error fetching blogs:', error.response?.data || error.message);
      throw error;
  }
};

// Create Blog
export const createBlog = async (blogData) => {
  try {
      const response = await api.post('/blogs', blogData);
      return response.data;
  } catch (error) {
      console.error('Error creating blog:', error.response?.data || error.message);
      throw error;
  }
};

// Get Articles
export const getArticles = async () => {
  try {
      const response = await api.get('/articles');
      return response.data;
  } catch (error) {
      console.error('Error fetching articles:', error.response?.data || error.message);
      throw error;
  }
};

// Create Article
export const createArticle = async (articleData) => {
  try {
      const response = await api.post('/articles', articleData);
      return response.data;
  } catch (error) {
      console.error('Error creating article:', error.response?.data || error.message);
      throw error;
  }
};