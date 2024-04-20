import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Pagination from './Pagination'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import MyContext from './MyContext'

function Shows() {
    const { searchedData, setSearchedData } = useContext(MyContext);
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const formData = JSON.parse(localStorage.getItem('searchedData'))
    const [postPerPage] = useState(21)
    const genres = ["Drama", "Science-Fiction", "Thriller", "Action", "Crime", "Horror", "Romance", "Adventure", "Espionage", "Music", "Mystery", "Supernatural", "Fantasy", "Family", "Anime", "Comedy", "History", "Medical", "Legal", "Western", "Children", "War", "Sports"
    ]

    console.log('formData', formData);

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

    const genreData = (value) => {
        const filterData = data.filter((data) => data.genres.includes(value))
        setSearchedData(filterData)
    }

    return (
        <div id='backgroundC'>
            <div>

                <Header onSubmit={getData} searchedData={searchedData} setSearchedData={setSearchedData} />

            </div>
            <div className="container mt-5 pt-4">
                <div className="row">

                    <div className="mini-nav border border-1 my-2 mb-3">
                        <select
                            name="genre"
                            id="genre"
                            className="p-2"
                            style={{ outline: 'none' }}
                            onChange={(e) => genreData(e.target.value)}
                        >
                            {/* Default option */}
                            <option key="default" value="">
                                Genres
                            </option>

                            {/* Dynamic options from genres array */}
                            {genres.map((genre, i) => (
                                <option key={i} value={genre}>
                                    {genre}
                                </option>
                            ))}
                        </select>
                    </div>


                    {searchedData.length === 0 ? (
                        currentPosts.map((data, i) => (
                            <div className="col-md-4 adjust" key={i}>
                                <div className="card" style={{ background: '#454545' }}>
                                    <img
                                        loading='lazy'
                                        src={data.image?.original || '../unsplash.jpg'}
                                        className="card-img-top"
                                        alt="image"
                                    />
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
                                    <img
                                        loading='lazy'
                                        src={data.show?.image?.original || data.image?.original || '../unsplash.jpg'}
                                        className="card-img-top"
                                        alt="image"
                                    />
                                    <div className="card-body text-white">
                                        <h3 className="card-title">{data.show?.name || data.name}</h3>
                                        <hr />
                                        <h6><b>Language: </b>{data.show?.language || data.language}</h6>
                                        <h6><b>Release Date: </b>{data.show?.premiered || data.premiered}</h6>
                                        <p className="card-text">
                                            <b>Summary: </b>
                                            {removeHtmlTags(
                                                data.show?.summary || data.summary
                                            )?.length > 50
                                                ? removeHtmlTags(data.show?.summary || data.summary).slice(0, 140) + '...'
                                                : removeHtmlTags(data.show?.summary || data.summary) || 'No summary available'}
                                        </p>
                                        <button
                                            className="btn btn-primary"
                                            onClick={(e) => goTODetails(e, data.show?.id || data.id)}
                                        >
                                            More Details
                                        </button>
                                    </div>
                                    <button onClick={() => { goToFavorite(data.show?.externals.thetvdb || data.externals.thetvdb) }} className='btn btn-outline-warning mt-5'>Add To Favorite</button>
                                </div>
                            </div>
                        )))
                    }
                </div>

                <Pagination
                    totalPosts={data.length}
                    postsPerPages={postPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />

            </div>
        </div >
    )
}

export default Shows
