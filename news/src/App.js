import React, { useState, useEffect} from 'react';

import './App.css';

import Header from './Components/Header/Header';
import Card from './Components/Card/Card';

function App() {

  const API_KEY = "dc59315f456e4fed8b3a72721155dd10";
  const [URL, setURL] = useState(`https://newsapi.org/v2/everything?q=bitcoin&sortBy=publishedAt&apiKey=${API_KEY}`)
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState([
    { "value": "bitcoin", "type": "keyword", "isActive": true },
    { "value": "us", "type": "country", "isActive": false },
    { "value": "apple", "type": "keyword", "isActive": false },
    { "value": "techcrunch", "type": "sources", "isActive": false },
    { "value": "the-Wall-Street-Journal", "type": "sources", "isActive": false }
  ]);

  const filterNews = (event) => {
    const domain = "https://newsapi.org";
    let path = '';
    setNews([], () => setIsLoading(true));
    
    if (event.target.dataset.type === "country") {
      path = `/v2/top-headlines?country=${event.target.dataset.value}`;
    }
    if (event.target.dataset.type === "sources") {
      path = `/v2/top-headlines?sources=${event.target.dataset.value}`;
    }
    if (event.target.dataset.type === "keyword") {
      path = `/v2/everything?q=${event.target.dataset.value}`;
    }
    setURL(`${domain}${path}&pageSize=20&sortBy=publishedAt&apiKey=${API_KEY}`);
    
    const selectedCategory = category.filter((item) => {
      if(item.value === event.target.dataset.value){
        item.isActive = true;
        return item;
      }else{
        item.isActive = false;
        return item;
      }
    });

    setCategory(selectedCategory);
  }

  useEffect(() => {
    fetch(URL)
    .then(response => response.json())
    .then(result => {
      setNews(result.articles, () => setIsLoading(false));
    })
    .catch(error => console.log('error', error));
  }, [URL]);

  return (
    <main>
      <div className="container">
        <Header categories={category} handleClick={filterNews} />
        <div className="card-container">
          {news.map((item, index) => <Card key={index} detail={item} />)}
          {isLoading?<div className="loading">Fetching News...</div>:null}
        </div>
      </div>
    </main>
  );
}

export default App;
