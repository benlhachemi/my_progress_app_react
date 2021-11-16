import React from 'react'
import './to_do.css';

const Todo = (props) => {
    return (
        <div className='Todo'>
            <h3 className="text-center text-light title">To Do</h3>
            {props.tasks.length > 0 ? props.tasks.map((elt)=>(
                <div className='row mt-3' key={elt.todo_id}>
                    <div className='col-2'><input type="checkbox" onChange={(e)=>{props.update_todos(elt.todo_id)}} checked={elt.done} className='mt-2' style={{marginLeft : '30px'}}/></div>
                    {elt.done ? <div className='col-10'><strike><h6 className='mt-2 text-secondary' >{elt.todo}</h6></strike></div> : <div className='col-10'><h5 className={`mt-2 ${elt.color}`} >{elt.todo}</h5></div>}
                </div>
            )) : <h5 className="text-center text-warning mt-5">You have no tasks 😄</h5>}
        </div>
    )
}

export default Todo
