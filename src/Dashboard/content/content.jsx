import React, {useState, useEffect} from 'react'
import './content.css'
import Navbar from '../navbar/navbar'
import { useCollectionData, useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { getFirestore, collection, getDocs, query, where, doc, setDoc ,updateDoc, writeBatch, deleteDoc, orderBy } from "firebase/firestore"
import General_widget from './widgets/general_widget/general_widget';
import Variables from '../../variables';
import Todo from './widgets/to_do_widget/to_do';
import Calendar_widget from './widgets/calendar_widget/calendar_widget';

//global variables
const db = getFirestore();
const todosRef = collection(db, "todos");
const calendarsRef = collection(db, "calendars");



const Content = ({user}) => {

    //Hooks & local variables
    const todosQuery = query(todosRef, where("uid", "==", user.uid));
    const calendarsQuery = query(calendarsRef,where("uid", "==", user.uid));
    const [todayMeteo,setTodayMeteo] = useState();
    const [todayMeteoIcon,setTodayMeteoIcon] = useState();
    const [todos, todos_loading] = useCollectionData(todosQuery);
    const [calendars, calendars_loading] = useCollectionData(calendarsQuery);
    const [active_todos, setActiveTodos] = useState();



    useEffect(() => {
        if(!todos_loading){
            var counter = 0;
            todos.forEach((elt)=>{
                if(!elt.done)counter++;
            });
            setActiveTodos(counter);


            todos.forEach(async(elt)=>{
                if(elt.date_created !== Variables.get_today_date){
                    var query_to_delete = query(todosRef, where("done", "==", true));
                    //query_to_delete = query(query_to_delete, where("date_created", "!=", Variables.get_today_date));
                    const querySnapshot = await getDocs(query_to_delete);
                    var temp_doc_id = '';
                    var isDelete = false;
                    querySnapshot.forEach((elt2)=>{
                        if(elt2.data().date_created != Variables.get_today_date)temp_doc_id = elt2.id;isDelete = true;
                    });
                    if(isDelete){
                        await deleteDoc(doc(db,"todos",temp_doc_id));
                    }
                }
            });
        }
        
    }, [todos])

    useEffect(()=>{
        if(!calendars_loading){
            calendars.forEach(async(elt)=>{
                console.log(new Date(elt.calendar_end_time).getTime() - new Date(Variables.get_today_date).getTime());
                if(new Date(elt.calendar_end_time).getTime() - new Date(Variables.get_today_date).getTime() < 0){
                    var query_to_delete = query(calendarsRef, where("calendar_id", "==", elt.calendar_id));
                    //query_to_delete = query(query_to_delete, where("date_created", "!=", Variables.get_today_date));
                    const querySnapshot = await getDocs(query_to_delete);
                    var temp_doc_id = '';
                    querySnapshot.forEach((elt2)=>{
                        temp_doc_id = elt2.id
                    });
                    await deleteDoc(doc(db,"calendars",temp_doc_id));
                }
            });
        }
    }, [calendars])

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
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-sm-12 col-lg-6 col-md-6 animate__animated animate__bounceInLeft">
                        <div className="widget animated_bg">
                            {todos_loading ? <General_widget date={Variables.general_widget_date} meteo_degree={`${todayMeteo}°C`} meteo_icon={todayMeteoIcon} tasks=' - ' week={Variables.week_progress} month={Variables.month_progress}/> : <General_widget date={Variables.general_widget_date} meteo_degree={`${todayMeteo}°C`} meteo_icon={todayMeteoIcon} tasks={active_todos} week={Variables.week_progress} month={Variables.month_progress}/>}
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-lg-6 col-md-6 animate__animated animate__bounceInRight">
                        <div className="widget">

                        </div>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col-lg-4 col-md-4 col-sm-12 col-12 mb-4 animate__animated animate__backInLeft animate__delay-1s">
                        <div className="widget animated_bg_3">
                        {todos_loading ? <h1>Loading</h1> : <Todo tasks={todos} update_todos={update_todos}/>}
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-12 col-12 mb-4 animate__animated animate__backInUp animate__delay-1s">
                        <div className="widget animated_bg_2">
                            {!calendars_loading && <Calendar_widget calendars={calendars}/>}
                        </div>
                    </div>
                    
                </div>
            </div>

        </div>
    )
}

export default Content
