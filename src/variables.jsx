import {Button,TextField ,Dialog ,DialogActions ,DialogContent ,DialogContentText ,DialogTitle } from '@mui/material';


//variables
const d = new Date();
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var months = ['January', 'February', 'Mars', 'April','May', 'June', 'July', 'August','September','October','November','December'];
const today_name = days[d.getDay()];
const today_month = d.getDate();
const month_name = months[(d.getMonth()+1) - 1];
const meteo_api = "https://api.weatherapi.com/v1/current.json?key=14800a08de8849649fd190453211511&q=Agadir&aqi=no";



//functions
const generate_id = ()=>{
    return Math.floor(Math.random()*999999999);
}

const get_today_date = ()=>{
    return ("0" + (d.getMonth() + 1)).slice(-2) + "/" + ("0" + d.getDate()).slice(-2) + "/" +d.getFullYear();
}

const get_yesterday_date = ()=>{
    var date = new Date();
    date.setDate(date.getDate() - 1);
    return ("0" + (date.getMonth() + 1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2) + "/" +date.getFullYear();
}

const get_month_name = (month)=>{
    return months[(month+1)-1];
}


const get_today_degree = async()=>{
    const fetched_data = await fetch(meteo_api);
    const json_data = await fetched_data.json();
    //console.log(json_data);
    const temp = json_data.current.temp_c;
    return temp;
}

const get_today_meteo_icon = async()=>{
    const fetched_data = await fetch(meteo_api);
    const json_data = await fetched_data.json();
    const temp = json_data.current.condition.icon;
    return temp;
}

const week_progress = ()=>{
    switch(d.getDay()){
        case 1 : return 15;
        case 2 : return 30;
        case 3 : return 45;
        case 4 : return 60;
        case 5 : return 75;
        case 6 : return 90;
        case 0 : return 100;
    }
}

const month_progress = ()=>{
    switch(d.getDate()){
        case 1 : return 0;
        case 2 : return 3.33;
        case 3 : return 6.66;
        case 4 : return 10;
        case 5 : return 13;
        case 6 : return 16;
        case 7 : return 19;
        case 8 : return 23;
        case 9 : return 26;
        case 10 : return 29;
        case 11 : return 33;
        case 12 : return 36;
        case 13 : return 39;
        case 14 : return 43;
        case 15 : return 47;
        case 16 : return 49;
        case 17 : return 53;
        case 18 : return 56;
        case 19 : return 59;
        case 20 : return 63;
        case 21 : return 66;
        case 22 : return 69;
        case 23 : return 73;
        case 24 : return 76;
        case 25 : return 79;
        case 26 : return 83;
        case 27 : return 86;
        case 28 : return 89;
        case 29 : return 93;
        case 30 : return 97;
        case 31 : return 100;
    }
}






//main variable
const Variables = {
    today_full_date : d,
    general_widget_date : today_name + ' ' + today_month + ' ' + month_name,
    today_meteo_degree : get_today_degree(),
    today_meteo_icon : get_today_meteo_icon(),
    week_progress : week_progress() + '%',
    month_progress : month_progress() + '%',
    generate_id : generate_id(),
    get_today_date : get_today_date(),
    get_yesterday_date : get_yesterday_date()
}


//export
export default Variables
