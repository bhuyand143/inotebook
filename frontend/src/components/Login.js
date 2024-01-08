import React, { useState } from 'react' 
import { Link, useNavigate } from 'react-router-dom';
const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"",password:""})
    const host = process.env.REACT_APP_HOST_URL;
    let navigate=useNavigate();//for history
    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `${host}/api/auth/login/`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
        }); 
        const json=await response.json()
        console.log(json);
        if(json.success){
            //redirect
            localStorage.setItem('token',json.authToken);
            props.showAlert('Logged in Successfully','success');
            navigate('/home');
        }
        else
        {
             props.showAlert(json.error,"danger");
        }
    }
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value}) // any thing that changes should be replaced with the value which is in name  all others will be same as before
    }

    return (
        <div className='container'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} id="email" name='email' aria-describedby="emailHelp" onChange={onChange}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} name='password' id="password" onChange={onChange}/>
                </div>
                <div className="d-flex justify-content-between">
                <button type="submit" className=" btn btn-primary">Submit</button>
                <Link to="/signup"  className="form-text align-self-end">Create an Account!</Link>
                </div>
                
            </form>
        </div>
    )
}

export default Login