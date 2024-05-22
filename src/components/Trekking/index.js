import {useState,useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from "js-cookie"
import axios from "axios"
import TripsData from "../TripsData"
import Header from "../Header"

import './index.css'
import { projectContext } from '../../context/projectContext'
import API_URL from '../Helpers/ApiPath'

const Trekking = () => {
    const navigate = useNavigate()
    const [trekkingData,setTrekkingData] = useState([])
    const {trekkingState} = useContext(projectContext)

    useEffect(()=>{
        const fetchData = async () =>{
            try{
                let url = `${API_URL}/trekking/get-trekking`;
                if (trekkingState !== undefined) {
                // Correctly append the query string
                url += `?state=${trekkingState}`;
                }
                const response = await axios.get(url);
                console.log(response.data);
                setTrekkingData(response.data);
            }
            catch(err){
                console.log(err)
            }
        }
        fetchData()
    },[trekkingState])

    useEffect(()=>{
        const jwtToken = Cookies.get('jwt_token')
      if (jwtToken === undefined) {
        navigate('/login')
      }
      })

    return (
        <>
        <Header/>
        <div className="trekking-container">
            <h1>Trekking</h1>
            <ul className="list-container">
                {trekkingData.map(eachData=>(
                    <TripsData eachData = {eachData} key = {eachData._id} />
                ))}
            </ul>
        </div>
        </>
    )
}

export default Trekking