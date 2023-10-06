import React from 'react'

const Banner = ({ popularMovie0 }) => {

    let title = popularMovie0.title
    let overview = popularMovie0.overview
    let backgroundImg = popularMovie0.poster_path

    const div_Style = {
        backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${backgroundImg})`
    }

    return (
        <div style={div_Style} className='banner'>
            <div className='banner_info' >
                <h1 className='title'>{title}</h1>
                <p className='overview'>{overview}</p>
            </div>
        </div>
    )
}

export default Banner