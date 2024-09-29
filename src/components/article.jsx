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
      setArticle(article.crud_response.data.article);
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
            <div className='blog-article-header'>
              {/* Article Header */}
              <div className="article-header text-center mb-4">
                <h1 className="article-title" style={{textAlign: 'left'}}>{article.title}</h1>
                {/* <h className="article-title">{article.brief}</h1> */}
                <p className="article-meta text-muted" style={{textAlign: 'left'}}>
                  Posted by John Doe on September 12, 2024
                </p>
                
                {
                  article.images?.map((image, index) => (
                    <img
                      key={index}
                      className="img-fluid rounded mb-4"
                      src={`data:image/jpeg;base64,${image}`}
                      alt={`Article Image ${index + 1}`}
                      style={{ width: '100%', height: 'auto' }} // Adjust styles as needed
                    />
                  ))
                }

              </div>
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
