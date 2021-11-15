import './App.css';
import Login from './login';
import Dashboard from './Dashboard/dashboard';
import Loading from './loading';
import firebaseConfig from './firebase-config';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';



//global variables
const provider = new GoogleAuthProvider();
const auth = getAuth();


function App() {    
    const [user, loading, error] = useAuthState(auth);


    return (
        <div className="App">
            {loading ? <Loading /> : user ? <Dashboard auth={auth} user={user} /> : <Login auth={auth} user={user} provider={provider}/>}
        </div>
    );
}

export default App;
