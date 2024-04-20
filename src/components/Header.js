import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserAlt, FaBookmark } from "react-icons/fa";

function Header({ onSubmit, searchedData, setSearchedData }) {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [dropMenuShow, setDropMenuShow] = useState(false);

    console.log(name);
    console.log(searchedData);

    // Handle form submission for searching
    const handleSubmit = async (e) => {
        e.preventDefault();

        axios.get(`https://api.tvmaze.com/search/shows?q=${name}`)
            .then((response) => {
                console.log(response)
                const searchData = response.data;
                onSubmit(searchData);
            })
            .catch((error) => { console.log(error) })
    };

    const handleAccountDelete = () => {
        localStorage.removeItem('formData');
        navigate('/');
    };


    return (
        <div className='header mb-4 bgcolor'>
            <div className="funcc d-flex justify-content-around position-absolute w-100 p-1">
                <div className="d-flex align-items-center justify-content-around forPosition" style={{ borderBottom: '1px solid' }}>
                    <Link to='/fav'><button className="h-100 border-0 bg-transparent text-light fs-3"><FaBookmark /></button></Link>

                    <form onSubmit={handleSubmit} className='d-flex w-0'>
                        <input className="form-control me-2" value={name} onChange={(e) => { setName(e.target.value) }} placeholder="Search" />
                        {/* <button className="btn btn-success">Search</button> */}
                    </form>

                    <button onClick={() => { setSearchedData([]) }}>All Movies</button>

                    <div className="dropdown m-1 border border-2 rounded-circle position-relative" style={{ padding: '12px', cursor: "pointer" }} onClick={() => { setDropMenuShow(!dropMenuShow) }}>
                        <FaUserAlt className='fs-2 text-light' />
                        {dropMenuShow &&
                            <ul className='dropMenu position-absolute'>
                                <li className='py-1 px-3' onClick={() => navigate('/')}>Log Out</li>
                                <li className='py-1 px-3' onClick={handleAccountDelete}>Delete Account</li>
                            </ul>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
