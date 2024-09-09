import React, {useState, useEffect} from 'react';
import '../styles/create.css';
import CONFIG from '../js/config'
import getHeaders from '../js/utils';


function Create () {

  // Function to handle the image preview
  function displaySelectedImage(event, elementId) {
    const selectedImage = document.getElementById(elementId);
    const fileInput = event.target;

    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();

      reader.onload = function(e) {
        selectedImage.src = e.target.result;
      };
      reader.readAsDataURL(fileInput.files[0]);
    }
  }

  const submitArticleButtonHandler = async () => {
    try {
      // Get the input values
      const title = document.getElementById('article-title').value;
      const brief = document.getElementById('article-brief').value;
      const content = document.getElementById('article-content').value;
      const coverImage = document.getElementById('coverImage').files[0];
      const intermediateImage = document.getElementById('intermediateImage').files[0];

      if (!title || !brief || !content || !coverImage || !intermediateImage) {
        alert("One or more fields are empty");
        return;
      }

      const formData = new FormData();
      formData.append('title', title);
      formData.append('brief', brief);
      formData.append('content', content);
      formData.append('cover_image', coverImage);
      formData.append('intermediate_image', intermediateImage);

      const response = await fetch(`${CONFIG.BACKEND_URL}${CONFIG.API_ENDPOINTS.ARTICLE}`, {
        method: 'POST',
        headers: getHeaders(true),
        body: formData
      });
      if (!response.ok) {
        const statusCode = response.status;
        if (statusCode > 400 && statusCode < 500){
          if (statusCode === 401){
            alert('Session Expired: Please sign in again');
          } else if (statusCode === 403){
            alert('Please Sign in or Sign up');
          }
          // TODO: handle other exceptions
          return;
        } else{
          throw new Error('Network response was not ok ' + response.statusText);
        }
      }
      alert('Article sent for approval, you will recieve an email once approved'); 
    } catch (error) {
      console.error('Error:', error);
    }
  }


  return (
  <>
    <div id="createArticle" className="article-container">
      <header className="header">
        <h1 className='create-article-heading'>Create a New Article</h1>
      </header>
      <div className="article-editor">
        <input type="text" id="article-title" className="title-input" placeholder="Enter the title..." />
        <input type="text" id="article-brief" className="title-input" placeholder="Brief about the topic..." />
        <textarea id="article-content" className="content-input" placeholder="Write your article here..."></textarea>
        <div className="image-upload">
          <div className="create-article-row-container">
            <div className="col">
              <div className="mb-4 d-flex justify-content-center">
                <img id="articleCoverImage" src="https://mdbootstrap.com/img/Photos/Others/placeholder.jpg"
                alt="example placeholder"/>
              </div>
              <div className="d-flex justify-content-center">
                <div data-mdb-ripple-init className="btn btn-dark btn-rounded">
                  <label className="form-label m-1" for="coverImage">Choose file</label>
                  <input type="file" className="form-control d-none" id="coverImage" onChange={(event) => displaySelectedImage(event, 'articleCoverImage')} />
                </div>
              </div>
            </div>
            <div className="col">
              <div className="mb-4 d-flex justify-content-center">
                <img id="articleIntermediateImage" src="https://mdbootstrap.com/img/Photos/Others/placeholder.jpg"
                alt="example placeholder" />
              </div>
              <div className="d-flex justify-content-center">
                <div data-mdb-ripple-init className="btn btn-dark btn-rounded">
                  <label className="form-label m-1" for="intermediateImage">Choose file</label>
                  <input type="file" className="form-control d-none" id="intermediateImage" onChange={(event) => displaySelectedImage(event, 'articleIntermediateImage')} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='approval-row'>
          <button id="submit-article" onClick={submitArticleButtonHandler} className="create-article-submit-button">Request Approval</button>
        </div>
      </div>
    </div>
  </>)
}

export default Create;
