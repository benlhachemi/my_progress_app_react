import React from 'react'
import './general_widget.css'

const General_widget = (props) => {
    return (
        <div className='General_widget'>
            
                <h5 className="text-light text-center mt-2" >Today is {props.date}</h5>
                
                
                    <h1 className="text-warning text-center" >{props.meteo_degree}</h1>
               
                
                    <img src={props.meteo_icon} alt="" />
               
           
            
            <h4 className="text-center text-light task ml-4  mt-3 mb-3 mr-4">You have <span className="text-info font-weight-bold">{props.tasks}</span> tasks for today</h4>
            <div className="d-flex text-center mt-3">
                <div className="week text-light text-center mr-2">
                    <h6 className="text-light text-center">Week : </h6>
                    <div className="progress">
                        <div className="progress-bar progress-bar-striped progress-bar-animated bg-dark" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: props.week}}></div>
                    </div>
                </div>
                <div className="month text-light text-center ml-2">
                    <h6 className="text-light text-center">Month : </h6>
                    <div className="progress">
                            <div className="progress-bar progress-bar-striped progress-bar-animated bg-dark" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: props.month}}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default General_widget
