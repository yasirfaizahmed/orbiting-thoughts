// header to every request made after signin/signup
function getHeaders(form=false) {
  const token = sessionStorage.getItem('jwtToken');
  
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
