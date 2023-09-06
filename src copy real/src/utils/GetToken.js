const GetToken = () => {
  const token = sessionStorage.getItem('token');
  return token || ''; 
};

export default GetToken;
