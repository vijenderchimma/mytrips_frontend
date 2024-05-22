import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import axios from 'axios';

import './index.css';
import Header from '../Header';
import API_URL from '../Helpers/ApiPath';

const LocationForm = () => {
    const [name, setName] = useState('');
    const [district, setDistrict] = useState('');
    const [state, setStateValue] = useState('');
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState('');
    const [option, setOption] = useState('waterfalls');
    const [url, setLocation] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const jwtToken = Cookies.get('jwt_token');
        if (jwtToken === undefined) {
            navigate('/login');
        }
    }, [navigate]);

    const onchangeName = event => setName(event.target.value);
    const onChangeOption = e => setOption(e.target.value);
    const onChangeDistrict = e => setDistrict(e.target.value);
    const onChangeState = e => setStateValue(e.target.value);
    const onChangeDescription = event => setDescription(event.target.value);
    const onChangePhoto = e => setFile(e.target.files[0]);
    const onChangeLocation = event => setLocation(event.target.value);

    const onSubmitData = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('state', state);
        formData.append('district', district);
        formData.append('image', file);  // Ensure 'image' is used as the key
        formData.append('description', description);
        formData.append('url', url);

        let selectedOption;

        if (option === 'waterfalls') {
            selectedOption = 'waterfalls/add-waterfalls';
        } else if (option === 'temples') {
            selectedOption = 'temples/add-temples';
        } else {
            selectedOption = 'trekking/add-trekking';
        }

        try {
            const response = await axios.post(`${API_URL}/${selectedOption}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response && response.status === 201) {
                console.log('User details posted successfully:', response.data);
            }
        } catch (err) {
            console.log(err);
        }

        setDescription('');
        setDistrict('');
        setStateValue('');
        setLocation('');
        setName('');
        setFile(null);
    }

    return (
        <>
            <Header />
            <div className='trips-form-container'>
                <h1 className='trips-form'>Trips Form</h1>
                <form className='form-container' onSubmit={onSubmitData}>
                    <label htmlFor='name' className='label'>Name:</label>
                    <input type="text" value={name} className='user-input' id="name" placeholder='Enter Location Name' onChange={onchangeName} />
                    <label htmlFor='district' className='label'>District:</label>
                    <input type="text" value={district} className='user-input' id="district" placeholder='Enter Location District' onChange={onChangeDistrict} />
                    <label htmlFor='state' className='label'>State:</label>
                    <input type="text" value={state} className='user-input' id="state" placeholder='Enter Location State' onChange={onChangeState} />
                    <label htmlFor='description' className='label'>Description:</label>
                    <textarea cols="50" rows="5" value={description} className='user-input' id="description" placeholder='Enter Location Description' onChange={onChangeDescription}></textarea>
                    <label htmlFor='category' className='label'>Category:</label>
                    <select className='user-input' id="category" value={option} onChange={onChangeOption}>
                        <option value="waterfalls">Waterfalls</option>
                        <option value="temples">Temples</option>
                        <option value="trekking">Trekking</option>
                    </select>
                    <label htmlFor='url' className='label'>Location URL:</label>
                    <input type="text" className='user-input' value={url} onChange={onChangeLocation} placeholder="Enter Location URL" />
                    <label htmlFor='photo' className='label'>Photo:</label>
                    <input type="file" id = "photo" className='file' onChange={onChangePhoto} />
                    {file && <img width={100} height={100} alt="preview" src={URL.createObjectURL(file)} />}
                    <br />
                    <button type="submit" className='submit-button'>Submit</button>
                </form>
            </div>
        </>
    );
}

export default LocationForm;
