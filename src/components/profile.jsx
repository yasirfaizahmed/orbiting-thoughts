import React, {useState, useEffect} from 'react';
import '../styles/profile.css'
import CONFIG from '../js/config'
import getHeaders from '../js/utils';


function Profile () {

  const handleProfile = async () => {
    try {
      const response = await fetch(`${CONFIG.BACKEND_URL}${CONFIG.API_ENDPOINTS.PROFILE}`, {
        method: 'GET',
        headers: getHeaders()
      });

      if (!response.ok) {
        const statusCode = response.status;
        if (statusCode == 401){
          alert('Session Expired: Please sign in again');
          // Show the signin modal
          // TODO
          return;
        } else {
          throw new Error('Network response was not ok ' + response.statusText);
        }
      }

      const data = await response.json();
      console.log('GET Response:', data);

      // Store the profile data in localStorage or handle it as needed
      localStorage.setItem('profileData', JSON.stringify(data));

      // make DOM changes to view profile
      // TODO

      // showProfile();

    } catch (error) {
      console.error('Error:', error);
    }
  }

  // const [isProfileVisible, setProfileVisible] = useState(false);

  // useEffect(() => {
  //   const profileButton = document.getElementById('profileButton');
  //   if (profileButton) {
  //     profileButton.addEventListener('click', handleProfile);
  //   }
  // }, [isProfileVisible]);

  return (
    <>
      <h1> THIS IS A PROFILE </h1>
    </>
  );
}

export default Profile;
