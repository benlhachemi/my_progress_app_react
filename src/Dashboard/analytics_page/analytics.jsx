import React ,{useEffect, useState} from 'react'
import './analytics.css'
import Navbar from '../navbar/navbar'
import { useParams } from "react-router-dom";
import { useCollectionData, useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { getFirestore, collection, getDocs, query, where, doc, setDoc ,updateDoc, writeBatch, deleteDoc } from "firebase/firestore"
import Goal from '../goals_page/goal/goal';
import Variables from '../../variables';
import { Bar, Line } from 'react-chartjs-2';
import Loading from '../../loading';

//global variables
const db = getFirestore();
const goalsRef = collection(db, "goals");


const Analytics = ({user}) => {

    //variables & hooks
    const goal_id = Number(useParams().goal_id);
    const goalsQuery = query(goalsRef, where("goal_id", "==", goal_id));
    const [goals, goals_loading] = useCollectionData(goalsQuery);
    const [this_week_chart_data,setThisWeekChartData] = useState();
    const [last_week_chart_data,setLastWeekChartData] = useState();

    useEffect(() => {
        var temp_this_week_chart_data = {labels: [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Monday'],datasets: []};
        var temp_last_week_chart_data = {labels: [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Monday'],datasets: []};
        const color = ["#f1c40f","#2ecc71","#9b59b6","#34495e"];
        if(!goals_loading && goals.length > 0){
            goals[0].goal_variables.forEach((elt,i) =>{
                temp_this_week_chart_data.datasets.push({
                    data: get_this_week_data()[i],
                    borderColor: color[i],
                    fill: false,
                    label: elt.variable_name,
                    tension: 0.3
                });
                temp_last_week_chart_data.datasets.push({
                    data: get_last_week_data()[i],
                    borderColor: color[i],
                    fill: false,
                    label: elt.variable_name,
                    tension: 0.3
                });
            });
        }

        setThisWeekChartData(temp_this_week_chart_data);
        setLastWeekChartData(temp_last_week_chart_data);
    }, [goals])

    

    //functions

    const date_difference = (date_1,date_2)=>{
        const date1 = new Date(date_1);
        const date2 = new Date(date_2);
        const diffTime = date2 - date1;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        return diffDays;
    }

    const check_data_existance = (date1,date2)=>{
        const difference = date_difference(date1,date2);
        //console.log("difference between " + date1 + " and " + date2 + " is : " + difference);
        var one_date_not_found = true;

        if(!goals_loading && goals.length > 0){
            goals[0].goal_variables.forEach((elt)=>{

                for(var i=1;i<=difference;i++){
    
                    var date_to_look_for = new Date(date2);
                    date_to_look_for.setDate(date_to_look_for.getDate() - i);
                    const temp_date = ("0" + (date_to_look_for.getMonth() + 1)).slice(-2) + "/" + ("0" + date_to_look_for.getDate()).slice(-2) + "/" + date_to_look_for.getFullYear();
                    var temp_date_found = false;

                    elt.variable_data.forEach((elt2)=>{

                        if(elt2.variable_data_date == temp_date)temp_date_found = true;
                    });
                    
                    if(!temp_date_found)one_date_not_found = false;
                }
            });
        }
        return one_date_not_found;
    }


    const calculate_avg = (variable,date1,date2)=>{
        const difference = date_difference(date1,date2);
        var avg = 0;
        var sum = 0;
        
        for(var i=1;i<=difference;i++){

            var date_to_look_for = new Date(date2);
            date_to_look_for.setDate(date_to_look_for.getDate() - i);
            const temp_date = ("0" + (date_to_look_for.getMonth() + 1)).slice(-2) + "/" + ("0" + date_to_look_for.getDate()).slice(-2) + "/" + date_to_look_for.getFullYear();
            variable.variable_data.forEach((elt)=>{
                if(elt.variable_data_date === temp_date){
                    sum = sum + Number(elt.variable_data);
                }
            });
        }
        avg = sum / difference;
        return avg;
    }

    const calculate_sum = (variable,date1,date2)=>{
        const difference = date_difference(date1,date2);
        var sum = 0;
        
        for(var i=1;i<=difference;i++){

            var date_to_look_for = new Date(date2);
            date_to_look_for.setDate(date_to_look_for.getDate() - i);
            const temp_date = ("0" + (date_to_look_for.getMonth() + 1)).slice(-2) + "/" + ("0" + date_to_look_for.getDate()).slice(-2) + "/" + date_to_look_for.getFullYear();
            variable.variable_data.forEach((elt)=>{
                if(elt.variable_data_date === temp_date){
                    sum = sum + Number(elt.variable_data);
                }
            });
        }
        return sum;
    }

    const get_this_week_data = ()=>{
        const difference = date_difference(Variables.get_last_monday_date,Variables.get_today_date);
        var temp_week_data = [];

        if(!goals_loading && goals.length > 0){
            goals[0].goal_variables.forEach((variable) =>{
                var temp_array = [];
                for(var i=1;i<=difference;i++){

                    var date_to_look_for = new Date(Variables.get_today_date);
                    date_to_look_for.setDate(date_to_look_for.getDate() - i);
                    const temp_date = ("0" + (date_to_look_for.getMonth() + 1)).slice(-2) + "/" + ("0" + date_to_look_for.getDate()).slice(-2) + "/" + date_to_look_for.getFullYear();
                    
                    variable.variable_data.forEach((elt)=>{
                        if(elt.variable_data_date === temp_date){
                            temp_array.push(elt.variable_data);
                        }
                    });
                }
                temp_week_data.push(temp_array.reverse());
            });
        }

        return temp_week_data;
    }

    const get_last_week_data = ()=>{
        const difference = date_difference(Variables.get_last_week_monday_date,Variables.get_last_monday_date);
        var temp_week_data = [];

        if(!goals_loading && goals.length > 0){
            goals[0].goal_variables.forEach((variable) =>{
                var temp_array = [];
                for(var i=1;i<=difference;i++){

                    var date_to_look_for = new Date(Variables.get_last_monday_date);
                    date_to_look_for.setDate(date_to_look_for.getDate() - i);
                    const temp_date = ("0" + (date_to_look_for.getMonth() + 1)).slice(-2) + "/" + ("0" + date_to_look_for.getDate()).slice(-2) + "/" + date_to_look_for.getFullYear();
                    
                    variable.variable_data.forEach((elt)=>{
                        if(elt.variable_data_date === temp_date){
                            temp_array.push(elt.variable_data);
                        }
                    });
                }
                temp_week_data.push(temp_array.reverse());
            });
        }

        return temp_week_data;
    }


    var my_padding = '0';
    if(window.innerWidth > 1024)my_padding = '0 200px';


    //main render
    return (
        <div className='Analytics text-light'>
            <Navbar photoURL={user.photoURL} name={user.displayName} title="Analytics"/>
            {goals_loading ? <Loading /> : 
            <div className="container mt-5">

            {/* THIS WEEK DATA */}
            <hr className="hr-text mb-5" data-content="THIS WEEK DATA" />
            
                
                    {!goals_loading && goals.length > 0 && date_difference(Variables.get_last_monday_date,Variables.get_today_date) === 0 ? <h4>The week just started, there is nothing to show at the moment</h4> :
                        check_data_existance(Variables.get_last_monday_date,Variables.get_today_date) === false ? <h4>Some Data on this week is missing, try go back and add all the missing data to access the analytics</h4> :
                        <div className="row">
                        <div className="col-12">
                            <table className="bg-warning table table-bordered table-striped table-hover text-light">
                                <thead>
                                    <tr>
                                        <th></th>
                                        {!goals_loading && goals.length > 0 && goals[0].goal_variables.map((elt,key)=>(
                                            <th key={key}>{elt.variable_name}</th>
                                        ))}
                                    </tr>
                                    </thead>
                                <tbody>
                                    <tr>
                                        <td>AVG per day</td>
                                        {!goals_loading && goals.length > 0 && goals[0].goal_variables.map((elt,i) =>(
                                            <td key={i}>{Math.floor(calculate_avg(elt,Variables.get_last_monday_date,Variables.get_today_date))} {elt.variable_prefix}</td>
                                        ))}
                                    </tr>

                                    <tr>
                                        <td>Total this week</td>
                                        {!goals_loading && goals.length > 0 && goals[0].goal_variables.map((elt,i) =>(
                                            <td key={i}>{calculate_sum(elt,Variables.get_last_monday_date,Variables.get_today_date)} {elt.variable_prefix}</td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-12 mt-3" style={{padding : my_padding}}>
                            <center>
                            {!goals_loading && goals.length > 0 && window.innerWidth < 1024 && <Line options={{responsive:false}} data ={this_week_chart_data}/> }
                            {!goals_loading && goals.length > 0 && window.innerWidth > 1024 && <Line options={{responsive:true}} data ={this_week_chart_data}/> }
                            </center>
                        </div>
                        </div>
                    }
                

            {/* LAST WEEK DATA */}  
            <br /><hr className="hr-text mb-5 mt-5" data-content="LAST WEEK DATA" />
            {!goals_loading && goals.length > 0 && date_difference(Variables.get_last_week_monday_date,Variables.get_last_monday_date) === 0 ? <h4>The week just started, there is nothing to show at the moment</h4> :
                        check_data_existance(Variables.get_last_week_monday_date,Variables.get_last_monday_date) === false ? <h4>Some Data on the last week is missing, try go back and add all the missing data to access the analytics</h4> :
                        <div className="row">
                        <div className="col-12">
                            <table className="bg-warning table table-bordered table-striped table-hover text-light">
                                <thead>
                                    <tr>
                                        <th></th>
                                        {!goals_loading && goals.length > 0 && goals[0].goal_variables.map((elt,key)=>(
                                            <th key={key}>{elt.variable_name}</th>
                                        ))}
                                    </tr>
                                    </thead>
                                <tbody>
                                    <tr>
                                        <td>AVG per day</td>
                                        {!goals_loading && goals.length > 0 && goals[0].goal_variables.map((elt,i) =>(
                                            <td key={i}>{Math.floor(calculate_avg(elt,Variables.get_last_week_monday_date,Variables.get_last_monday_date))} {elt.variable_prefix}</td>
                                        ))}
                                    </tr>

                                    <tr>
                                        <td>Total Last Week</td>
                                        {!goals_loading && goals.length > 0 && goals[0].goal_variables.map((elt,i) =>(
                                            <td key={i}>{calculate_sum(elt,Variables.get_last_week_monday_date,Variables.get_last_monday_date)} {elt.variable_prefix}</td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-12 mt-3" style={{padding : my_padding}}>
                            <center>
                            {!goals_loading && goals.length > 0 && window.innerWidth < 1024 && <Line options={{responsive:false}} data ={last_week_chart_data}/> }
                            {!goals_loading && goals.length > 0 && window.innerWidth > 1024 && <Line options={{responsive:true}} data ={last_week_chart_data}/> }
                            </center>
                        </div>
                        </div>
                    }
        </div>
            }
        </div>
    )
}

export default Analytics
