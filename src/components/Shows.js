import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Pagination from './Pagination';
import Header from './Header';
import MyContext from './MyContext';
import { useNavigate } from 'react-router-dom';

function Shows() {
    const { searchedData, setSearchedData, setContextData_FevId } = useContext(MyContext);
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(21);
    const genres = ["Drama", "Science-Fiction", "Thriller", "Action", "Crime", "Horror", "Romance", "Adventure", "Espionage", "Music", "Mystery", "Supernatural", "Fantasy", "Family", "Anime", "Comedy", "History", "Medical", "Legal", "Western", "Children", "War", "Sports"];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.tvmaze.com/shows');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const removeHtmlTags = (inputString) => {
        const doc = new DOMParser().parseFromString(inputString, 'text/html');
        return doc.body.textContent || "";
    };

    const goToDetails = (e, id) => {
        navigate('/shows_details', { state: { id } });
    };

    const addToFavorites = (id) => {
        setContextData_FevId((prevIds) => {
            const uniqueIds = new Set([...prevIds, id]);
            return Array.from(uniqueIds);
        });
    };

    const handleGenreChange = (e) => {
        const selectedGenre = e.target.value;
        if (selectedGenre) {
            const filteredData = data.filter((show) => show.genres.includes(selectedGenre));
            setSearchedData(filteredData);
        }
    };

    const getCurrentPosts = () => {
        const lastPostIndex = currentPage * postPerPage;
        const firstPostIndex = lastPostIndex - postPerPage;
        return data.slice(firstPostIndex, lastPostIndex);
    };

    return (
        <div id='backgroundC'>
            <Header onSubmit={setSearchedData} />
            <div className="container mt-5 pt-4">
                <div className="row">
                    <div className="mini-nav my-2 mb-3 d-flex align-items-center justify-content-between">
                        <select
                            name="genre"
                            id="genre"
                            className="p-2"
                            style={{ outline: 'none' }}
                            onChange={handleGenreChange}
                        >
                            <option key="default" value="">Genres</option>
                            {genres.map((genre, i) => (
                                <option key={i} value={genre}>
                                    {genre}
                                </option>
                            ))}
                        </select>

                        <button className="all-movies-btn fs-5 px-3 py-1 border-0 rounded-3" onClick={() => setSearchedData([])}>
                            All Movies
                        </button>
                    </div>
                    {searchedData.length === 0 ? (
                        getCurrentPosts().map((show, i) => (
                            <div className="col-md-4 adjust" key={i}>
                                <div className="card" style={{ background: '#454545' }}>
                                    <img
                                        loading='lazy'
                                        src={show.image?.original || '../unsplash.jpg'}
                                        className="card-img-top"
                                        alt="MoviesImg"
                                    />
                                    <div className="card-body text-white">
                                        <h3 className="card-title">{show.name}</h3>
                                        <hr />
                                        <h6><b>Genres: </b>{show.genres.join(', ')}</h6>
                                        <h6><b>Language: </b>{show.language}</h6>
                                        <h6><b>IMDB Rating: </b>{show.rating.average}</h6>
                                        <h6><b>Release Date: </b>{show.premiered}</h6>
                                        <p className="card-text">
                                            <b>Summary: </b>
                                            {removeHtmlTags(
                                                show.summary.length > 50 ? show.summary.slice(0, 140) + "..." : show.summary
                                            )}
                                        </p>
                                        <button
                                            className="btn btn-outline-primary"
                                            onClick={(e) => goToDetails(e, show.id)}
                                        >
                                            More Details
                                        </button>
                                    </div>
                                    <button
                                        className='btn btn-outline-warning mt-5'
                                        onClick={() => addToFavorites(show.externals.thetvdb)}
                                    >
                                        Add To Favorite
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        searchedData.map((data, i) => (
                            <div className="col-md-4 adjust" key={i}>
                                <div className="card" style={{ background: '#454545' }}>
                                    <img
                                        loading='lazy'
                                        src={data.show?.image?.original || data.image?.original || '../unsplash.jpg'}
                                        className="card-img-top"
                                        alt="MoviesImg"
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
                                            ).length > 50 ? (
                                                removeHtmlTags(data.show?.summary || data.summary).slice(0, 140) + '...'
                                            ) : (
                                                removeHtmlTags(data.show?.summary || data.summary) || 'No summary available'
                                            )}
                                        </p>
                                        <button
                                            className="btn btn-outline-primary"
                                            onClick={(e) => goToDetails(e, data.show?.id || data.id)}
                                        >
                                            More Details
                                        </button>
                                    </div>
                                    <button
                                        className='btn btn-outline-warning mt-5'
                                        onClick={() => addToFavorites(data.show?.externals.thetvdb || data.externals.thetvdb)}
                                    >
                                        Add To Favorite
                                    </button>
                                </div>
                            </div>
                        ))
                    )}

                    {/* <Pagination
                        totalPosts={data.length}
                        postsPerPage={postPerPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    /> */}

                    <button onClick={() => setPostPerPage(postPerPage + 21)}>Show More...</button>
                </div>
            </div>
        </div>
    );
}

export default Shows;
