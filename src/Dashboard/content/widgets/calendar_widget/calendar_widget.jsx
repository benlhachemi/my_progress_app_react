import React from 'react'
import './calendar_widget.css';
import Variables from '../../../../variables';

var months = ['January', 'February', 'Mars', 'April','May', 'June', 'July', 'August','September','October','November','December'];

const Calendar_widget = ({calendars}) => {
    var temp_calendars = calendars.sort((a,b) => new Date(a.calendar_end_time).getTime() - new Date(b.calendar_end_time).getTime());


    //functions

    const get_difference = (today,date)=>{
        const date1 = new Date(today);
        const date2 = new Date(date);
        const diffTime = date2 - date1;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        return diffDays;
    }

    const get_progress = (diffDays)=>{
        switch(diffDays){
            case 30 : return 0;
            case 29 : return 3.33;
            case 28 : return 6.66;
            case 27 : return 10;
            case 26 : return 13;
            case 25 : return 16;
            case 24 : return 19;
            case 23 : return 23;
            case 22 : return 26;
            case 21 : return 29;
            case 20 : return 33;
            case 19 : return 36;
            case 18 : return 39;
            case 17 : return 43;
            case 16 : return 47;
            case 15 : return 49;
            case 14 : return 53;
            case 13 : return 56;
            case 12 : return 59;
            case 11 : return 63;
            case 10 : return 66;
            case 9 : return 69;
            case 8 : return 73;
            case 7 : return 76;
            case 6 : return 79;
            case 5 : return 83;
            case 4 : return 86;
            case 3 : return 89;
            case 2 : return 93;
            case 1 : return 97;
            case 0 : return 100;
        }
    }

    const get_day_and_month = (string)=>{
        const day = string[3] + string[4];
        const month = Number(string[0] + string[1]);
        return day + " " + months[month - 1];
    }

    const how_much_left = (string)=>{

    }

    return (
        <div className="Calendar_widget text-light">
            <h3 className="text-center text-light title">Calendar</h3>
            {calendars.length > 0 ? 
            <table className="table table-hover">
            <thead>
                <tr className='text-light'>
                    <th scope="col">end time</th>
                    <th scope="col">how much left ?</th>
                    <th scope="col">Description</th>
                </tr>
            </thead>
            <tbody>

                {temp_calendars.map((elt)=>(
                   
                    <tr key={elt.calendar_id} className={`text-light ${elt.calendar_importance}`}>
                        <td>{get_day_and_month(elt.calendar_end_time)}</td>
                        <td>
                            {get_difference(Variables.get_today_date,elt.calendar_end_time) > 31 ? <div>far  </div> : 
                                get_difference(Variables.get_today_date,elt.calendar_end_time) === 1 ? <div>Tomorrow <i className="ml-2 fa fa-warning"></i></div> : 
                                    get_difference(Variables.get_today_date,elt.calendar_end_time) === 0 ? <div>Today</div> : 
                                        
                                        <div>
                                            
                                                <div className="progress">
                                                    <div className="progress-bar" role="progressbar" style={{width : get_progress(get_difference(Variables.get_today_date,elt.calendar_end_time)) + "%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{get_difference(Variables.get_today_date,elt.calendar_end_time)} Days</div>
                                                    </div>
                                                
                                        </div>
                            }
                            
                        </td>
                        <td className="font-weight-bold">{elt.calendar_description}</td>
                    </tr>
                ))}



                
            </tbody>
        </table>
            : <h5 className='mt-5'>You have nothing in the agenda 😎</h5>}
        </div>
    )
}

export default Calendar_widget
