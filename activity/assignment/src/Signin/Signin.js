import React ,{useState}from 'react'
import './Signin.css';
import { Link,Redirect } from "react-router-dom";

function Signin({issignedin , onRouteChange}) {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState(''); 
    const [ id , setID] = useState('');
    const onSubmitSignup=()=>{
        fetch('http://localhost:5000/login',{
            method:'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                userEmail:email,
                userPassword:password
            })
        })
        .then(response => response.json())
        .then(user =>{
            if(user.userid){
                setID(user.userid);
                onRouteChange.onRouteChange('home')
            }
        })   
    }

  return (
       
        <div className="container">
            {  id?<Redirect to="/home"/> :
                <fieldset className="box">
                    <div className="signincontain">
                        <div className="signintit"><strong>Sign In</strong></div>
                        <div className="registerbox">
                        <Link style={{textDecoration:"none",color:"black"}}to="/signup"><h6>Don't have an account?<span className="clicksignup">Signup</span> </h6></Link>
                        </div>
                        <div className="inputfieldbox">
                            <label className="label">Email</label>
                            <input
                                className="inputfield"
                                type="email"
                                onChange = {event => setEmail(event.target.value)}
                                required
                            />
                        </div>

                        <div className="inputfieldbox">                   
                            <label className="label">Password</label>
                            <input
                                className="inputfield"
                                type="password" 
                                onChange = {event => setPassword(event.target.value)}
                                required
                            />
                        </div>
                        <input onClick={onSubmitSignup} className="submit" type="submit"/>   
                    </div> 
                </fieldset>
            }
            
        </div>
    );
}

export default Signin

