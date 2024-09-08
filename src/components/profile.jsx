import React, {useState, useEffect} from 'react';
import '../styles/profile.css'
import CONFIG from '../js/config'
import getHeaders from '../js/utils';


function Profile () {

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

  // Access user and profile information from the profileData
  const { user, profile, profilePicture } = profileData.crud_response.data;

  return (
    <>
    
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center">
          <div className="col col-lg-9 col-xl-8">
            <div className="card">
              <div className="rounded-top text-white d-flex flex-row" >
                <div className="ms-4 mt-5 d-flex flex-column" >
                  <img src={`data:image/jpeg;base64,${profilePicture}`}
                    alt="Generic placeholder image" className="img-fluid img-thumbnail mt-4 mb-2"
                    ></img>
                  <button  type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-dark text-body" data-mdb-ripple-color="dark" >
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
                  <p className="lead fw-normal mb-0">Recent photos</p>
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

    </>
  );
}


export default Profile;
