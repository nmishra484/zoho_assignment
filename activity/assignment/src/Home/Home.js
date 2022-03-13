import React ,{useState, useEffect} from 'react'
import './Home.css';
function Home() {


    const getDatafromLS=()=>{
        const data = localStorage.getItem('savedcontacts');
        if(data){
          return JSON.parse(localStorage.getItem('savedcontacts'));
        }
        else{
          return []
        }
    }

    const [contacts, setContacts] = useState(getDatafromLS());
    const [email,setEmail] = useState('');
    const [name,setName] = useState(''); 
    const [ phno, setPhno] = useState('');

 
    const onSave = (event) => {
       event.preventDefault();
       let contact={ 
           name,
           email,
           phno
        }
        setContacts([contact])
    }

    // saving data to local storage
    useEffect(()=>{
        localStorage.setItem('savedcontacts',JSON.stringify(contacts));
    },[contacts])
    
  return (
        <div className="container">
            <form className="box">
                <div className="signincontain">
                    <div className="signintit"><strong>Add Contacts</strong></div>
                    <div className="inputfieldboxhome">
                        <label className="label">Name</label>
                        <input
                            className="inputfield"
                            onChange = {event => setName(event.target.value)}
                            type="text"
                            required
                        />
                    </div>

                    <div className="inputfieldboxhome">                   
                        <label className="label">Ph No</label>
                        <input
                            className="inputfield"
                            onChange = {event => setPhno(event.target.value)}
                            type="tel" 
                            required
                        />
                    </div>
                    <div className="inputfieldboxhome">
                        <label className="label">Email</label>
                        <input
                            className="inputfield"
                            onChange = {event => setEmail(event.target.value)}
                            type="email"
                            required
                        />
                    </div>
                    <button onClick={onSave} className="save">Save</button>
                </div> 
            </form>
            <div className="contact">
                <div className="signintit"><strong>My Contacts</strong></div>
                <div className="table">
                    <table>
                        <thead>
                            <tr> 
                                <th>Name</th>
                                <th>Ph No</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map(contact=>(
                                <tr>
                                    <td>{contact.name}</td>
                                    <td>{contact.phno}</td>
                                    <td>{contact.email}</td>          
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
  
}

export default Home