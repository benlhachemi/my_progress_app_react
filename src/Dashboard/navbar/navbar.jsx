import React from 'react'
import './navbar.css'

const Navbar = ({photoURL,title,name}) => {
    return (
        <div className='Navbar'>
            <div className="row pt-4">
                <div className="col-2"><h6 className="text-center text-light">{name}</h6></div>
                <h1 className="col-8 text-center text-light">{title}</h1>
                <div className="col-2 text-center d-flex">
                    <i className="fa fa-bell"></i>
                    <img className='avatar' src={photoURL}></img>
                </div>
            </div>
        </div>
    )
}

export default Navbar
