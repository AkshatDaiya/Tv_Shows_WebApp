import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function ShowDetails() {
    const [data, setData] = useState(null)
    const location = useLocation()
    const id = location.state
    const NumericValue = Number(id.id);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.tvmaze.com/shows/${NumericValue}`);
                setData(response.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData()

    }, [NumericValue])
    console.log(data);

    function removeHtmlTags(innerString) {
        let doc = new DOMParser().parseFromString(innerString, 'text/html')
        return doc.body.textContent || "";
    }


    return (
        <div className='position-relative'>
            <img src={data && data.image && data.image.original !== null ? data.image.original : '../unsplash.jpg'} alt="Background" className='position-absolute top-0 left-0 w-100 vh-100 object-fit-cover' style={{ zIndex: "-1" }} />
            <div className='container fullH'>
                <div className="d-flex justify-content-center align-items-center h-100">

                    {data ? (
                        <>
                            <div className="ps-0 h-100 d-flex align-items-center">
                                <img src={data && data.image && data.image.original !== null ? data.image.original : '../unsplash.jpg'} className='h-100' alt="" />
                                <div className='details h-100 p-5 overflow-scroll' style={{ background: "rgb(240 248 255 / 84%)" }}>
                                    <h1 className="text-center">{data.name}</h1>
                                    <h4 className="fs-5">{removeHtmlTags(data.summary)}</h4>

                                    <hr />

                                    <div className='d-flex justify-content-between'>
                                        <div className='d-flex flex-column justify-content-between'>
                                            <span className='m-0 fs-5'><b className='fs-4'>Schedule: </b>{data.schedule.days} at {data.schedule.time}</span>
                                            <span className='m-0 fs-5'><b className='fs-4'>Language: </b>{data.language}</span>
                                            <span className='m-0 fs-5'><b className='fs-4'>premiered: </b>{data.premiered}</span>
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
                        </>
                    ) : (
                        <h1 className='text-light'>Loading....</h1>
                    )}

                </div>
            </div>
        </div>
    )
}

export default ShowDetails
