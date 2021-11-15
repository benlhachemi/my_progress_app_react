import React from 'react'
import './dashboard.css'
import Navbar from './navbar/navbar'
import Sidebar from './sidebar/sidebar'
import Content from './content/content'

const Dashboard = ({user}) => {
    return (
        <div className='Dashboard'>
            <div className='d-flex'>
                <Sidebar />
                <Content user={user}/>
            </div>
        </div>
    )
}

export default Dashboard
