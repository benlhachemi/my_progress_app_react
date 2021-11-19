import React from 'react'
import './navbar.css'

const Navbar = ({photoURL,title,name}) => {

    

    return (
        <div className='Navbar'>
            <div className="row pt-4">
                <div className="col-lg-2 col-sm-12 col-12 mb-3"><h6 className="text-center text-light">{name}</h6></div>
                <h1 className="col-lg-8 col-sm-8 col-8 text-center text-light">{title}</h1>
                <div className="col-lg-2 col-sm-2 col-2 text-center d-flex">
                    <img className='avatar mr-3' src={photoURL}></img>
                </div>
            </div>
        </div>
    )
}

export default Navbar
