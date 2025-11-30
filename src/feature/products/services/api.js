import axios from 'axios';

const API_BASE = 'https://api.escuelajs.co/api/v1';

class ProductsServices {
  async getProducts(limit = 20, offset = 0) {
    try {
      const response = await axios.get(`${API_BASE}/products?offset=${offset}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  async getCategories() {
    try {
      const response = await axios.get(`${API_BASE}/categories`);
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  async getProductsByCategory(categoryId, limit = 10) {
    try {
      const response = await axios.get(`${API_BASE}/products/?categoryId=${categoryId}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      return [];
    }
  }

  async getProduct(id) {
    try {
      const response = await axios.get(`${API_BASE}/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  }
}

export default new ProductsServices();