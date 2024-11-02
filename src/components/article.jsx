import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/article.css';
import CONFIG from '../js/config';
import getHeaders from '../js/utils';

function Article() {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetchArticleHandler();
  }, []);

  const fetchArticleHandler = async () => {
    try {
      const response = await fetch(`${CONFIG.BACKEND_URL}${CONFIG.API_ENDPOINTS.ARTICLE}?id=${id}`, {
        method: 'GET',
        headers: getHeaders(),
      });

      if (!response.ok) {
        alert("Something went wrong while fetching articles");
        throw new Error('Failed to fetch articles');
      }

      const article_resposne = await response.json();
      setArticle(article_resposne.crud_response.data.article);

    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-spinner-container">
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    );
  }

  if (!article) return <p>Error loading article</p>;

  // Combine content and images into a single array, with each having an index
  const combinedContent = [
    ...article.content.map(item => ({
      type: 'text',
      index: item.index,
      content: item.content
    })),
    ...article.images.map((image, idx) => ({
      type: 'image',
      index: parseInt(image.filename.split('_')[1].split('.')[0], 10),
      content: `data:image/jpeg;base64,${image.content}`,
      filename: image.filename
    }))
  ];

  // Sort by index to arrange text and images in the correct order
  combinedContent.sort((a, b) => a.index - b.index);

  return (
    <div className="container mt-5 article-blog-container">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="article-header text-center mb-4">
            <h1 className="article-title text-left">{article.title}</h1>
            <p className="text-muted text-left">{article.brief}</p>
            <p className="article-meta text-muted text-left">
              Posted by {article.username} on September 12, 2024
            </p>
          </div>

          {/* Render combined content */}
          <article className="article-content">
            {combinedContent.map((item, idx) => 
              item.type === 'text' ? (
                <p key={idx}>{item.content}</p>
              ) : (
                <img
                  key={idx}
                  className="img-fluid rounded mb-4"
                  src={item.content}
                  alt={`Article Image ${idx + 1}`}
                  style={{ width: '100%', height: 'auto' }}
                />
              )
            )}
          </article>
        </div>
      </div>
    </div>
  );
}

export default Article;
