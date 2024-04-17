import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Header({ onSubmit }) {
    const navigate = useNavigate();
    const [name, setName] = useState('');

    // Update local storage when the name state changes
    useEffect(() => {
        localStorage.setItem('name', name);
    }, [name]);

    // Debounce function for delaying API requests
    const debounce = (func, delay) => {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    };

    // Function to fetch data from the API
    const fetchData = async (query) => {
        try {
            const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    };

    // Handle form submission for searching
    const handleSubmit = async (e) => {
        e.preventDefault();
        const searchData = await fetchData(name);
        onSubmit(searchData);
    };

    const handleLogout = () => {
        navigate('/');
    };

    const handleAccountDelete = () => {
        localStorage.removeItem('Email');
        navigate('/');
    };


    return (
        <div className='header mb-4 bgcolor'>
            <div className="funcc d-flex align-items-center justify-content-around position-absolute w-100 p-1">
                <div className="d-flex justify-content-around forPosition">
                    <Link to='/fav'><button className="btn btn-success h-100">Favorites</button></Link>

                    <form onSubmit={handleSubmit} className='d-flex w-0'>
                        <input className="form-control me-2" value={name} onChange={(e) => { setName(e.target.value) }} placeholder="Search" />
                        <button className="btn btn-success">Search</button>
                    </form>

                    <button className='btn btn-danger mx-1' onClick={handleLogout}>LogOut</button>
                    <button className='btn btn-danger' onClick={handleAccountDelete}>Delete Account</button>
                </div>
            </div>
        </div>
    );
}

export default Header;
