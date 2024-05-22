import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

import './index.css'
import API_URL from "../Helpers/ApiPath";

const Register = () =>{

    const [username,setUserName] = useState()
    const [password,setPassword] = useState()
    const [email,setEmail] = useState()
    const [number,setNumber] = useState()
    const [gender,setGender] = useState()
    const [registerStatus,setRegisterStatus] = useState()
    const navigate = useNavigate()

    const onChangeUserName = event => {
        setUserName(event.target.value)
    }

    const onChangeEmail = event =>{
        setEmail(event.target.value)
    }

    const onChangeGender = event => {
       setGender(event.target.value)
    }

    const onChangeNumber = event =>{
        setNumber(event.target.value)
    }

    const onChangePassword = event => {
        setPassword(event.target.value)
    }

    const navigateToLogin = () => {
        navigate("/login",{ replace: true })
    }

    const onSubmitForm = async event =>{
        event.preventDefault()

        const userDetails = {username,password,email,number,gender}

        try{
            const response = await axios.post(`${API_URL}/register`,userDetails)
            console.log(response.data)
            setRegisterStatus(response.data)
            if (response.status === 200) {
                navigateToLogin();
              } 
        }
        catch(err){
            console.log(err)
        }

        setGender('')
        setEmail('')
        setNumber('')
        setPassword('')
        setUserName('')
    }

    return (

        <>
        <div className="register-container">
            <h1 className="registration">Registration</h1>
                <form className="form-container" onSubmit={onSubmitForm}>
                <label htmlFor="userName" className="label">USERNAME: </label>
                <input value = {username} className="user-input" type = "text" onChange={onChangeUserName} placeholder="Enter Your Name" id = "userName" />
                <label htmlFor = "password" className='label'>Password: </label>
                <input value = {password} className="user-input" id = "password" type="password" onChange = {onChangePassword} placeholder="Enter Your Password" />
                <label htmlFor = "email" className="label">EMAIL: </label>
                <input type = "email" id ="email" className="user-input" value = {email} onChange = {onChangeEmail} placeholder="Enter Your Email"/>
                <label htmlFor = "number" className="label">NUMBER: </label>
                <input type = "number" id = "number" className="user-input" value = {number} onChange = {onChangeNumber} placeholder="Enter Your Number"/>
                <input type = "radio" id = "male" checked={gender === 'male'} className="gender" value = "male" onChange = {onChangeGender}/>
                <label htmlFor = "male" className="radio-label" >Male</label>
                <input type = "radio" id = "female" checked={gender === 'female'} className="gender" value = "female" onChange = {onChangeGender} />
                <label htmlFor = "female" className="radio-label">Female</label>
                <input type = "submit" className="register-button" value = "Register" />
                <p className="register-status">{registerStatus}</p>
                </form>
        </div>
        </>
    )
}

export default Register