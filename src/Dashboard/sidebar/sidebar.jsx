import React from 'react'
import './sidebar.css'
import { getAuth, signOut } from "firebase/auth";
import { useLocation, Router } from 'react-router-dom'

const auth = getAuth();

const Sidebar = () => {

    const path = window.location.pathname;


    return (
        <div className='Sidebar'>
            
            <img src="https://i.imgur.com/zFAbyWt.png" width="70%" alt="" className="logo mt-4 mb-5" />
            <br />
            <a href="/">{path === '/' ? <i className="fa active fa-home mt-5 mb-4"></i> : <i className="fa fa-home mt-5 mb-4"></i>}</a>
            <br />
            <a href="/add">{path.includes('/add') ? <i className="fa active fa-plus-square-o mt-5 mb-4"></i> : <i className="fa fa-plus-square-o mt-5 mb-4"></i>}</a>
            <br />
            <a href="/goals">{path.includes('/goals') ? <i className="fa active fa-crosshairs mt-5 mb-4"></i> : <i className="fa fa-crosshairs mt-5 mb-4"></i>}</a>
            <br />
            <a href="/analytics">{path.includes('/analytics') ? <i className="fa active fa-line-chart mt-5 mb-4"></i> : <i className="fa fa-line-chart mt-5 mb-4"></i>}</a>
            <br />
            <br />
            <br />
            <br />

            <i className="fa fa-reply-all mt-5 mb-4" onClick={()=>{signOut(auth)}}></i>
        </div>
    )
}

export default Sidebar
