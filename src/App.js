import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Navbar.js';

function App() {
  const [newsData, setNewsData] = useState([]);
  const [category, setCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = searchTerm ? `&q=${searchTerm}` : '';
        const categoryQuery = category ? `&category=${category}` : '';
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=in${categoryQuery}${query}&apiKey=e4ad5aa91de643409ef00a0a3d874bbc`);
        const jsonData = await response.json();
        setNewsData(jsonData.articles || []); // Ensure newsData is always an array
      } catch (error) {
        console.error('Error fetching data:', error);
        setNewsData([]); // Set newsData to empty array in case of error
      }
    };
    fetchData();
    setSearchTerm("");
  }, [category, searchTerm]);

  const openLink = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className='App'>
      <Navbar setCategory={setCategory} setSearchTerm={setSearchTerm} />
      <div className='news-container'>
        {newsData.length > 0 ? (
          newsData.map((news, index) => (
            <div className='card' key={index} onClick={() => openLink(news.url)}>
              <img src={news.urlToImage} alt={news.title}/>
              <div className='card-content'>
                <p className='card-title'>{news.title}</p>
                <p className='card-source'>{news.source.name}</p>
                <p className='date'>{new Date(news.publishedAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No news available</p>
        )}
      </div>
    </div>
  );
}

export default App;
