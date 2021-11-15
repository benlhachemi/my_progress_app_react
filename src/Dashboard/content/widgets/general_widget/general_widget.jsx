import React from 'react'
import './general_widget.css'

const General_widget = (props) => {
    return (
        <div className='General_widget'>
            <div className="d-flex text-center">
                <h5 className="text-light text-center mt-2" style={{width: "100%"}}>Today is {props.date}</h5>
                <h1 className="text-warning text-center" style={{width: "100%"}}>{props.meteo_degree}</h1>
            </div>
            <h6 className="text-center text-light task ml-4 mr-4">You have <span className="text-info font-weight-bold">{props.tasks}</span> tasks for today</h6>
            <div className="d-flex text-center mt-3">
                <div className="week text-light text-center mr-2">
                    <h6 className="text-light text-center">Week : </h6>
                    <div className="progress">
                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: props.week}}></div>
                    </div>
                </div>
                <div className="month text-light text-center ml-2">
                <h6 className="text-light text-center">Month : </h6>
                <div className="progress">
                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: props.month}}></div>
                    </div>
                </div>
            </div>
            <div className="d-flex mt-3 text-center">
                {props.icons.length > 0 && props.icons.map((elt)=>(
                    <i className={`fa ${elt}`} style={{width: "20%",fontSize : "30px",color:"rgba(0,0,0,0.3)"}}></i>
                ))}
            </div>
        </div>
    )
}

export default General_widget
