import {useState,useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from "js-cookie"
import axios from 'axios'

import TripsData from '../TripsData'
import Header from "../Header"

import "./index.css"
import { projectContext } from '../../context/projectContext'
import API_URL from '../Helpers/ApiPath'


const Temples = () => {
  const navigate = useNavigate()

   const [templeData,setTempleData] = useState([])
   const {templeState} = useContext(projectContext)
   console.log(templeState)

    useEffect(() => {
        const fetchData = async () => {
          try {
            let url = `${API_URL}/temples/get-temples`;
            if (templeState !== undefined) {
              // Correctly append the query string
              url += `?state=${templeState}`;
            }
            const response = await axios.get(url);
            console.log(response.data);
            setTempleData(response.data);
          } catch (err) {
            console.log(err);
          }
        };
    
        fetchData();
      },[templeState]);

      useEffect(()=>{
        const jwtToken = Cookies.get('jwt_token')
      if (jwtToken === undefined) {
        navigate('/login')
      }
      })

    return (
        <>
        <Header/>
        <div className="temple-main-container">
            <h1>Temples</h1>
            <ul className="list-container">
                {templeData.map(eachData=>(
                    <TripsData eachData = {eachData} key = {eachData._id} />
                ))}
            </ul>
        </div>
        </>
    )

}

export default Temples


