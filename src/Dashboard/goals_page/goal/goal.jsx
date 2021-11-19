import React, {useState, useEffect} from 'react'
import './goal.css'
import { useCollectionData, useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { getFirestore, collection, getDocs, query, where, doc, setDoc ,updateDoc, writeBatch, deleteDoc } from "firebase/firestore"
import {Button,TextField ,Dialog ,DialogActions ,DialogContent ,DialogContentText ,DialogTitle,MuiAlert ,Snackbar ,Stack, Alert  } from '@mui/material';

//gloabal variables
const db = getFirestore();
const goalsRef = collection(db, "goals");


const Goal = ({goal,goal_data_date}) => {
    //mui variables & functions
    const [openEditVariable, setOpenEditVariable] = useState(false);
    const clickOpenEditVariable = () => {setOpenEditVariable(true);};
    const clickCloseEditVariable = () => {setOpenEditVariable(false);};

    //variables & hooks
    const [new_data,setNewData] = useState('');
    const [new_data_id,setNewDataId] = useState('');

    const [edit_data,setEditData] = useState('');
    const [edit_data_id,setEditDataId] = useState('');


    //functions
    const show_edit_data_input = (variable_id_to_edit)=>{
        setOpenEditVariable(true);
        setEditDataId(variable_id_to_edit);
    }

    const update_data = async ()=>{
        setOpenEditVariable(false);
        var temp_goal_variables = goal.goal_variables;

        temp_goal_variables.forEach((elt)=>{
            if(elt.variable_id === edit_data_id){
                elt.variable_data.forEach((elt2) =>{
                    if(elt2.variable_data_date === goal_data_date){
                        elt2.variable_data = edit_data;
                    }
                });
            }
        });

        const query_to_update = query(goalsRef, where("goal_id", "==", goal.goal_id));
        const querySnapshot = await getDocs(query_to_update);
        var temp_doc_id = '';
        querySnapshot.forEach((elt)=>{temp_doc_id = elt.id});
        await updateDoc(doc(db,"goals",temp_doc_id),{goal_variables : temp_goal_variables});
        setEditData('');setEditDataId('');
    }

    const add_data = async()=>{
        var temp_goal_variables = goal.goal_variables;

        temp_goal_variables.forEach((elt)=>{
            if(elt.variable_id === new_data_id){
                elt.variable_data.push({
                    variable_data : new_data,
                    variable_data_date : goal_data_date
                });
            }
        });

        const query_to_update = query(goalsRef, where("goal_id", "==", goal.goal_id));
        const querySnapshot = await getDocs(query_to_update);
        var temp_doc_id = '';
        querySnapshot.forEach((elt)=>{temp_doc_id = elt.id});
        await updateDoc(doc(db,"goals",temp_doc_id),{goal_variables : temp_goal_variables});
        setNewData('');setNewDataId('');
    }

    const get_data_date = (id)=>{
        var data_found = false;
        var result = 'no data found';
        goal.goal_variables.forEach((elt) =>{
            if(elt.variable_id == id){
                elt.variable_data.forEach((variable_data) => {
                    if(variable_data.variable_data_date === goal_data_date){
                        data_found = true;
                        result = variable_data.variable_data;
                    }
                });
            }
        });
        return result;
    }

    var classn_name_1 = 'd-flex';
    var class_name_2 = 'mr-2 ml-2';
    if(window.innerWidth < 1024){classn_name_1 = 'row pl-3 pr-3 pt-3';class_name_2 = 'col-12 mt-4'}

    //main render
    return (
        <div className='Goal jumbotron'>
            <Dialog open={openEditVariable} onClose={clickCloseEditVariable}>
                        <DialogTitle>Edit Variable Data <i className="fa fa-pencil"></i></DialogTitle>
                        <DialogContent>
                            <DialogContentText>Please enter your new data that you wanna update : </DialogContentText>
                            <TextField onChange={(e)=>{setEditData(e.target.value)}} autoFocus margin="dense" id="name" label="new data" type="text" fullWidth variant="standard"/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={clickCloseEditVariable}>Cancel</Button>
                            {edit_data != '' && <Button onClick={update_data}>Update</Button>}
                        </DialogActions>
            </Dialog>
            <div className="title text-light">{goal.goal_name} <a href={`/analytics/${goal.goal_id}`} style={{fontSize:'12px'}}>Show Details</a></div>
            <div className={`${classn_name_1}`}>
                {goal.goal_variables.map((elt) =>(
                    <div key={elt.variable_id} className={`${class_name_2} card text-white text-center mb-3`} style={{width:'100%'}}>
                        <div className="card-header">{elt.variable_name} </div>
                        <div className="card-body">
                            <div className="card-title">
                                {get_data_date(elt.variable_id)} 
                                {get_data_date(elt.variable_id) !== 'no data found' ? 
                                    <span className='ml-2'><span>{elt.variable_prefix}</span><i onClick={()=>{show_edit_data_input(elt.variable_id)}} className="ml-3 fa fa-pencil" style={{cursor : 'pointer'}}></i></span> : 
                                    <div>
                                        <br />
                                        <div className="row">
                                            <div className="col-9"><input onChange={(e)=>{setNewData(e.target.value);setNewDataId(elt.variable_id)}} placeholder='enter data of this day ...' type="number" className='form-control' /></div>
                                            <div className="col-3">
                                                {new_data !== '' && 
                                                    new_data_id === elt.variable_id && 
                                                        <button onClick={()=>{add_data()}} className='btn btn-primary'>ADD</button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                ))}

                
            </div>
        </div>
    )
}

export default Goal
