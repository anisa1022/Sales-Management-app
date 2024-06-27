import {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

function Login() {
    const[data, setDate] =useState({
        email:"",
        password:""
    });
    const [error, setError] =useState("");
    

    const handleChange =({currentTarget:input})=>{
        setDate({...data,[input.name]:input.value})
    }

    const handleSubmit =async (e)=>{
        e.preventDefault();
        try {
            const url = "http://localhost:8000/api/users/auth";
            const {data:res} = await axios.post(url,data);
            localStorage.setItem("token",res.data)
            window.location ="/"
            console.log(res.message);
        } catch (error) {
            if( error.response &&
                error.response.status >=400 &&
                error.response.status <=500
            ){
                setError(error.response.data.message)
            }
            
        }
    }

  return (

    <div className='container'>
        <div className='form'>
            <div className='lleft'>
                <form className='' onSubmit={handleSubmit}>
                    <h1> Login to Your Account</h1>
                    <input 
                    type="email"
                    placeholder='Email'
                    name = 'email'
                    onChange={handleChange}
                    value={data.email}
                    required
                    className=''
                    />
                    <input 
                    type="password"
                    placeholder='Password'
                    name = 'password'
                    onChange={handleChange}
                    value={data.password}
                    required
                    className=''
                    />
                    {error && <div className=''>{error}</div>}
                    <button>Login</button>
                </form>
            </div>

            <div className='right'>
                 <h1>welcome back</h1>
                <Link to ='/login'>
                    <button type='submit' className=''>Sign up</button>
                 </Link>

            </div>
        </div>

    </div>
  )
}

export default Login