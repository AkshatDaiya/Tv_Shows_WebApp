import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function ShowDetails() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const location = useLocation();
    const id = location.state?.id;

    useEffect(() => {
        if (!id) {
            setError('No show ID provided.');
            return;
        }

        const fetchShowDetails = async () => {
            try {
                const response = await axios.get(`https://api.tvmaze.com/shows/${id}`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching show details:', error);
                setError('Failed to fetch show details.');
            }
        };

        fetchShowDetails();
    }, [id]);

    const removeHtmlTags = (innerString) => {
        const doc = new DOMParser().parseFromString(innerString, 'text/html');
        return doc.body.textContent || "";
    };

    if (error) {
        return <div className="container"><h1>{error}</h1></div>;
    }

    return (
        <div className='position-relative'>
            {data && data.image?.original ? (
                <img src={data.image.original} alt="Background" className='position-absolute top-0 left-0 w-100 vh-100 object-fit-cover' style={{ zIndex: "-1" }} />
            ) : (
                <div className='position-absolute top-0 left-0 w-100 vh-100 bg-placeholder' style={{ zIndex: "-1" }}></div>
            )}
            <div className='container fullH'>
                <div className="d-flex justify-content-center align-items-center h-100">
                    {data ? (
                        <div className="ps-0 h-100 d-flex align-items-center">
                            <img src={data.image?.original || '../unsplash.jpg'} className='h-100' alt="Show Img" />
                            <div className='details h-100 p-5 overflow-scroll' style={{ background: "rgb(240 248 255 / 84%)" }}>
                                <h1 className="text-center">{data.name}</h1>
                                <h4 className="fs-5">{removeHtmlTags(data.summary)}</h4>
                                <hr />
                                <div className='d-flex justify-content-between'>
                                    <div className='d-flex flex-column justify-content-between'>
                                        <span className='m-0 fs-5'><b className='fs-4'>Schedule: </b>{data.schedule.days.join(", ")} at {data.schedule.time}</span>
                                        <span className='m-0 fs-5'><b className='fs-4'>Language: </b>{data.language}</span>
                                        <span className='m-0 fs-5'><b className='fs-4'>Premiered: </b>{data.premiered}</span>
                                        <span className='m-0 fs-5'><b className='fs-4'>Status: </b>{data.status}</span>
                                    </div>
                                    <div className='d-flex flex-column justify-content-between'>
                                        <span className='m-0 fs-5'><b className='fs-4'>Show Type: </b>{data.type}</span>
                                        <span className='m-0 fs-5'><b className='fs-4'>Runtime: </b>{data.averageRuntime} min</span>
                                        <span className='m-0 fs-5'><b className='fs-4'>Genres: </b>{data.genres.join(' | ')}</span>
                                        <span className='m-0 fs-5'><b className='fs-4'>IMDB Rating: </b>{data.rating.average}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='Loading_Bg'>
                            <h1 className='text-light'>Loading....</h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ShowDetails;
