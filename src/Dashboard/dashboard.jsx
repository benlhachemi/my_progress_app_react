import React from 'react'
import './dashboard.css'
import Add_page from './add_page/add_page'
import Goals_page from './goals_page/goals_page'
import Navbar from './navbar/navbar'
import Analytics from './analytics_page/analytics'
import Sidebar from './sidebar/sidebar'
import Content from './content/content'
import Analytics_page from './analytics_page/analytics_page'
import Mobile_navbar from './mobile_navbar/mobile_navbar'
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";

const Dashboard = ({user}) => {
    return (
        <div className='Dashboard'>
            {window.innerWidth < 1024 && <Mobile_navbar />}
            <div className='d-flex'>
                {window.innerWidth > 1024 && <Sidebar />}
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Content user={user}/>} />
                        <Route path="/add" element={<Add_page user={user}/>} />
                        <Route path="/goals" element={<Goals_page user={user}/>} />
                        <Route path="/analytics" element={<Analytics_page user={user}/>} />
                        <Route path="/analytics/:goal_id" element={<Analytics user={user}/>} />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    )
}

export default Dashboard
