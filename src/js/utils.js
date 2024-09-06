// header to every request made after signin/signup
function getHeaders(form=false) {
  const token = sessionStorage.getItem('token'); // Or wherever you store your token
  // const email = localStorage.getItem('email'); // Or wherever you store the user's email
  
  if(form){
    return {
        'Authorization': `Bearer ${token}`
    };
  }
  else{
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }
}

export default getHeaders;
