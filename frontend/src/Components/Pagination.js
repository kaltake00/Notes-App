import React from 'react'
import './Pagination.css'

function Pagination({ notesPerPage, totalNotes, paginate }) {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalNotes / notesPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <ul>
            {pageNumbers.map(number => (
                <li key={number} className='page-item'>
                    <a onClick={() => paginate(number)} href='!#' className='page-link'>
                        {number}
                    </a>
                </li>
            ))}
        </ul>
    )
}

export default Pagination