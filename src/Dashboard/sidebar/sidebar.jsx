import React from 'react'
import './sidebar.css'
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

const Sidebar = () => {
    return (
        <div className='Sidebar'>
            <img src="https://i.imgur.com/zFAbyWt.png" width="70%" alt="" className="logo mt-4 mb-5" />
            <br />
            <i className="fa fa-home mt-5 mb-4"></i>
            <br />
            <i className="fa fa-plus-square-o mt-5 mb-4"></i>
            <br />
            <i className="fa fa-line-chart mt-5 mb-4"></i>
            <br />
            <i className="fa fa-crosshairs mt-5 mb-5"></i>
            <br />
            <br />
            <br />
            <br />

            <i className="fa fa-reply-all mt-5 mb-4" onClick={()=>{signOut(auth)}}></i>
        </div>
    )
}

export default Sidebar
