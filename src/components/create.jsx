import React, {useState, useEffect, useRef} from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import UUID to generate unique identifiers
import '../styles/create.css';
import CONFIG from '../js/config'
import getHeaders from '../js/utils';
import addImage from '../assets/icons8-add-image-30.png';
import addCode from '../assets/icons8-code-32.png'
import addSection from '../assets/icons8-lines-32.png'
import clsoeIcon from '../assets/icons8-close-24.png'


function Create ({setToken,
                  openSigninModal}) {

  const [isLoading, setLoading] = useState(false);
  const [isSideDropVisible, setSideDropVisible] = useState(false);
  const [sections, setSections] = useState([]);
  const textAreaRefs = useRef([]); // To store references to all textareas
  const [sectionIndex, setSectionIndex] = useState(0);
  
  // useEffect(() => {
  //   console.log("useEffect called");
  //   addNewTextSection();
  // }, []);


  //handle the dropdown click
  function handleAddContentButton() {
    setSideDropVisible(!isSideDropVisible);
  }

  // Handle adding a new text section
  const addNewTextSection = () => {
    setSections([...sections, { id: uuidv4(), type: 'text', content: '', index: sectionIndex}]); // Add new text section
    setSectionIndex(prevIndex => prevIndex + 1);
  };
  // Handle adding a new image section
  const addNewImageSection = () => {
    setSections([...sections, { id: uuidv4(), type: 'image', content: null, index: sectionIndex}]); // Add new empty image section
    setSectionIndex(prevIndex => prevIndex + 1);
  };

  // Handle removing a section
  const removeSection = (index) => {
    setSections(sections.filter((_, i) => i !== index)); // Remove section based on index
  };

  // Handle text change and auto-resize for specific section
  const handleSectionChange = (index, value) => {
    const updatedSections = sections.map((section, i) =>
      i === index ? { ...section, content: value } : section
    );
    setSections(updatedSections);

    // Auto-resize the textarea
    autoResizeTextarea(index);
  };

  // Automatically adjust the height of the textarea based on content
  const autoResizeTextarea = (index) => {
    const textarea = textAreaRefs.current[index];
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height to calculate the new height
      textarea.style.height = textarea.scrollHeight + 'px'; // Set height based on content
    }
  };

   // Generate a unique file name
   const generateUniqueFileName = (file) => {
    const extension = file.name.split('.').pop(); // Get the file extension
    const uniqueName = `${uuidv4()}.${extension}`; // Generate unique name using UUID
    return uniqueName;
  };

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const uniqueFileName = generateUniqueFileName(file); // Generate a unique name
      console.log(`Unique file name: ${uniqueFileName}`);
  
      // Resize the image before displaying or uploading
      resizeImage(file, 800, 600, (resizedImage) => {
        const updatedSections = sections.map((section, i) =>
          i === index ? { ...section, content: { src: resizedImage, fileName: uniqueFileName } } : section
        );
        setSections(updatedSections);
      });
    }
  };

  // Function to handle image selection, resize it, and generate a preview URL
  const handleImageSelection = (event, sectionId) => {
    const selectedFile = event.target.files[0]; // Get the selected image file
    if (selectedFile) {
      resizeImage(selectedFile, 800, 600, (resizedImage) => {
        // Create a preview URL for the resized image
        const previewUrl = URL.createObjectURL(selectedFile); 

        // Update the sections with the resized image and preview URL
        setSections(prevSections =>
          prevSections.map(section => 
            section.id === sectionId 
              ? { ...section, content: { src: resizedImage, preview: previewUrl, file: selectedFile } } 
              : section
          )
        );
      });
    }
  };


  // Resize image using canvas before displaying
  const resizeImage = (file, maxWidth, maxHeight, callback) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target.result;
    };

    img.onload = () => {
      let width = img.width;
      let height = img.height;

      // Maintain aspect ratio while resizing
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
      if (height > maxHeight) {
        width = Math.round((width * maxHeight) / height);
        height = maxHeight;
      }

      // Create a canvas to draw the resized image
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      // Convert the canvas back to a base64 image
      callback(canvas.toDataURL(file.type));
    };

    reader.readAsDataURL(file);
  };


  const submitArticleButtonHandler = async () => {
    setLoading(true);
    try {
      const title = document.getElementById('article-title').value;
      const brief = document.getElementById('article-brief').value;

      const formData = new FormData();
      let text_content = []

      sections.forEach(section => {
        if (section.type === 'text') {
          text_content.push({index: section.index, content: section.content});
        }
      });

      formData.append('title', title);
      formData.append('brief', brief);
      formData.append('text_content', JSON.stringify(text_content));
      sections.forEach(section => {
        if (section.type === 'image') {
          formData.append('image_list', section.content.file); // Append each image separately
        }
      });


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
            setToken('');
            openSigninModal(); 
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
          
          {/* Render sections dynamically */}
          <div className="sections-container">
              {sections.map((section, index) => (
                <div key={section.id} style={{ marginBottom: '10px', position: 'relative' }}>
                  <span
                    onClick={() => removeSection(index)}
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      cursor: 'pointer',
                      color: 'white',
                      fontSize: '16px'
                    }}>
                    <img src={clsoeIcon} style={{borderRadius: '50%'}} alt="Add Code" />
                  </span>

                  {section.type === 'text' ? (
                    <textarea
                      className="content-input"
                      placeholder="Write your article here..."
                      rows="4"
                      style={{ overflow: 'hidden', resize: 'none', marginBottom: '10px' }}
                      value={section.content}
                      onChange={(e) => handleSectionChange(index, e.target.value)}
                      ref={(el) => (textAreaRefs.current[index] = el)} // Store the textarea ref
                      onInput={() => autoResizeTextarea(index)} // Adjust the height as content changes
                    />
                  ) : (
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => handleImageSelection(event, section.id)} 
                      />
                      {section.content && section.content.src && (
                        <div>
                          <img
                            src={section.content.src}
                            alt={`Uploaded Preview ${index}`}
                            style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }}
                          />
                          <p>File Name: {section.content.fileName}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>   


          {/* Dropdown menu */}
          <div className="expandable-container">
            <div className={`expander ${isAddContentDropdownVisible ? 'expanded' : ''}`}>
              <button className="center-button" onClick={handleAddContentButton}>+</button>
              {isAddContentDropdownVisible && (
                <div className="button-group">
                  <button className="add-image" onClick={addNewImageSection} style={{borderRadius: '50%', marginLeft: '5px'}}>
                  <img src={addImage} style={{borderRadius: '50%'}} alt="Add Code" />
                  </button>
                  <button className="add-code" style={{borderRadius: '50%', marginLeft: '5px'}}>
                    <img src={addCode} style={{borderRadius: '50%'}} alt="Add Code" />
                  </button>
                  <button className="add-section" onClick={addNewTextSection} style={{borderRadius: '50%', marginLeft: '5px', marginRight: '5px'}}>
                    <img src={addSection} alt="Add Section" style={{borderRadius: '50%'}}/>
                  </button>
                </div>
              )}
            </div>
          </div>


          <div className='approval-row'>
            <button id="submit-article" onClick={submitArticleButtonHandler} className="create-article-submit-button">Request Approval</button>
          </div>
            
        </div>
      </div>
    </div>
  </>)
}

export default Create;
