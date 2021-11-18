import React from 'react'
import './dashboard.css'
import Add_page from './add_page/add_page'
import Goals_page from './goals_page/goals_page'
import Navbar from './navbar/navbar'
import Analytics from './analytics_page/analytics'
import Sidebar from './sidebar/sidebar'
import Content from './content/content'
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";

const Dashboard = ({user}) => {
    return (
        <div className='Dashboard'>
            <div className='d-flex'>
                <Sidebar />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Content user={user}/>} />
                        <Route path="/add" element={<Add_page user={user}/>} />
                        <Route path="/goals" element={<Goals_page user={user}/>} />
                        <Route path="/analytics/:goal_id" element={<Analytics user={user}/>} />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    )
}

export default Dashboard
