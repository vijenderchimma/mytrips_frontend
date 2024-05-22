import {useState,useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from "js-cookie"
import axios from 'axios'

import TripsData from '../TripsData'
import Header from "../Header"
import { projectContext } from '../../context/projectContext'
import API_URL from '../Helpers/ApiPath'


const Waterfalls = () => {
  const navigate = useNavigate()

   const [WaterfallsData,setWaterfallsData] = useState([])
   const {waterfallState} = useContext(projectContext)

    useEffect(() => {
        const fetchData = async () => {
          try {
            let url = `${API_URL}/waterfalls/get-waterfalls`;
            if (waterfallState !== undefined) {
            // Correctly append the query string
            url += `?state=${waterfallState}`;
            }
            const response = await axios.get(url);
            console.log(response.data);
            setWaterfallsData(response.data)
          } catch (err) {
            console.log(err);
          }
        };
    
        fetchData();
      }, [waterfallState]);

      useEffect(()=>{
        const jwtToken = Cookies.get('jwt_token')
      if (jwtToken === undefined) {
        navigate('/login')
      }
      })

    return (
        <>
        <Header/>
        <div className="waterfalss-container">
            <h1>Waterfalls</h1>
            <ul className="list-container">
                {WaterfallsData.map(eachData=>(
                    <TripsData eachData = {eachData} key = {eachData._id} />
                ))}
            </ul>
        </div>
        </>
    )

}

export default Waterfalls