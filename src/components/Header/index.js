// Header.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';
import Cookies from 'js-cookie';
import { projectContext } from '../../context/projectContext';


const Header = () => {
  const navigate = useNavigate()
  const {setTempleState} = useContext(projectContext)
  const {setWaterfallState} = useContext(projectContext)
  const {setTrekkingState} = useContext(projectContext)
  
  const onClickLogoutButton = () => {
    Cookies.remove("jwt_token")
    navigate("/login",{ replace: true })
  }

  const onChangeTemples = (event) => {
    setTempleState(event.target.value)
  }

  const onChangeWaterfalls = (event) => {
    setWaterfallState(event.target.value)
  }

  const onChangeTrekking = (event) => {
    setTrekkingState(event.target.value)
  }






  return (
  <nav className='nav-container'>
    <img src="https://i.ibb.co/5jZrCq7/mytrips-black-logo.png" className='website-logo' alt="website logo" />
    <ul className='links-container'>
      <li><Link to="/" className='nav-link'>Home</Link></li>
      <li><Link to = "/locationform" className='nav-link'>LocationForm</Link></li>
      <li><Link to="/temples" className='nav-link'><select className='select-button' onChange = {onChangeTemples}>
      <option className='option' value="">Temples</option>
        <option className='option'>Telangana</option>
        <option className='option'>Andhra Pradesh</option>
        <option className='option'>Kerala</option>
        <option className='option'>Karnataka</option>
        <option className='option'>Mahrastra</option>
        <option className='option'>Tamilnadu</option>
        <option className='option'>Goa</option>
        <option className='option'>Himachal Pradesh</option></select></Link></li>
      <li><Link to="/waterfalls" className='nav-link'><select className='select-button' onChange = {onChangeWaterfalls}>
      <option className='option' value= "">Waterfalls</option>
      <option className='option'>Telangana</option>
        <option className='option'>Andhra Pradesh</option>
        <option className='option'>Kerala</option>
        <option className='option'>Karnataka</option>
        <option className='option'>Mahrastra</option>
        <option className='option'>Tamilnadu</option>
        <option className='option'>Goa</option>
        <option className='option'>Himachal Pradesh</option></select></Link></li>
      <li><Link to ="/trekking" className='nav-link'><select className='select-button' onChange = {onChangeTrekking}>
      <option className='option' value = "">Trekking</option>
        <option className='option'>Telangana</option>
        <option className='option'>Andhra Pradesh</option>
        <option className='option'>Kerala</option>
        <option className='option'>Karnataka</option>
        <option className='option'>Mahrastra</option>
        <option className='option'>Tamilnadu</option>
        <option className='option'>Goa</option>
        <option className='option'>Himachal Pradesh</option></select></Link></li>
      <li><Link to="/About" className='nav-link'>About</Link></li>
      <li><Link to="/contact" className='nav-link'>Contact</Link></li>
    </ul>
    <button className='logout-button' onClick={onClickLogoutButton}>Logout</button>
  </nav>
);
  }
export default Header;

