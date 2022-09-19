import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Collection from './Collection';

const cats = [
  { name: 'Все' },
  { name: 'Море' },
  { name: 'Горы' },
  { name: 'Архитектура' },
  { name: 'Города' },
];

function App() {
  const [collections, setCollections] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [categoryId, setCategoryId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId ? `category=${categoryId}` : '';

    axios
      .get(`http://localhost:3001/collections?_page=${page}&_limit=3&${category}`)
      .then((response) => setCollections(response.data))
      .catch((error) => {
        alert('Error getting collections');
        console.warn(error);
      })
      .finally(() => setIsLoading(false));
  }, [categoryId, page]);

  return (
    <div className="App">
      <h1>My photo collection</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((obj, index) => (
            <li
              key={obj.name}
              className={categoryId === index ? 'active' : ''}
              onClick={() => setCategoryId(index)}>
              {obj.name}
            </li>
          ))}
        </ul>
        <input
          className="search-input"
          placeholder="Search by name"
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Loading...</h2>
        ) : (
          collections
            .filter((obj) => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
            .map((obj, index) => <Collection key={index} name={obj.name} images={obj.photos} />)
        )}
      </div>
      <ul className="pagination">
        {[...Array(5)].map((_, index) => (
          <li
            key={index}
            className={page === index + 1 ? 'active' : ''}
            onClick={() => setPage(index + 1)}>
            {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
