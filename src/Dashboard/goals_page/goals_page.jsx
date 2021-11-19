import React ,{useState, useEffect} from 'react'
import './goals_page.css';
import Navbar from '../navbar/navbar';
import Goal from './goal/goal';
import Variables from '../../variables';
import Loading from '../../loading';
import { useCollectionData, useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { getFirestore, collection, getDocs, query, where, doc, setDoc ,updateDoc, writeBatch, deleteDoc, orderBy } from "firebase/firestore"


//global variables
const db = getFirestore();
const goalsRef = collection(db, "goals");

const Goals_page = ({user}) => {
    

    //hooks & variables
    const goalsQuery = query(goalsRef, where("uid", "==", user.uid));
    const [goals, goals_loading] = useCollectionData(goalsQuery);
    const [goal_data_date,setGoalDataDate] = useState(Variables.get_yesterday_date);
    
    //functions
    const get_data_by_date = async(e)=>{
        const date = e[5] + e[6] + "/" + e[8] + e[9] + "/" + e[0] + e[1] + e[2] + e[3];
        setGoalDataDate(date);
    }

    //main render
    return (
        <div className='Goals_page'>
            <Navbar photoURL={user.photoURL} name={user.displayName} title="my goals"/>
            {goals_loading ? <Loading /> : 
                <div className="container mt-3">
                    <h4 className="text-light mb-5" onChange={(e)=>{get_data_by_date(e.target.value)}}>Show Data for <input value={`${goal_data_date[6]}${goal_data_date[7]}${goal_data_date[8]}${goal_data_date[9]}-${goal_data_date[0]}${goal_data_date[1]}-${goal_data_date[3]}${goal_data_date[4]}`} type="date"/></h4>
                    {!goals_loading && goals.length > 0 ? goals.map((elt) => (
                        <div key={elt.goal_id}><br /><Goal goal={elt} goal_data_date={goal_data_date}/><br /><br /></div>
                    )) : <h4 className='text-warning pl-5 pr-5 py-3 text-center mt-5 pt-5'>You have no goals. Try adding new goals first on the "add" page :)</h4>}
                </div>
            }

        </div>
    )
}

export default Goals_page
