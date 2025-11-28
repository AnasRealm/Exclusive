// Static data for GitHub Pages
const products = [
  {
    id: 1,
    name: "HAVIT HV-G92 Gamepad",
    price: 120,
    originalPrice: 160,
    discount: 40,
    rating: 5,
    reviews: 88,
    image: "/src/assets/imges/pro1.png",
    category: "Gaming"
  },
  {
    id: 2,
    name: "AK-900 Wired Keyboard",
    price: 960,
    originalPrice: 1160,
    discount: 35,
    rating: 4,
    reviews: 75,
    image: "/src/assets/imges/pro2.png",
    category: "Electronics"
  },
  {
    id: 3,
    name: "IPS LCD Gaming Monitor",
    price: 370,
    originalPrice: 400,
    discount: 30,
    rating: 5,
    reviews: 99,
    image: "/src/assets/imges/pro3.png",
    category: "Electronics"
  },
  {
    id: 4,
    name: "S-Series Comfort Chair",
    price: 375,
    originalPrice: 400,
    discount: 25,
    rating: 4,
    reviews: 99,
    image: "/src/assets/imges/pro4.png",
    category: "Furniture"
  },
  {
    id: 5,
    name: "RGB Gaming Headset",
    price: 85,
    originalPrice: 120,
    discount: 30,
    rating: 4,
    reviews: 156,
    image: "/src/assets/imges/pro5.png",
    category: "Gaming"
  },
  {
    id: 6,
    name: "Wireless Mouse",
    price: 45,
    originalPrice: 65,
    discount: 31,
    rating: 5,
    reviews: 203,
    image: "/src/assets/imges/pro6.png",
    category: "Electronics"
  }
];

const categories = [
  { id: 1, name: "Gaming" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Furniture" }
];

class ProductsServices {
  async getProducts(limit = 20, offset = 0) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(products.slice(offset, offset + limit));
      }, 100);
    });
  }

  async getCategories() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(categories);
      }, 100);
    });
  }

  async getProductsByCategory(categoryId, limit = 10) {
    return new Promise(resolve => {
      setTimeout(() => {
        const filtered = products.filter(p => p.category === categoryId);
        resolve(filtered.slice(0, limit));
      }, 100);
    });
  }

  async getProduct(id) {
    return new Promise(resolve => {
      setTimeout(() => {
        const product = products.find(p => p.id === parseInt(id));
        resolve(product);
      }, 100);
    });
  }
}

export default new ProductsServices();