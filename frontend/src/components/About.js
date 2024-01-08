import React,{useState } from 'react'
import { useNavigate } from 'react-router-dom'

const About = (props) => {
  const [feeds, setFeeds] = useState({firstname:"",lastname:"",email:"",feedback:""})
  let navigate = useNavigate();//for history
  const host = process.env.REACT_APP_HOST_URL;
  const handleSubmit = async (e) => { 
      try{
          e.preventDefault();
          const url = `${host}/api/contact/postfeedback/`;
          const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ firstname: feeds.firstname, lastname: feeds.lastname, email: feeds.email, feedback:feeds.feedback})
        });
        const json = await response.json()
        console.log(json);
        navigate('/');
        }
        catch(error){
          props.showAlert(error,"danger");
        }
    }
  const onChange = (e) => {
    setFeeds({ ...feeds, [e.target.name]: e.target.value }) // any thing that changes should be replaced with the value which is in name  all others will be same as before
  }
  return (
    <div className='container'>
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit} >
            <div className="row">
              <div class="col">
                <label htmlFor="firstname" className="form-label">First Name</label>
                <input type="text" className="form-control" id="firstname" name='firstname'  onChange={onChange} placeholder="First name" aria-label="First name" required/>
              </div>
              <div class="col">
                <label htmlFor="lastname" className="form-label">Last Name</label>
                <input type="text" className="form-control" id="lastname" name='lastname'  onChange={onChange} placeholder="Last name" aria-label="Last name" required/>
              </div>
            </div>
            <div className='mb-3'>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" class="form-control" id="email" name='email'  onChange={onChange} placeholder="name@example.com" required/>
              </div>
              <div class="mb-3">
                <label htmlFor="feedback" className="form-label">Feedback</label>
                <textarea class="form-control" id="feedback" name='feedback'  onChange={onChange} rows="3"></textarea>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
    </div>
  )
}

export default About
