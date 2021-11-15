import React, {useState} from 'react'
import './content.css'
import Navbar from '../navbar/navbar'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getFirestore, collection, getDocs, query, where, doc, setDoc } from "firebase/firestore"
import General_widget from './widgets/general_widget/general_widget';

//global variables
const db = getFirestore();


const Content = ({user}) => {

    

    return (
        <div className='Content'>
            <Navbar photoURL={user.photoURL} name={user.displayName}/>
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <div className="widget animated_bg">
                            <General_widget date='Monday 10 June' meteo_degree='25°C' tasks='4' week='50%' month='70%' icons={['fa-home','fa-arrow-down']}/>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="widget">

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Content
