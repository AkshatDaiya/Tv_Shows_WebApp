import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserAlt, FaBookmark } from "react-icons/fa";

function Header({ onSubmit }) {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchQuery}`);
            const searchData = response.data;
            onSubmit(searchData);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }

    }, [searchQuery, onSubmit]);

    const handleAccountDelete = useCallback(() => {
        localStorage.removeItem('formData');
        navigate('/');
    }, [navigate]);

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    return (
        <div className='header mb-4 bgcolor'>
            <div className="header-content d-flex justify-content-around position-absolute w-100 p-1">
                <div className="header-controls d-flex align-items-center justify-content-around forPosition border-bottom border-secondary">
                    <Link to='/fav'>
                        <button className="h-100 border-0 bg-transparent text-light fs-3">
                            <FaBookmark aria-label="Favorites" />
                        </button>
                    </Link>

                    <form onSubmit={handleSubmit} className='search-form d-flex w-0'>
                        <input
                            type="text"
                            className="form-control me-2"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search"
                            aria-label="Search"
                        />
                    </form>

                    <div
                        className="dropdown m-1 border border-2 rounded-circle position-relative"
                        style={{ padding: '12px', cursor: "pointer" }}
                        onClick={toggleDropdown}
                        aria-label="User menu"
                    >
                        <FaUserAlt className='fs-2 text-light' />
                        {isDropdownVisible && (
                            <ul className='dropMenu rounded-3 position-absolute text-light z-3'>
                                <li className='py-1 px-3' onClick={() => navigate('/')}>Log Out</li>
                                <li className='py-1 px-3' onClick={handleAccountDelete}>Delete Account</li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
