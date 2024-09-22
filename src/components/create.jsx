import React, {useState, useEffect} from 'react';
import '../styles/create.css';
import CONFIG from '../js/config'
import getHeaders from '../js/utils';
import addIcon from '../assets/icons8-add-24.png';
import addImage from '../assets/icons8-add-image-30.png';
import addCode from '../assets/icons8-code-32.png'
import addSection from '../assets/icons8-lines-32.png'


function Create () {

  const [isLoading, setLoading] = useState(false);
  const [isAddContentDropdownVisible, setAddContetnDropdown] = useState(false);

  //handle the dropdown click
  function handleAddContentButton() {
    setAddContetnDropdown(!isAddContentDropdownVisible);

  }

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

  // function to handle the height of content dynamically
  useEffect(() => {
  const textarea = document.getElementById('article-content');

  const adjustHeight = () => {
    textarea.style.height = 'auto'; // Reset the height
    textarea.style.height = textarea.scrollHeight + 'px'; // Set it to the scroll height
  };

  textarea.addEventListener('input', adjustHeight);

  // Clean up event listener when component unmounts
  return () => {
    textarea.removeEventListener('input', adjustHeight);
  };
  }, []);

  const submitArticleButtonHandler = async () => {
    setLoading(true);
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
    finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  }


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
    <div style={{width: '100%', backgroundColor: 'black', display: 'flex',
      justifyContent: 'center'
    }}>
      <div id="createArticle" className="article-container">
        <header className="header">
          <h1 className='create-article-heading'>Create a New Article</h1>
        </header>
        <div className="article-editor">
          <input type="text" id="article-title" className="title-input" placeholder="Title..." autoComplete="off"/>
          <input type="text" id="article-brief" className="brief-input" placeholder="Brief about the topic..." autoComplete="off"/>
          <textarea
            id="article-content"
            className="content-input"
            placeholder="Write your article here..."
            rows="4" /* Set initial rows */
            style={{ overflow: 'hidden', resize: 'none' }} /* Prevent manual resizing */
          />

          <div className='addcontent-container' style={{display: 'inline-flex',
                                                        border: isAddContentDropdownVisible ? '2px solid white' : 'none',
                                                        alignItems: 'center',
                                                        borderColor: 'white',
                                                        borderRadius: '40px'}}>
            <button className='btn' style={{ position: 'relative' }} onClick={() => handleAddContentButton()}>
              <div className="icon-wrapper">
                <img src={addIcon} alt="Add Image" />
              </div>
            </button>
            
              
            {/* Dropdown menu */}
            <div className={`addcontent-menu ${isAddContentDropdownVisible ? 'show' : ''}`}>
              <div className="addcontent-dropdown">
                <button className="add-image" style={{borderRadius: '50%', marginLeft: '5px'}}>
                  <img src={addImage} style={{borderRadius: '50%'}} alt="Add Image" />
                </button>
                <button className="add-code" style={{borderRadius: '50%', marginLeft: '5px'}}>
                  <img  src={addCode} style={{borderRadius: '50%'}} alt="Add Code" />
                </button>
                <button className="add-section" style={{borderRadius: '50%', marginLeft: '5px', marginRight: '5px'}}>
                  <img src={addSection} alt="Add Section" style={{borderRadius: '50%'}}/>
                </button>
              </div>
            </div>
          </div>
        {/* <div className="image-upload">
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
            </div> */}

              <div className='approval-row'>
                <button id="submit-article" onClick={submitArticleButtonHandler} className="create-article-submit-button">Request Approval</button>
              </div>
            
        </div>
      </div>
    </div>
  </>)
}

export default Create;
