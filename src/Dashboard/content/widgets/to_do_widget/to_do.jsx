import React from 'react'
import './to_do.css';

const Todo = (props) => {
    return (
        <div className='Todo'>
            <h3 className="text-center text-light title">To Do</h3>
            {props.tasks.length > 0 ? props.tasks.map((elt)=>(
                elt.done ? 
                    <div className='row bg-dark mt-3 mr-2 ml-2 rounded' key={elt.todo_id}>
                    <div className='col-2'><input type="checkbox" onChange={(e)=>{props.update_todos(elt.todo_id)}} checked={elt.done} className='mt-2' style={{marginLeft : '30px',zIndex : '9999'}}/></div>
                    {elt.done ? <div className='col-10'><strike><h6 className='mt-2 text-secondary' >{elt.todo}</h6></strike></div> : <div className='col-10'><h5 className={`mt-2 ${elt.color}`} >{elt.todo}</h5></div>}
                    </div>:
                    <div className='row mt-3 mr-2 ml-2 rounded' style={{background: 'rgba(0,0,0,0.5)'}} key={elt.todo_id}>
                    <div className='col-2'><input type="checkbox" onChange={(e)=>{props.update_todos(elt.todo_id)}} checked={elt.done} className='mt-2' style={{marginLeft : '30px'}}/></div>
                    {elt.done ? <div className='col-10'><strike><h6 className='mt-2 text-secondary' >{elt.todo}</h6></strike></div> : <div className='col-10'><h5 className={`mt-2 ${elt.color}`} >{elt.todo}</h5></div>}
                    </div>
                
            )) : <h4 className="text-center text-light font-weight-bold mt-5">You have no tasks 😄</h4>}
        </div>
    )
}

export default Todo
