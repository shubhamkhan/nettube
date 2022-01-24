import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        password2: ""
    });

    let key, value;

    const handleInputs = (e) => {
        key = e.target.name;
        value = e.target.value;

        setUser({...user, [key]:value});
    }

    const sendData = async (e) => {
        e.preventDefault();

        const { name, email, phone, password, password2 } = user;

        const res = await fetch("/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name, email, phone, password, password2})
        });

        const data = await res.json();

        if(data && data.status === 200) {
            console.log("Successfull Registration" + data.status);
            navigate("/login");
        } else {
            console.log("Invalid Registration"); 
        }
    }
    return (
        <div className='container col-3'>
            <div className="main_div">
                <div className="box">
                    <h2>Registration Form</h2>
                    <hr/>
                    <form method='POST'>
                        <div className="input-box">
                            <input type="text" name="name" id="name" value={user.name} onChange={handleInputs} required />
                            <label htmlFor="name">Full Name</label>
                        </div>
                        <div className="input-box">
                            <input type="text" name="email" id="email" value={user.email} onChange={handleInputs} required />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-box">
                            <input type="text" name="phone" id="phone" value={user.phone} onChange={handleInputs} required />
                            <label htmlFor="phone">Mobile No</label>
                        </div>
                        <div className="input-box">
                            <input type="password" name="password" id="password" value={user.password} onChange={handleInputs} required />
                            <label htmlFor="Password">Password</label>
                        </div>
                        <div className="input-box">
                            <input type="password" name="password2" id="password2" value={user.password2} onChange={handleInputs} required />
                            <label htmlFor="Password2">Confirm Password</label>
                        </div>
                        <input type="submit" value="JOIN" onClick={sendData}/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
