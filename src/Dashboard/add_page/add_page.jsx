import React ,{useEffect, useState} from 'react'
import './add_page.css';
import Navbar from '../navbar/navbar';
import { useCollectionData, useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { getFirestore, collection, getDocs, query, where, doc, setDoc ,updateDoc, writeBatch, deleteDoc } from "firebase/firestore"
import Variables from '../../variables';
import {Button,TextField ,Dialog ,DialogActions ,DialogContent ,DialogContentText ,DialogTitle,MuiAlert ,Snackbar ,Stack, Alert  } from '@mui/material';

//global variables
const db = getFirestore();
const todosRef = collection(db, "todos");


const Add_page = ({user}) => {
    //mui variables & functions
    const [openAddTask, setOpenAddTask] = useState(false);
    const clickOpenAddTask = () => {setOpenAddTask(true);};
    const clickCloseAddTask = () => {setOpenAddTask(false);};
    const [openDeleteTask, setOpenDeleteTask] = useState(false);
    const clickOpenDeleteTask = () => {setOpenDeleteTask(true);};
    const clickCloseDeleteTask = () => {setOpenDeleteTask(false);};
    const [new_task,setNewTask] = useState('');
    const [openAddTaskAlert, setOpenAddTaskAlert] = useState(false);
    const handleClickOpenAddTaskAlert = () => {setOpenAddTaskAlert(true);};
    const handleCloseOpenAddTaskAlert = (event, reason) => {if (reason === 'clickaway') {return;}setOpenAddTaskAlert(false);};


    //Hooks & local variables
    const todosQuery = query(todosRef, where("uid", "==", user.uid));
    const [todos, todos_loading] = useCollectionData(todosQuery);
    

    //functions
    const add_new_task = async()=>{
        setDoc(doc(todosRef),{
            uid : user.uid,
            todo_id : Variables.generate_id,
            todo : new_task,
            done : false,
            color : 'text-light'
        });
        setOpenAddTask(false);
        handleClickOpenAddTaskAlert();
    }

    const delete_task = async(id)=>{
        const query_to_delete = query(todosRef, where("todo_id", "==", id));
        const querySnapshot = await getDocs(query_to_delete);
        var temp_doc_id = '';
        querySnapshot.forEach((elt)=>{temp_doc_id = elt.id});
        await deleteDoc(doc(db,"todos",temp_doc_id));
    }




    return (
        <div className='Add_page'>
            <Navbar photoURL={user.photoURL} name={user.displayName} title="Add"/>
            <div className="row mt-5 crud">



                {/* TASK CRUD */}
                <div className="col-4 text-center text-light" style={{borderRight : "2px solid rgba(255,255,255,0.2)"}}>
                    <i className="fa fa-file-text-o mb-5" style={{fontSize : "70px"}}></i><br />
                    {/* ADD TASK */}
                    <button onClick={clickOpenAddTask} className="btn btn-primary mt-5 mb-4"><i className="fa fa-plus mr-3"></i> Add Task</button><br />
                    <Dialog open={openAddTask} onClose={clickCloseAddTask}>
                        <DialogTitle>Add new Task</DialogTitle>
                        <DialogContent>
                            <DialogContentText>Please enter your Task details to add the task to your list : </DialogContentText>
                            <TextField onChange={(e)=>{setNewTask(e.target.value)}} autoFocus margin="dense" id="name" label="Task Details" type="text" fullWidth variant="standard"/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={clickCloseAddTask}>Cancel</Button>
                            <Button onClick={add_new_task}>Add</Button>
                        </DialogActions>
                    </Dialog>
                    <Stack spacing={2} sx={{ width: '100%' }}>
                        <Snackbar open={openAddTaskAlert} autoHideDuration={6000} onClose={handleCloseOpenAddTaskAlert}>
                            <Alert onClose={handleClickOpenAddTaskAlert} severity="success" sx={{ width: '100%' }}>New task added succesfuly! 👍</Alert>
                        </Snackbar>
                    </Stack>
                    {/* REMOVE TASK */}
                    <button onClick={clickOpenDeleteTask} className="btn btn-primary mt-5 mb-4"><i className="fa fa-remove mr-3"></i>Remove Task</button><br />
                    <Dialog open={openDeleteTask} onClose={clickCloseDeleteTask}>
                        <DialogTitle>Delete Task</DialogTitle>
                        <DialogContent>
                            <DialogContentText>Please choose from the list below the task that you want to delete then click "Delete"</DialogContentText><br />
                            <div class="list-group">
                                {!todos_loading && todos.map((elt)=>(
                                    <div key={todos.todo_id} className='d-flex'><a className="list-group-item list-group-item-action active bg-secondary rounded mb-2">{elt.todo} </a><button onClick={()=>{delete_task(elt.todo_id)}} className="btn btn-danger ml-2 mb-2 rounded"><i className="fa fa-remove"></i></button></div>
                                ))}
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={clickCloseDeleteTask}>Cancel</Button>
                        </DialogActions>
                    </Dialog>
                    
                    
                    <br />
                </div>




                {/* CALENDAR CRUD */}
                <div className="col-4 text-center text-light">
                    <i className="fa fa-calendar mb-5" style={{fontSize : "70px"}}></i><br />
                    <button className="btn btn-primary mt-5 mb-4"><i className="fa fa-plus mr-3"></i> Add Calendar</button><br />
                    <button className="btn btn-primary mt-5 mb-4"><i className="fa fa-remove mr-3"></i>Remove Calendar</button><br /><br />
                </div>




                {/* GOAL CRUD */}
                <div className="col-4 text-center text-light" style={{borderLeft : "2px solid rgba(255,255,255,0.2)"}}>
                    <i className="fa fa-bullseye mb-5" style={{fontSize : "70px"}}></i><br />
                    <button className="btn btn-primary mt-5 mb-4"><i className="fa fa-plus mr-3"></i> Add Goal</button><br />
                    <button className="btn btn-primary mt-5 mb-4"><i className="fa fa-remove mr-3"></i>Remove Goal</button><br /><br />
                </div>
            </div>
        </div>
    )
}

export default Add_page
