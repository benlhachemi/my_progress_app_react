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
const calendarsRef = collection(db, "calendars");
const goalsRef = collection(db, "goals");


const Add_page = ({user}) => {
    //mui variables & functions
    const [openAddTask, setOpenAddTask] = useState(false);
    const clickOpenAddTask = () => {setOpenAddTask(true);};
    const clickCloseAddTask = () => {setOpenAddTask(false);};

    const [openAddCalendar, setOpenAddCalendar] = useState(false);
    const clickOpenAddCalendar = () => {setOpenAddCalendar(true);};
    const clickCloseAddCalendar = () => {setOpenAddCalendar(false);};

    const [openAddGoal, setOpenAddGoal] = useState(false);
    const clickOpenAddGoal = () => {setOpenAddGoal(true);};
    const clickCloseAddGoal = () => {setOpenAddGoal(false);};

    const [calendarEndTime,setCalendarEndTime] = useState('');
    const [calendarDescription,setCalendarDescription] = useState('');
    const [calendarImportance,setCalendarImportance] = useState('');

    const [openDeleteTask, setOpenDeleteTask] = useState(false);
    const clickOpenDeleteTask = () => {setOpenDeleteTask(true);};
    const clickCloseDeleteTask = () => {setOpenDeleteTask(false);};

    const [openDeleteCalendar, setOpenDeleteCalendar] = useState(false);
    const clickOpenDeleteCalendar = () => {setOpenDeleteCalendar(true);};
    const clickCloseDeleteCalendar = () => {setOpenDeleteCalendar(false);};

    const [openDeleteGoal, setOpenDeleteGoal] = useState(false);
    const clickOpenDeleteGoal = () => {setOpenDeleteGoal(true);};
    const clickCloseDeleteGoal = () => {setOpenDeleteGoal(false);};

    const [new_task,setNewTask] = useState('');

    const [openAddTaskAlert, setOpenAddTaskAlert] = useState(false);
    const handleClickOpenAddTaskAlert = () => {setOpenAddTaskAlert(true);};
    const handleCloseOpenAddTaskAlert = (event, reason) => {if (reason === 'clickaway') {return;}setOpenAddTaskAlert(false);};

    const [openAddCalendarAlert, setOpenAddCalendarAlert] = useState(false);
    const handleClickOpenAddCalendarAlert = () => {setOpenAddCalendarAlert(true);};
    const handleCloseOpenAddCalendarAlert = (event, reason) => {if (reason === 'clickaway') {return;}setOpenAddCalendarAlert(false);};

    const [openAddGoalAlert, setOpenAddGoalAlert] = useState(false);
    const handleClickOpenAddGoalAlert = () => {setOpenAddGoalAlert(true);};
    const handleCloseOpenAddGoalAlert = (event, reason) => {if (reason === 'clickaway') {return;}setOpenAddGoalAlert(false);};

    const [goal_name,setGoalName] = useState('');
    const [variable_1_name,setVariable1Name] = useState('');
    const [variable_2_name,setVariable2Name] = useState('');
    const [variable_3_name,setVariable3Name] = useState('');
    const [variable_4_name,setVariable4Name] = useState('');
    const [variable_1_prefix,setVariable1Prefix] = useState('');
    const [variable_2_prefix,setVariable2Prefix] = useState('');
    const [variable_3_prefix,setVariable3Prefix] = useState('');
    const [variable_4_prefix,setVariable4Prefix] = useState('');


    //Hooks & local variables
    const todosQuery = query(todosRef, where("uid", "==", user.uid));
    const calendarsQuery = query(calendarsRef, where("uid", "==", user.uid));
    const goalsQuery = query(goalsRef, where("uid", "==", user.uid));
    const [todos, todos_loading] = useCollectionData(todosQuery);
    const [calendars, calendars_loading] = useCollectionData(calendarsQuery);
    const [goals, goals_loading] = useCollectionData(goalsQuery);
    

    //functions
    const get_difference = (today,date)=>{
        const date1 = new Date(today);
        const date2 = new Date(date);
        const diffTime = date2 - date1;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        return diffDays - 1;
    }

    const add_new_goal = async()=>{
        var temp_variables = [];
        temp_variables.push({
            variable_id : Math.floor(Math.random()*999999999),
            variable_name : variable_1_name,
            variable_prefix : variable_1_prefix,
            variable_data : []
        });
        if(variable_2_name !== ''){
            temp_variables.push({
                variable_id : Math.floor(Math.random()*999999999),
                variable_name : variable_2_name,
                variable_prefix : variable_2_prefix,
                variable_data : []
            });
        }
        if(variable_3_name !== ''){
            temp_variables.push({
                variable_id : Math.floor(Math.random()*999999999),
                variable_name : variable_3_name,
                variable_prefix : variable_3_prefix,
                variable_data : []
            });
        }
        if(variable_4_name !== ''){
            temp_variables.push({
                variable_id : Math.floor(Math.random()*999999999),
                variable_name : variable_4_name,
                variable_prefix : variable_4_prefix,
                variable_data : []
            });
        }
        setDoc(doc(goalsRef),{
            uid : user.uid,
            goal_id : Math.floor(Math.random()*999999999),
            goal_name : goal_name,
            goal_variables : temp_variables
        });
        clickCloseAddGoal();
        handleClickOpenAddGoalAlert();
    }

    const add_new_calendar = async()=>{
        setDoc(doc(calendarsRef),{
            uid : user.uid,
            calendar_id : Math.floor(Math.random()*999999999),
            calendar_description : calendarDescription,
            calendar_importance : calendarImportance,
            calendar_end_time : calendarEndTime[5] + calendarEndTime[6] + "/" + calendarEndTime[8] + calendarEndTime[9] + "/" + calendarEndTime[0] + calendarEndTime[1] + calendarEndTime[2] + calendarEndTime[3]
        });
        clickCloseAddCalendar();
        handleClickOpenAddCalendarAlert();
    }

    const add_new_task = async()=>{
        setDoc(doc(todosRef),{
            uid : user.uid,
            todo_id : Math.floor(Math.random()*999999999),
            todo : new_task,
            done : false,
            color : 'text-light',
            date_created : Variables.get_today_date
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


    const delete_calendar = async(id)=>{
        const query_to_delete = query(calendarsRef, where("calendar_id", "==", id));
        const querySnapshot = await getDocs(query_to_delete);
        var temp_doc_id = '';
        querySnapshot.forEach((elt)=>{temp_doc_id = elt.id});
        await deleteDoc(doc(db,"calendars",temp_doc_id));
    }


    const delete_goal = async(id)=>{
        const query_to_delete = query(goalsRef, where("goal_id", "==", id));
        const querySnapshot = await getDocs(query_to_delete);
        var temp_doc_id = '';
        querySnapshot.forEach((elt)=>{temp_doc_id = elt.id});
        await deleteDoc(doc(db,"goals",temp_doc_id));
    }




    return (
        <div className='Add_page'>
            <Navbar photoURL={user.photoURL} name={user.displayName} title="Add"/>
            <div className="row mt-5 crud">



                {/* TASK CRUD */}
                <div className="col-12 col-lg-4 col-sm-12 mb-5 text-center text-light" style={{borderRight : "2px solid rgba(255,255,255,0.2)"}}>
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
                                    <div key={elt.todo_id} className='d-flex'><a className="list-group-item list-group-item-action active bg-secondary rounded mb-2">{elt.todo} </a><button onClick={()=>{delete_task(elt.todo_id)}} className="btn btn-danger ml-2 mb-2 rounded"><i className="fa fa-remove"></i></button></div>
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
                <div className="col-12 col-lg-4 col-sm-12 mb-5 text-center text-light">
                    <i className="fa fa-calendar mb-5" style={{fontSize : "70px"}}></i><br />

                    <button onClick={clickOpenAddCalendar} className="btn btn-primary mt-5 mb-4"><i className="fa fa-plus mr-3"></i> Add Calendar</button><br />
                    <Dialog open={openAddCalendar} onClose={clickCloseAddCalendar}>
                        <DialogTitle>Add new calendar</DialogTitle>
                        <DialogContent>
                            <DialogContentText>Please enter the calendar description + date, then click on add calendar : </DialogContentText>
                            <div className="row mt-4">
                                <div className="col-3"><h6 className="text-center mt-2"><span className='mr-2'>end time</span> <i className="fa fa-clock-o"></i></h6></div>
                                <div className="col-9"><input type="date" className='form-control' onChange={(e)=>{setCalendarEndTime(e.target.value)}}/></div>
                            </div>
                            <hr />
                            <div className="row mt-4">
                                <div className="col-3"><h6 className="text-center mt-2"><span className='mr-2'>Details</span> <i className="fa fa-align-center"></i></h6></div>
                                <div className="col-9"><input type="text" className='form-control' onChange={(e)=>{setCalendarDescription(e.target.value)}} placeholder="enter the description of your calendar ..." /></div>
                            </div>
                            <hr />
                            <div className="row mt-4">
                                <div className="col-3"><h6 className="text-center"><span className='mr-2'>How important is your calendar ?</span></h6></div>
                                <div className="col-3 text-center">not important <br /><input type="radio" name='importance' value="table-active" onChange={(e)=>{setCalendarImportance(e.target.value)}}/></div>
                                <div className="col-3 text-center">important <br /><input type="radio" name='importance' value="table-warning" onChange={(e)=>{setCalendarImportance(e.target.value)}}/></div>
                                <div className="col-3 text-center">very important <br /><input type="radio" name='importance' value="table-danger" onChange={(e)=>{setCalendarImportance(e.target.value)}}/></div>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={clickCloseAddCalendar}>Cancel</Button>
                            {calendarEndTime !== '' && get_difference(Variables.get_today_date,calendarEndTime) > 0 &&
                                calendarDescription !== '' && 
                                    calendarImportance !== '' && <Button onClick={add_new_calendar}>Add calendar</Button>
                            }
                        </DialogActions>
                    </Dialog>
                    <Stack spacing={2} sx={{ width: '100%' }}>
                        <Snackbar open={openAddCalendarAlert} autoHideDuration={6000} onClose={handleCloseOpenAddCalendarAlert}>
                            <Alert onClose={handleClickOpenAddCalendarAlert} severity="success" sx={{ width: '100%' }}>New calendar added succesfuly! 👍</Alert>
                        </Snackbar>
                    </Stack>

                    <button onClick={clickOpenDeleteCalendar} className="btn btn-primary mt-5 mb-4"><i className="fa fa-remove mr-3"></i>Remove Calendar</button><br /><br />
                    <Dialog open={openDeleteCalendar} onClose={clickCloseDeleteCalendar}>
                        <DialogTitle>Delete Calendar</DialogTitle>
                        <DialogContent>
                            <DialogContentText>Please choose from the list below the calendar that you want to delete then click "Delete"</DialogContentText><br />
                            <div class="list-group">
                                {!calendars_loading && calendars.map((elt)=>(
                                    <div key={elt.calendar_id} className='d-flex'><a className="list-group-item list-group-item-action active bg-secondary rounded mb-2">{elt.calendar_description} </a><button onClick={()=>{delete_calendar(elt.calendar_id)}} className="btn btn-danger ml-2 mb-2 rounded"><i className="fa fa-remove"></i></button></div>
                                ))}
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={clickCloseDeleteCalendar}>Cancel</Button>
                        </DialogActions>
                    </Dialog>
                </div>




                {/* GOAL CRUD */}
                <div className="col-12 col-lg-4 col-sm-12 mb-5 text-center text-light" style={{borderLeft : "2px solid rgba(255,255,255,0.2)"}}>
                    <i className="fa fa-bullseye mb-5" style={{fontSize : "70px"}}></i><br />
                    <button onClick={clickOpenAddGoal} className="btn btn-primary mt-5 mb-4"><i className="fa fa-plus mr-3"></i> Add Goal</button><br />
                    <Dialog open={openAddGoal} onClose={clickCloseAddGoal}>
                        <DialogTitle>Add new Goal</DialogTitle>
                        <DialogContent>
                            <DialogContentText>Please enter your Goal details(goal name + goal variables) to add the goal to your list.You can add max 4 variables and at least 1 variable should be entered </DialogContentText>
                            <TextField autoFocus onChange={(e)=>{setGoalName(e.target.value)}} margin="dense" id="name" label="Goal Name" type="text" fullWidth variant="standard"/><br />
                            <div className="row mb-1">
                                <div className="col-8"><TextField onChange={(e)=>{setVariable1Name(e.target.value)}} margin="dense" id="name" label="variable name" type="text" fullWidth variant="standard"/></div>
                                <div className="col-4"><TextField onChange={(e)=>{setVariable1Prefix(e.target.value)}} margin="dense" id="name" label="variable prefix name" type="text" fullWidth variant="standard"/></div>
                            </div>

                            <div className="row mb-1">
                                <div className="col-8"><TextField onChange={(e)=>{setVariable2Name(e.target.value)}} margin="dense" id="name" label="variable name" type="text" fullWidth variant="standard"/></div>
                                <div className="col-4"><TextField onChange={(e)=>{setVariable2Prefix(e.target.value)}} margin="dense" id="name" label="variable prefix name" type="text" fullWidth variant="standard"/></div>
                            </div>

                            <div className="row mb-1">
                                <div className="col-8"><TextField onChange={(e)=>{setVariable3Name(e.target.value)}} margin="dense" id="name" label="variable name" type="text" fullWidth variant="standard"/></div>
                                <div className="col-4"><TextField onChange={(e)=>{setVariable3Prefix(e.target.value)}} margin="dense" id="name" label="variable prefix name" type="text" fullWidth variant="standard"/></div>
                            </div>

                            <div className="row mb-1">
                                <div className="col-8"><TextField onChange={(e)=>{setVariable4Name(e.target.value)}} margin="dense" id="name" label="variable name" type="text" fullWidth variant="standard"/></div>
                                <div className="col-4"><TextField onChange={(e)=>{setVariable4Prefix(e.target.value)}} margin="dense" id="name" label="variable prefix name" type="text" fullWidth variant="standard"/></div>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={clickCloseAddGoal}>Cancel</Button>
                            {goal_name !== '' &&
                                variable_1_name !== '' &&
                                    variable_1_prefix !== '' &&
                                        <Button onClick={add_new_goal}>Add</Button>
                            }
                        </DialogActions>
                    </Dialog>
                    <Stack spacing={2} sx={{ width: '100%' }}>
                        <Snackbar open={openAddGoalAlert} autoHideDuration={6000} onClose={handleCloseOpenAddGoalAlert}>
                            <Alert onClose={handleClickOpenAddGoalAlert} severity="success" sx={{ width: '100%' }}>New goal added succesfuly! 👍</Alert>
                        </Snackbar>
                    </Stack>

                    <button onClick={clickOpenDeleteGoal} className="btn btn-primary mt-5 mb-4"><i className="fa fa-remove mr-3"></i>Remove Goal</button><br /><br />
                    <Dialog open={openDeleteGoal} onClose={clickCloseDeleteGoal}>
                        <DialogTitle>Delete Goal</DialogTitle>
                        <DialogContent>
                            <DialogContentText>Please choose from the list below the goal that you want to delete then click "Delete"</DialogContentText><br />
                            <div class="list-group">
                                {!goals_loading && goals.map((elt)=>(
                                    <div key={elt.goal_id} className='d-flex'><a className="list-group-item list-group-item-action active bg-secondary rounded mb-2">{elt.goal_name} </a><button onClick={()=>{delete_goal(elt.goal_id)}} className="btn btn-danger ml-2 mb-2 rounded"><i className="fa fa-remove"></i></button></div>
                                ))}
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={clickCloseDeleteGoal}>Cancel</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}

export default Add_page
