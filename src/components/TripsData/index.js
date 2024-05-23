import './index.css'
import API_URL from '../Helpers/ApiPath';

const TripsData = (props) => {
    const {eachData} = props

    return (
        <li className='list-item'>
            {eachData.image ?
                <img src = {`${API_URL}/uploads/${eachData.image}`} alt = {eachData.name} className="image" />: "" }
                <div className='content-container'>
                    <h1 className='name'><span className='span'>Name: </span>{eachData.name}</h1>
                    <p className='state'><span className='span'>State: </span>{eachData.state}</p>
                    <p className='district'><span className='span'>District: </span>{eachData.district}</p>
                    <p className='span'>Location:<a href = {eachData.url} target ="_blank" rel="noreferrer">Click here for location</a></p>
                    {eachData.description ? <p className='description'><span className='span'>Description: </span> {eachData.description}</p> : ""}
                    <button className="know-more-button">Know More</button>
                </div>
        </li>
    )
}

export default TripsData
