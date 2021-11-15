import React from 'react'
import './content.css'
import Navbar from '../navbar/navbar'

const Content = ({user}) => {
    return (
        <div className='Content'>
            <Navbar photoURL={user.photoURL} name={user.displayName}/>
        </div>
    )
}

export default Content
