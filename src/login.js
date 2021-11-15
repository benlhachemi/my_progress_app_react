import React from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import firebaseConfig from './firebase-config';

const Login = ({auth,user,provider}) => {

    return (
        <div className='Login'>
            <div className='container'>
                <center>
                <div className='jumbotron text-align-center animate__animated animate__tada'>
                    <h1 className="text-light mb-5">Sign In</h1>
                    <button onClick={()=>{signInWithPopup(auth, provider)}} className='btn btn-info'><img src='https://i.imgur.com/mvHApEj.png'/>Log-in with Google</button>
                </div>
                </center>
            </div>
        </div>
    )
}

export default Login
