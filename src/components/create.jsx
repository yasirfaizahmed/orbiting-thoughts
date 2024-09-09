import React, {useState, useEffect} from 'react';
import '../styles/create.css';


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
          <button id="submit-article" className="create-article-submit-button">Request Approval</button>
        </div>
      </div>
    </div>
  </>)
}

export default Create;
