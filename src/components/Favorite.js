import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import MyContext from './MyContext';

function Favorite() {
    const [data, setData] = useState([])
    const { ContextData_FevId } = useContext(MyContext);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {

        const fetchData = async () => {
            try {
                const promises = ContextData_FevId.map(async (fevId) => {
                    const response = await axios.get(`https://api.tvmaze.com/lookup/shows?thetvdb=${fevId}`);
                    return response.data;
                });

                const responseData = await Promise.all(promises);

                setData(responseData.flat());
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData()

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);

    }, [ContextData_FevId])

    console.log(data);

    function removeHtmlTags(innerString) {
        let doc = new DOMParser().parseFromString(innerString, 'text/html')
        return doc.body.textContent || "";
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
                                </div>
                            </div>
                        </div>
                    ))

                )

                    : <h1>Loading...</h1>
                }
            </div>
        </div>
    )
}


export default Favorite;
