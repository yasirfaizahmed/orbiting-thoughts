import React, {useState, useEffect} from 'react';
import '../styles/profile.css'
import CONFIG from '../js/config'
import getHeaders from '../js/utils';


function Profile () {
  // state to set edit profile modal visibility
  const [editProfileModalVisible, setEditProfileModalVisible] = useState(false);

  const [selectedImagePreview, setSelectedImagePreview] = useState('https://mdbootstrap.com/img/Photos/Others/placeholder.jpg'); // Placeholder image

  const [profileData, setProfileData] = useState(null);

  // Retrieve profileData from localStorage when the component mounts
  useEffect(() => {
    const storedProfileData = localStorage.getItem('profileData');
    if (storedProfileData) {
      setProfileData(JSON.parse(storedProfileData));
    }
  }, []);  

  if (!profileData) {
    return (
      <>
        <p> Could not fetch profile Data, something went wrong!! </p>
      </>
    );
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

  // Access user and profile information from the profileData
  const { user, profile, profilePicture } = profileData.crud_response.data;

  const updateProfileButtonHandler = async () => {
    try {
      // Get the input values
      const username = document.getElementById('newUsernameInput').value;
      const about = document.getElementById('aboutYourselfInput').value;
      const password = document.getElementById('newPasswordInput').value;
      const profileImage = document.getElementById('customFile1').files[0];

      // Create a new FormData object
      const formData = new FormData();
      formData.append('username', username);
      formData.append('about', about);
      formData.append('password', password);
      formData.append('picture', profileImage);

      const response = await fetch(`${CONFIG.BACKEND_URL}${CONFIG.API_ENDPOINTS.EDIT_PROFILE}`, {
          method: 'POST',
          headers: getHeaders(form=true), // Ensure this function is defined correctly to not include 'Content-Type'
          body: formData
      });

      if (!response.ok) {
          const statusCode = response.status;
          if (statusCode == 401){
              alert('Session Expired: Please sign in again');
              // Show the signin modal
              const signinModal = new bootstrap.Modal(document.getElementById('signin'));
              signinModal.show();
              return;
          } else{
              throw new Error('Network response was not ok ' + response.statusText);
          }
      }

      const data = await response.json();
      console.log('GET Response:', data);

      // Store the profile data in localStorage or handle it as needed
      sessionStorage.setItem('profileData', JSON.stringify(data));

      // show profile
      showProfile();
    } catch (error) {
        console.error('Error:', error);
    }
  }

  return (
    <>
    
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center">
          <div className="col col-lg-9 col-xl-8 main-profile-container">
            <div className="card">
              <div className="rounded-top text-white d-flex flex-row" >
                <div className="ms-4 mt-5 d-flex flex-column" >
                  <img src={`data:image/jpeg;base64,${profilePicture}`}
                    alt="Generic placeholder image" className="img-fluid img-thumbnail mt-4 mb-2"
                    ></img>
                  <button  id='editProfileButton' onClick={() => setEditProfileModalVisible(prevState => !prevState)} type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-dark text-body edit-profile" data-mdb-ripple-color="dark" >
                    Edit profile
                  </button>
                </div>
                <div className="ms-3" >
                  <h5>{user.username}</h5>
                  {/* <p>New York</p> */}
                </div>
              </div>
              <div className="p-4 text-black bg-body-tertiary">
                <div className="d-flex justify-content-end text-center py-1 text-body">
                  <div>
                    <p className="mb-1 h5">253</p>
                    <p className="small text-muted mb-0">Articles</p>
                  </div>
                  {/* <div className="px-3">
                    <p className="mb-1 h5">1026</p>
                    <p className="small text-muted mb-0">Followers</p>
                  </div>
                  <div>
                    <p className="mb-1 h5">478</p>
                    <p className="small text-muted mb-0">Following</p>
                  </div> */}
                </div>
              </div>
              <div className="card-body p-4 text-black">
                <div className="mb-5  text-body">
                  <p className="lead fw-normal mb-1">About</p>
                  <div className="p-4 bg-body-tertiary">
                    <p className="font-italic mb-1">{profile.about}</p>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4 text-body">
                  <p className="lead fw-normal mb-0">Recent articles</p>
                  <p className="mb-0"><a href="#!" className="text-muted">Show all</a></p>
                </div>
                <div className="row g-2">
                  <div className="col mb-2">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp" alt="image 1"
                      className="w-100 rounded-3"></img>
                  </div>
                  <div className="col mb-2">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp" alt="image 1"
                      className="w-100 rounded-3"></img>
                  </div>
                </div>
                <div className="row g-2">
                  <div className="col">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp" alt="image 1"
                      className="w-100 rounded-3"></img>
                  </div>
                  <div className="col">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp" alt="image 1"
                      className="w-100 rounded-3"></img>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {editProfileModalVisible && (
          <div className="col">
              <div className={`modal fade ${editProfileModalVisible ? 'show' : ''}`} tabIndex="-1" id="editModal" style={{ display: editProfileModalVisible ? 'block' : 'none', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                  <div className="modal-dialog" role="document">
                      <div className="modal-content">
                          <div className="modal-header">
                              <h4 className="modal-title">Edit profile</h4><button className="btn-close" onClick={() => setEditProfileModalVisible(prevState => !prevState)} aria-label="Close" data-bs-dismiss="modal" id="closeEditProfileButton" type="button"></button>
                          </div>
                          <div className="modal-body" id="modalBody">
                              <div className="container bg-white rounded mt-5">
                                  <div className="row">
                                      <div className="col-md-12">
                                          <div className="p-3 py-5">
                                              <div className="row mt-2">
                                                  <div className="col-sm-11 col-md-6"><input type="text" className="form-control" id="newUsernameInput" placeholder="New user name"></input></div>
                                              </div>
                                              
                                              <div className="row mt-3">
                                                  <div className="col-md-12"><input type="text" className="form-control about-yourself" id="aboutYourselfInput" placeholder="About yourself"></input></div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>

                              <div>
                                  <div className="mb-4 d-flex justify-content-center">
                                      <img id="selectedImage" src="https://mdbootstrap.com/img/Photos/Others/placeholder.jpg"
                                      alt="example placeholder" />
                                  </div>
                                  <div className="d-flex justify-content-center">
                                      <div data-mdb-ripple-init className="btn btn-dark btn-rounded">
                                          <label className="form-label m-1" htmlFor="customFile1">Choose file</label>
                                          <input type="file" className="form-control d-none" id="customFile1" onChange={() => displaySelectedImage(event, 'selectedImage')} />
                                      </div>
                                  </div>
                              </div>

                          </div>
                          <div className="modal-footer">
                            <button className="btn btn-light"  onClick={() => setEditProfileModalVisible(prevState => !prevState)}  data-bs-dismiss="modal" type="button">Close</button>
                            <button className="btn btn-primary update-button" id="updateProfileButton" type="button">Update</button>
                            </div>
                      </div>
                  </div>
              </div>
          </div>
      )};

    </>
  );
}


export default Profile;
