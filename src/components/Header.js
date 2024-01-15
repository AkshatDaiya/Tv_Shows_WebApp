import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function Header(props) {
    const navigate=useNavigate()
    const [data, setData] = useState([])
    const [name, setName] = useState("")

    localStorage.setItem('name', name)

    const API_ENDPOINT = 'https://api.tvmaze.com/search/shows';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_ENDPOINT}?q=${name}`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData()


    }, [name])
    
    function handleSubmit(e) {
        e.preventDefault()
        props.onSubmit(data)
    }

    function handleLogout(){
        navigate('/')
    }
    
    function handleAccountDelete(){
        localStorage.removeItem('Email');
        navigate('/')
    }

    return (
        <>
            <div className='header mb-4 bgcolor'>
                <h1 className='text-center forMargin'>Watch All Web Series <br /> For free</h1>
                <div className="funcc d-flex justify-content-around">
                    <div className="d-flex justify-content-around forPosition">
                    <Link to='/fav'><button className="btn btn-success h-100">Favorites</button></Link>
                    
                        <form role='search' onSubmit={handleSubmit} className='d-flex w-0'>
                            <input className="form-control me-2" onChange={(e) => { setName(e.target.value) }} type="search" placeholder="Search" />
                            <button className="btn btn-success">Search</button>
                        </form>
                        

                        <button className='btn btn-danger mx-1' onClick={handleLogout}>LogOut</button>
                        <button className='btn btn-danger' onClick={handleAccountDelete}>Delete Account</button>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Header
