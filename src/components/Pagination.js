import React from 'react'

function Pagination({ totalPosts, postsPerPages, currentPage, setCurrentPage }) {
    let pages = []

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPages); i++) {
        pages.push(i)

    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className='pagination my-5'>
            {
                pages.map((page, index) => {
                    return <button key={index} onClick={() => { handlePageChange(page) }} className={page === currentPage ? 'active' : ""}>{page}</button>
                })
            }
        </div>
    )
}

export default Pagination;