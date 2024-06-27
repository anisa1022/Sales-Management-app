import {useState} from 'react'
import { Link , useNavigate} from 'react-router-dom'
import axios from 'axios';
function RegisterUser() {
    const[data, setDate] =useState({
        name: "",
        email:"",
        password:""
    });
    const [error, setError] =useState("");
    const navigate = useNavigate();

    const handleChange =({currentTarget:input})=>{
        setDate({...data,[input.name]:input.value})
    }

    const handleSubmit =async (e)=>{
        e.preventDefault();
        try {
            const url = "http://localhost:8000/api/users";
            const {data:res} = await axios.post(url,data);
            navigate("/login")
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
                <h1>welcome back</h1>
                <Link to ='/login'>
                    <button>Sign up</button>
                 </Link>
            </div>

            <div className='right'>
                <form className='' onSubmit={handleSubmit}>
                    <h1>Register new User </h1>
                    <input 
                    type="text"
                    placeholder='Name'
                    name = 'name'
                    onChange={handleChange}
                    value={data.name}
                    required
                    className=''
                    />
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
                    <button type='submit' className=''>Save User</button>
                </form>
            </div>
        </div>

    </div>
  )
}

export default RegisterUser