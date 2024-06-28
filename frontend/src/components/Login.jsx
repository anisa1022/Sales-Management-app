import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8000/api/users/auth";
            const { data: res } = await axios.post(url, data);
            localStorage.setItem("token", res.data)
            console.log("Response received:", res);
            window.location = "/Dashboard"
            console.log(res.message);
        } catch (error) {
            if (error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message)
            }
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-sm">
                <form onSubmit={handleSubmit}>
                    <h1 className="text-2xl font-bold mb-6 text-center text-[#404040]">Login to Your Account</h1>
                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder='Email'
                            name='email'
                            onChange={handleChange}
                            value={data.email}
                            required
                            className='w-full p-2 border border-gray-300 rounded'
                        />
                    </div>
                    <div className="mb-6">
                        <input
                            type="password"
                            placeholder='Password'
                            name='password'
                            onChange={handleChange}
                            value={data.password}
                            required
                            className='w-full p-2 border border-gray-300 rounded'
                        />
                    </div>
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    <button className='w-full bg-[#404040] text-white p-2 rounded hover:bg-gray-500 transition duration-200'>Login</button>
                </form>
               
            </div>
        </div>
    )
}

export default Login;
