import React, { useEffect, useState } from 'react'
import './App.css';

function App() {
  const [product, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: 0 });

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/v1/products');
      const data = await res.json();
      setProducts(data);
    }
    catch (err) {
      console.error(err);
      alert('Failed to fetch products');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  const createProduct = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/v1/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
      });
      const data = await res.json();
      setProducts([...product, data]);
    }
    catch (err) {
      console.error(err);
      alert('Failed to create product');
    }
  };
  
  return (
    <div className="App">
      <h1>Product Management</h1>
      <div>
        <form onSubmit={createProduct}>
          <div>
            <label>Product name
            <input
            style={{marginRight: '10px'}}
            type="text"
            placeholder="Product name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            /></label>
          </div>
          <div>
            <label>Product price
            <input
            style={{marginRight: '10px'}}
            type="number"
            placeholder="Product price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            /></label>
          </div>
          <button type="submit">Add Product</button>
      </form>
    

       {/* Danh sách sản phẩm */}
       <h2>Product List</h2>
      <ul>
        {product.map((product) => (
          <li key={product._id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
     
    </div>

      </div>
      
  );
}

export default App;
