import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function Blogposts() {
  const [posts, setBlogs] = useState([]);
  const [news, setNews] = useState([]);
  const [activeLink, setActiveLink] = useState('myNews');

  useEffect(() => {
    fetch('database.xml')
      .then((response) => response.json()
      .then((data) => {
        setBlogs(data);
      });
    axios
      .get(
        'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=?'
      )
      .then((res) => {
        setNews(res.data.articles.slice(0, 3)); // slice to get only 3 articles
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLinkClick = (source) => {
    setActiveLink(source);
  };

  return (
    <div className="Bogapp">
      <div className='header'>
      <h1>The Scrapped Blog News</h1>
      </div>
      
    <div className="cont">
    <navigationBar className="nBar">
              <ul>
                  <li>
                    <a
                    className={activeLink === 'myNews' ? 'active' : ''}
                    href="#news"
                    onClick={() => handleLinkClick('myNews')}
                    >
                    News from Google
                    </a>
                  </li>

                  <li>
                    <a
                      className={activeLink === 'xml' ? 'active' : ''}
                      href="#xml"
                      onClick={() => handleLinkClick('xml')}
                     >
                  MY XmL News
                    </a>
                  </li>
                </ul>
          </navigationBar>
    {activeLink === 'myNews' && (
      <>
    
      <h2>Google Latest News</h2>
      

      <div className="template-cont">
     
        {news.map((article) => (
          <div className="template" key={article.title}>
            <img
                    className="template-img"
                    src={article.urlToImage}
                    alt={article.title}
                  />
                  <p className="template-date"> 
                       <em> publishedAt: {article.publishedAt}</em>
                    </p>
                    <p className="template-auth">Author: {article.author}</p>
                    <p className="template-desc">{article.description}</p>
          <a key={article.title}href={article.url}>{article.title}</a>
         </div>
        ))}
      
      </div>
      </>
)}

{activeLink === 'xml' && (
          <>
          <h2>My Xml Blogposts</h2>
          {Object.keys(posts).map((key) => (
            <div className="template" key={posts[key].title}>
              <img
              className="template-image"
              src={posts[key].urlToImage}
              alt={posts[key].title}
            />
            <div className="template-content">
              <h1 className="template-title">{posts[key].title}</h1>
              <p className="template-date">publishedAt: {posts[key].publishedAt}</p>
              <p className="template-author">Author: {posts[key].author}</p>
              <p className="template-summary">{posts[key].content}</p>
        
              <a key={posts[key].title}href={posts[key].url}>{posts[key].title}</a>
            </div>
          </div>


))}

          </>

)}
    </div>
    <footer className="footer">
        <p>&copy;  All Rights Reserved, Project Blog App</p>
      </footer>
    </div>
  );
}

export default Blogposts;
