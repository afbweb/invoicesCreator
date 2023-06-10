import { useState, useEffect } from 'react';

const useProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch('https://dummyjson.com/products')
        .then(response => response.json())
        .then(data => setProducts(data.products))
        .catch(error => console.error('Error fetching data:', error));
    };

    fetchData();
  }, []);

  return products;
};

export default useProducts;
