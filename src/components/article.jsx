import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import '../styles/article.css';
import CONFIG from '../js/config';
import getHeaders from '../js/utils';



function Article () {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [article, setArticle] = useState([]);
  
  useEffect(() => {
    fetchArticleHandler();
  }, []);


  const fetchArticleHandler = async () => {
    try {
      const response = await fetch(`${CONFIG.BACKEND_URL}${CONFIG.API_ENDPOINTS.ARTICLE}?id=${id}`, {
        method: 'GET',
        headers: getHeaders(), // Assuming getHeaders is a function that returns the required headers
      });

      if (!response.ok) {
        alert("Something went wrong while fetching articles");
        throw new Error('Failed to fetch articles');
      }

      const article = await response.json(); // Assuming the response is a JSON array of articles
      setArticle(article);
      // localStorage.setItem('articlesData', JSON.stringify(articles));

    } catch (error) {
      console.error('Error fetching articles:', error);
    }
    finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };

  if (isLoading) {
    return (
      <div className="loading-spinner-container">
        {/* Loading spinner */}
        <div className="spinner-border" role="status" style={{position: 'center'}}>
          <span className="sr-only"></span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mt-5 article-blog-container">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            {/* Article Header */}
            <div className="article-header text-center mb-4">
              <h1 className="article-title">{article.title}</h1>
              {/* <h className="article-title">{article.brief}</h1> */}
              <p className="article-meta text-muted">
                Posted by John Doe on September 12, 2024
              </p>
              <img 
                className="img-fluid rounded mb-4"
                src={article.cover_image}
                alt="Article Cover" 
              />
            </div>

            {/* Article Content */}
            <article className="article-content">
              <p>
                {article.content}
              </p>
              
            </article>
            </div>
        </div>
      </div>
  </>
  );
}


export default Article;
