import React, {useState, useEffect} from 'react';
import '../styles/read.css';
import CONFIG from '../js/config'
import getHeaders from '../js/utils';


function Read () {

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticlesHandler(); // Run the article fetch when /read route is accessed
    const storedArticles = localStorage.getItem('articlesData');
    if (storedArticles) {
      try {
        const parsedArticles = JSON.parse(storedArticles);
        setArticles(parsedArticles);
      } catch (error) {
        console.error('Error parsing articles data:', error);
      }
    }
  }, []);

  const fetchArticlesHandler = async () => {
    try {
      const response = await fetch(`${CONFIG.BACKEND_URL}${CONFIG.API_ENDPOINTS.ARTICLES}`, {
        method: 'GET',
        headers: getHeaders(), // Assuming getHeaders is a function that returns the required headers
      });

      if (!response.ok) {
        alert("Something went wrong while fetching articles");
        throw new Error('Failed to fetch articles');
      }

      const data = await response.json(); // Assuming the response is a JSON array of articles
      const articles = data?.crud_response?.data?.articles || [];
      localStorage.setItem('articlesData', JSON.stringify(articles));

    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  



  return (
    <div className="row">
      {articles.map((article, index) => (
        <div className="col article-body" key={index}>
          <div className="article-card-thumbnail">
            <img
              className="article-thumbnail-image w-100 d-block fit-cover"
              src={`data:image/jpeg;base64,${article.cover_image}`}
              alt={article.title}
            />
            <div className="article-thumbnail-body">
              <p className="text-primary card-text mb-0">
                Article
              </p>
              <h4 className="article-thumbnail-title">{article.title}</h4>
              <p className="article-thumbnail-text">{article.brief}</p>
              <div className="d-flex align-items-center">
                <img
                  className="rounded-circle flex-shrink-0 me-3 fit-cover"
                  width="50"
                  height="50"
                  src={`data:image/jpeg;base64,${article.picture}`}
                  alt={article.username}
                />
                <div>
                  <p className="article-thumbnail-author">{article.username}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Read;
