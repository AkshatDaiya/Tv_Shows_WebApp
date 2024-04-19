import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import MyContext from './MyContext';
import { useNavigate } from 'react-router-dom';
import { IoTrashOutline } from "react-icons/io5";

function Favorite() {
    const [data, setData] = useState([]);
    const { ContextData_FevId } = useContext(MyContext);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        // Load data from localStorage when component mounts
        const storedData = localStorage.getItem('FavData');
        if (storedData) {
            setData(JSON.parse(storedData));
            setIsLoading(false); // Set loading to false as data is already loaded
        }

        // Fetch data only if necessary (e.g., when ContextData_FevId changes)
        const fetchData = async () => {
            if (ContextData_FevId.length > 0) {
                try {
                    const promises = ContextData_FevId.map(async (fevId) => {
                        const response = await axios.get(`https://api.tvmaze.com/lookup/shows?thetvdb=${fevId}`);
                        return response.data;
                    });

                    const responseData = await Promise.all(promises);
                    setData(responseData);

                    // Save the fetched data to localStorage
                    localStorage.setItem('FavData', JSON.stringify(responseData));
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                // If ContextData_FevId is empty, there's no need to fetch data.
                setIsLoading(false);
            }
        };

        fetchData();
    }, [ContextData_FevId]);

    function removeHtmlTags(innerString) {
        let doc = new DOMParser().parseFromString(innerString, 'text/html');
        return doc.body.textContent || "";
    }

    const handleFevDetails = (id) => {
        navigate('/shows_details', { state: { id: id } })
    };

    const handleDelete = (id) => {
        const result = data.filter((data) => data.id !== id);
        setData(result);

        localStorage.setItem('FavData', JSON.stringify(result));
    }


    return (
        <div id='backgroundC' className="d-flex justify-content-center">
            <div className="container row">
                <h1 className='text-center py-4 text-white'>Added to favorites</h1>
                {!isLoading ? (
                    data.map((data) => (
                        <div className="col-md-4 adjust" key={data.id}>
                            <div className="card" style={{ background: '#454545' }}>
                                <img src={data.image.original} className="card-img-top" alt="" />
                                <div className="card-body text-white">
                                    <h3 className="card-title">{data.name}</h3>
                                    <hr />
                                    <h6><b>Genres: </b>{data.genres.join(', ')}</h6>
                                    <h6><b>Language: </b>{data.language}</h6>
                                    <h6><b>IMDB Rating: </b>{data.rating.average}</h6>
                                    <h6><b>Release Date: </b>{data.premiered}</h6>
                                    <p className="card-text"><b>Summary: </b>{removeHtmlTags(data.summary.length > 50 ? data.summary.slice(0, 140) + "...." : data.summary)}</p>
                                    <button className="btn btn-outline-primary" onClick={() => { handleFevDetails(data.id) }}>More Details</button>
                                    <button onClick={() => handleDelete(data.id)}><IoTrashOutline /></button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <h1>Loading...</h1>
                )}
            </div>
        </div>
    );
}

export default Favorite;
