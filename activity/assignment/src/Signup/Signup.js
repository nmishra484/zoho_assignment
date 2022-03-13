
import React ,{useState}from 'react'
import './Signup.css';
import { Redirect } from "react-router-dom";

function Signup() {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState(''); 
    const [ id, setID] = useState('');

    const onSubmitSignup=()=>{
        fetch('http://localhost:5000/register',{
            method:'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                userName:name,
                userEmail:email,
                userPassword:password
            })
        })
        .then(response => response.json())
        .then(user =>{
            if(user.userid){
                setID(user.userid);
            }
        })
      
       
    }
  return (
     
        <div className="container">
            {  id ? <Redirect to="/home"/> :
                <fieldset className="box">
                    <div className="signin-contain">
                        <div className="signin-tit"><strong>Sign Up</strong></div>
                        <div className="inputfield-box">
                            <label className="label">Name</label>
                            <input
                                className="inputfield"
                                type="text"
                                onChange = {event => setName(event.target.value)}
                                required
                            />
                        </div>
                        <div className="inputfield-box">
                            <label className="label">Email</label>
                            <input
                                className="inputfield"
                                type="email"
                                onChange = {event => setEmail(event.target.value)}
                                required
                            />
                        </div>

                        <div className="inputfield-box">                   
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

export default Signup