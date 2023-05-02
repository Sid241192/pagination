import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setproducts] = useState([]);
  const [page, setpage] = useState(1);

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100 ");
    const data = await res.json();
    if (data && data.products) {
      setproducts(data.products);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage > 0 &&
      selectedPage <= products.length / 10 &&
      selectedPage !== page
    ) {
      setpage(selectedPage);
    }
  };
  return (
    <div className="App">
      {products.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((item, index) => {
            return (
              <span key={item.id} className="products__single">
                <img src={item.thumbnail} alt={item.title} />
                <span>{item.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span
            onClick={() => selectPageHandler(page - 1)}
            className={page > 1 ? "" : "pagination__disable"}
          >
            ⏮
          </span>
          {[...Array(products.length / 10)].map((item, i) => {
            return (
              <span
                key={i}
                className={page === i + 1 ? "pagination__selected" : ""}
                onClick={() => selectPageHandler(i + 1)}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            className={page < products.length / 10 ? "" : "pagination__disable"}
            onClick={() => selectPageHandler(page + 1)}
          >
            ⏭
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
