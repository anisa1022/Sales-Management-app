import { useState , useEffect } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
 import { useLoginMutation } from '../services/userSlice';
 import { setCredentials } from '../services/authSlice';
import  {toast} from 'react-toastify';
function Login() {
    const [email ,setEmail] = useState('');
    const [password ,setPassword] = useState('');

    // const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login ,{isLoading}] = useLoginMutation();

    const {userInfo} = useSelector((state) =>state.auth);

    useEffect(()=>{
        if(userInfo){
            navigate('/');
        }
    },[navigate ,userInfo]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login({email , password}).unwrap();
            dispatch(setCredentials({...res}))
        } catch (error) {
            toast.error(err?.data?.message || err.error)
        }
    }
    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-sm">
                    <form onSubmit={handleSubmit}>
                        <h1 className="text-2xl font-bold mb-6 text-center text-[#404040]">Login to Your Account</h1>
                        <div className="mb-4">
                            <input
                                 type="email"
                                 placeholder='Email'
                                 name='email'
                                 value={email}
                                 onChange={(e)=>setEmail(e.target.value)}
                                 required
                                className='w-full p-2 border border-gray-300 rounded'
                            />
                        </div>
                        <div className="mb-6">
                            <input
                                type="password"
                                placeholder='Password'
                                name='password'
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                required
                                className='w-full p-2 border border-gray-300 rounded'
                            />
                        </div>
                        {/* {error && <div className="text-red-500 mb-4">{error}</div>} */}
                        <button 
                            type='submit'
                            variant='primary' 
                            className='w-full bg-[#404040] text-white p-2 rounded hover:bg-gray-500 transition duration-200' >
                            login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;
