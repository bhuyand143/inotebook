import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "",name:"",cpassword:""})
  let navigate = useNavigate();//for history
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(credentials.password!==credentials.cpassword)
    {
      alert("Password and confirm Password are different!");
    }
    else{
      const url = "http://localhost:5000/api/auth/createUser/";
      const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      //redirect
      navigate('/');
      localStorage.setItem('token', json.authToken);
    }
    else {
      alert("Invalid Details!");
    }
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value }) // any thing that changes should be replaced with the value which is in name  all others will be same as before
  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" name='name' id="name" onChange={onChange} required minLength={3} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" name='email' id="email" aria-describedby="emailHelp" onChange={onChange} required/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" name='password' className="form-control" id="password" onChange={onChange} required minLength={5}/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" name='cpassword' className="form-control" id="cpassword" onChange={onChange} required minLength={5} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default SignUp