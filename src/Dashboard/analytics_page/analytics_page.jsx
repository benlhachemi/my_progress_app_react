import React from 'react'
import './analytics_page.css';
import Navbar from '../navbar/navbar'
import Loading from '../../loading';
import { useCollectionData, useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { getFirestore, collection, getDocs, query, where, doc, setDoc ,updateDoc, writeBatch, deleteDoc, orderBy } from "firebase/firestore"

//global variables
const db = getFirestore();
const goalsRef = collection(db, "goals");


const Analytics_page = ({user}) => {

    //hooks & variables
    const goalsQuery = query(goalsRef, where("uid", "==", user.uid));
    const [goals, goals_loading] = useCollectionData(goalsQuery);

    //main render
    return (
        <div className='Analytics_page'>
            <Navbar photoURL={user.photoURL} name={user.displayName} title="Analytics"/>

            <div className="">
                {goals_loading ? <Loading /> : goals.length > 0 ? 
                    <div className='container mt-5 text-center text-light'>
                        <h4 className='mb-4'>Please click on the goal that you need analytics for</h4>
                        {goals.map((elt,i) =>(
                            <button onClick={()=>{window.location.href=`/analytics/${elt.goal_id}`}} className="btn btn-primary pl-5 pr-5 mb-4 text-center py-3 mr-2 ml-2" key={i}>Show analytics for the {elt.goal_name} goal</button>
                        ))}
                    </div>
                    : <h4 className='text-warning pl-5 pr-5 py-3 text-center mt-5 pt-5'>You have no goals. Try adding new goals first on the "add" page :)</h4>
                }
            </div>
        </div>
    )
}

export default Analytics_page
