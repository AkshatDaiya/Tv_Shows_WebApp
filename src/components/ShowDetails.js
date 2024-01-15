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
        <div id="backcolor">
            <div className='container fullH'>
                <div className="row justify-content-center align-items-center h-100">

                    {data ? (
                        <>
                            <div className="col-md-8 h-75 d-flex align-items-center">
                                <img src={data.image.original} className='height' alt="" />
                                <div className='details'>
                                    <h1>{data.name}</h1>
                                    <h6>{removeHtmlTags(data.summary)}</h6>
                                </div>
                            </div>
                            <div className="col-md-4 h-75 d-flex align-items-center">
                                <div className='bgColor'>
                                    <h3>Show Details</h3>
                                    <p className='m-0'><b>Schedule: </b>{data.schedule.days} at {data.schedule.time}</p>
                                    <p className='m-0'><b>Language: </b>{data.language}</p>
                                    <p className='m-0'><b>Status: </b>{data.status}</p>
                                    <p className='m-0'><b>Show Type: </b>{data.type}</p>
                                    <p className='m-0'><b>Runtime: </b>{data.averageRuntime} min</p>
                                    <p className='m-0'><b>Genres: </b>{data.genres.join(' | ')}</p>
                                    <p className='m-0'><b>IMDB Rating: </b>{data.rating.average}</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <h1>Loading....</h1>
                    )}

                </div>
            </div>
        </div>
    )
}

export default ShowDetails
