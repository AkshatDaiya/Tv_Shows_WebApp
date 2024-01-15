import React from 'react'

function Pagination({ totalPosts, postsPerPages, currentPage, setCurrentPage }) {
    let pages = []

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPages); i++) {
        pages.push(i)

    }

    return (
        <div className='pagination my-5'>
            {
                pages.map((page, index) => {
                    return <button key={index} onClick={() => { setCurrentPage(page) }} className={page === currentPage ? 'active' : ""}>{page}</button>
                })
            }
        </div>
    )
}

export default Pagination
