import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Pagination from './Pagination'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import MyContext from './MyContext'

function Shows() {

    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage] = useState(21)
    const [searchedData, setSearchedData] = useState([])

    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage
    const currentPosts = data.slice(firstPostIndex, lastPostIndex)
    console.log(currentPosts);

    const { setContextData_FevId } = useContext(MyContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.tvmaze.com/shows');
                setData(response.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData()

    }, [])



    function removeHtmlTags(inputString) {
        let doc = new DOMParser().parseFromString(inputString, 'text/html');
        return doc.body.textContent || "";
    }

    function goTODetails(e, id) {
        navigate('/shows_details', { state: { id: id } })
    }

    function getData(data) {
        setSearchedData(data)
    }

    function goToFavorite(id) {
        setContextData_FevId((prevIds) => {
            // Use a Set to ensure unique values
            const uniqueIds = new Set([...prevIds, id]);

            // Convert the Set back to an array
            return Array.from(uniqueIds);
        });
    }

    return (
        <div id='backgroundC'>
            <div>

                <Header onSubmit={getData} searchedData={searchedData} />

            </div>
            <div className="container mt-5 pt-4">
                <div className="row">
                    {searchedData.length === 0 ? (
                        currentPosts.map((data, i) => (
                            <div className="col-md-4 adjust" key={i}>
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
                                        <button className="btn btn-outline-primary" onClick={(e) => { goTODetails(e, data.id) }}>More Details</button>
                                    </div>
                                    <button onClick={() => { goToFavorite(data.externals.thetvdb) }} className='btn btn-outline-warning mt-5'>Add To Favorite</button>
                                </div>
                            </div>
                        )))
                        :
                        (searchedData.map((data, i) => (
                            <div className="col-md-4 adjust" key={i}>
                                <div className="card" style={{ background: '#454545' }}>
                                    {!data.show.image ? (<></>) :
                                        <img src={data.show.image.original} className="card-img-top" alt="" />
                                    }
                                    <div className="card-body text-white">
                                        <h3 className="card-title">{data.show.name}</h3>
                                        <hr />
                                        <h6><b>Language: </b>{data.show.language}</h6>
                                        <h6><b>Release Date: </b>{data.show.premiered}</h6>
                                        <p className="card-text"><b>Summary: </b>{removeHtmlTags(data.show.summary)}</p>
                                        <button className="btn btn-primary" onClick={(e) => { goTODetails(e, data.show.id) }}>More Details</button>
                                    </div>
                                </div>
                            </div>
                        )))
                    }
                </div>
                <Pagination totalPosts={data.length} postsPerPages={postPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
            </div>
        </div>
    )
}

export default Shows
