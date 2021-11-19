import React from 'react'
import './mobile_navbar.css';
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

const Mobile_navbar = () => {
    return (
        <div className='Mobile_navbar'>
            <div className="navbar navbar-inverse navbar-fixed-top bg-warning py-3">
                <div className="container">
                    <div className="navbar-header">
                        <i className="navbar-toggle fa fa-bars" data-toggle="collapse" data-target="#navHeaderCollapse"></i>
                    </div>

                    <div className="collapse navbar-collapse" id="navHeaderCollapse">
                        <ul className="nav navbar-nav navbar-right">
                            <li className='text-center mb-1 py-2'><a className='text-center text-light font-weight-bold' href="/">Home <i className="fa fa-home"></i></a></li>
                            <li className='text-center mb-1 py-2'><a className='text-center text-light font-weight-bold' href="/add">Add <i className="fa fa-plus-square-o"></i></a></li>
                            <li className='text-center mb-1 py-2'><a className='text-center text-light font-weight-bold' href="/goals">Goals <i className="fa fa-crosshairs"></i></a></li>
                            <li className='text-center mb-1 py-2'><a className='text-center text-light font-weight-bold' href="/analytics">Analytics <i className="fa fa-line-chart"></i></a></li>
                            <li className='text-center mb-1 py-2'><a onClick={()=>{signOut(auth)}} className='text-center text-danger font-weight-bold'>Log out </a><i className="fa fa-reply-all text-danger"></i></li>
                        </ul>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Mobile_navbar
