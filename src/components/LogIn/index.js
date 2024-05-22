import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import API_URL from '../Helpers/ApiPath';

import './index.css';
import { useNavigate } from 'react-router-dom';

const LogIn = (props) => {
  const navigate = useNavigate()


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginState,setLoginState] = useState();


  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const navigateToHome = () =>{
    const jwtToken = Cookies.get("jwt_token")
    if(jwtToken !== undefined){
      navigate("/",{ replace: true })
    } 
  }

  const onSubmitSuccess = (jwtToken) => {
    console.log('JWT Token:', jwtToken);
  
    // Explicitly convert jwtToken to string
    const tokenAsString = String(jwtToken);
  
    Cookies.set("jwt_token", tokenAsString, { expires: 1, path: "/" });
  };
  

  const onSubmitForm = async (event) => {
    event.preventDefault();
  
    const userDetails = { email, password };
    const headers = {
      'Content-Type': 'application/json',
    };
  
    try {
      const response = await axios.post(`${API_URL}/login`, userDetails, { headers });
  
      if (response && response.status === 200) {
        console.log('User details posted successfully:', response.data);
        const jwtToken = response.data.token;
        onSubmitSuccess(jwtToken);
        setLoginState(response.data.message)
        console.log(response.message)
        navigateToHome();
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error('Error posting user details:', error);
      console.log('Response status:', error.response ? error.response.status : 'N/A');
      console.log('Response data:', error.response ? error.response.data : 'N/A');
      console.log('Axios configuration:', error.config);
      navigate('/register',{replace: true})
      
    }
  };
  
  console.log()
  

  return (
    <>
      <div className="login-container">
        <h1 className="login-heading">User Login</h1>
        <form className="form-container" onSubmit={onSubmitForm}>
          <label htmlFor="email" className="label">
            USER EMAIL:
          </label>
          <input
            value={email}
            className="user-input"
            type="email"
            onChange={onChangeEmail}
            placeholder="Enter Email"
            id="email"
          />
          <label htmlFor="password" className="label">
            PASSWORD:
          </label>
          <input
            value={password}
            className="user-input"
            id="password"
            type="password"
            onChange={onChangePassword}
            placeholder="Enter Password"
          />
          <input type="submit" className="login-button" value="LogIn" />
          {loginState? <p className='login-state'>{loginState}</p> : ""}
        </form>
      </div>
    </>
  );
};

export default LogIn;
