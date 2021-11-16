import React, {useState, useEffect} from 'react'
import './content.css'
import Navbar from '../navbar/navbar'
import { useCollectionData, useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { getFirestore, collection, getDocs, query, where, doc, setDoc ,updateDoc, writeBatch } from "firebase/firestore"
import General_widget from './widgets/general_widget/general_widget';
import Variables from '../../variables';
import Todo from './widgets/to_do_widget/to_do';

//global variables
const db = getFirestore();
const todosRef = collection(db, "todos");



const Content = ({user}) => {
    //Hooks & local variables
    const todosQuery = query(todosRef, where("uid", "==", user.uid));
    const [todayMeteo,setTodayMeteo] = useState();
    const [todayMeteoIcon,setTodayMeteoIcon] = useState();
    const [todos, todos_loading] = useCollectionData(todosQuery);
    const [active_todos, setActiveTodos] = useState();

    useEffect(() => {
        if(!todos_loading){
            var counter = 0;
            todos.forEach((elt)=>{
                if(!elt.done)counter++;
            });
            setActiveTodos(counter);
        }
    }, [todos])

    //functions
    Variables.today_meteo_degree.then((result)=>{
        setTodayMeteo(result);
    })
    Variables.today_meteo_icon.then((result)=>{
        setTodayMeteoIcon(result);
    })
    const update_todos = async(id)=>{
        const tempQuery = query(todosRef, where("todo_id", "==", id));
        const querySnapshot = await getDocs(tempQuery);
        var temp_doc_id = '';
        querySnapshot.forEach((elt)=>{temp_doc_id = elt.id})
        const batch = writeBatch(db);
        const temp_todo = todos.filter((elt)=>(elt.todo_id == id));
        batch.update(doc(db, "todos",temp_doc_id), {done: !temp_todo[0].done});
        await batch.commit();
    }


    return (
        <div className='Content'>
            <Navbar photoURL={user.photoURL} name={user.displayName} title="Home"/>
            <div className="container-fluid py-3 pl-5 pr-5">
                <div className="row">
                    <div className="col-6 animate__animated animate__backInLeft">
                        <div className="widget animated_bg">
                            {todos_loading ? <General_widget date={Variables.general_widget_date} meteo_degree={`${todayMeteo}°C`} meteo_icon={todayMeteoIcon} tasks=' - ' week={Variables.week_progress} month={Variables.month_progress}/> : <General_widget date={Variables.general_widget_date} meteo_degree={`${todayMeteo}°C`} meteo_icon={todayMeteoIcon} tasks={active_todos} week={Variables.week_progress} month={Variables.month_progress}/>}
                        </div>
                    </div>
                    <div className="col-6 animate__animated animate__backInRight">
                        <div className="widget">

                        </div>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-4 animate__animated animate__backInLeft animate__delay-1s">
                        <div className="widget">
                        {todos_loading ? <h1>Loading</h1> : <Todo tasks={todos} update_todos={update_todos}/>}
                        </div>
                    </div>
                    <div className="col-4 animate__animated animate__backInUp animate__delay-1s">
                        <div className="widget"></div>
                    </div>
                    <div className="col-4 animate__animated animate__backInRight animate__delay-1s">
                        <div className="widget"></div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Content
