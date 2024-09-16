import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import '../styles/read.css';
import CONFIG from '../js/config'
import getHeaders from '../js/utils';


function Read () {

  const [articles, setArticles] = useState([]);
  const [isLoading, setLoading] = useState(true);

  // navigation varaibles
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  useEffect(() => {
    fetchArticlesHandler(); // Run the article fetch when /read route is accessed
    // const storedArticles = localStorage.getItem('articlesData');
    // if (storedArticles) {
    //   try {
    //     const parsedArticles = JSON.parse(storedArticles);
    //     setArticles(parsedArticles);
    //   } catch (error) {
    //     console.error('Error parsing articles data:', error);
    //   }
    // }
  }, []);

  const fetchArticlesHandler = async () => {
    try {
      const limit = 20;
      const response = await fetch(`${CONFIG.BACKEND_URL}${CONFIG.API_ENDPOINTS.ARTICLES}?limit=${limit}`, {
        method: 'GET',
        headers: getHeaders(), // Assuming getHeaders is a function that returns the required headers
      });

      if (!response.ok) {
        alert("Something went wrong while fetching articles");
        throw new Error('Failed to fetch articles');
      }

      const data = await response.json(); // Assuming the response is a JSON array of articles
      const articles = data?.crud_response?.data?.articles || [];
      setArticles(articles);
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
    <div className="row articles-container" style={{width: '100%', paddingTop: '80px'}}>
      {articles.map((article, index) => (
        <div className="col-12 col-md-8 col-lg-6 article-body" key={index}>
          <div className="article-card-thumbnail" onClick={() => {navigate(`/article/${article.id}`)}}>
            <img
              className="article-thumbnail-image w-100 d-block fit-cover"
              src={`data:image/jpeg;base64,${article.cover_image}`}
              alt={article.title}
            />
            <div className="article-thumbnail-body">
              {/* <p className=" card-text mb-0" style={{paddingLeft: '15px', color: 'rgb(150,150,150)'}}>Article</p> */}
              <h4 className="article-thumbnail-title" style={{paddingLeft: '15px', color: 'white', paddingTop: '10px', fontWeight: '950'}}>{article.title}</h4>
              <p className="article-thumbnail-text" style={{paddingLeft: '15px', color: 'rgb(150,150,150)', fontSize: '20px', paddingBottom: '5px'}}>{article.brief}</p>
              <div className="d-flex align-items-center" style={{ paddingLeft: '15px', paddingBottom: '5px' }}>
                <img
                  className="article-author-image rounded-circle flex-shrink-0 me-3 fit-cover"
                  width="30"
                  height="30"
                  src={`data:image/jpeg;base64,${article.picture}`}
                  alt={article.username}
                />
                <div>
                  <p className="article-thumbnail-author mb-0">{article.username}</p>
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
