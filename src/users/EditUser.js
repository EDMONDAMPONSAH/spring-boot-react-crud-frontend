import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditUser() {
    let navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState({
        name: "",
        username: "",
        email: ""
    });
    const { name, username, email } = user;
    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        loadUser();
    }, []);
    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8081/user/${id}`, user);
        navigate("/");
    };

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8081/user/${id}`);
        setUser(result.data);
    }


    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border round p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Edit User</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor='Name' className='form-label'>Name</label>
                            <input
                                className='form-control'
                                type={"text"}
                                placeholder='Enter Your Name'
                                name='name'
                                value={name}
                                onChange={(e) => onInputChange(e)} required />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Username' className='form-label'>Username</label>
                            <input
                                className='form-control'
                                type={"text"}
                                placeholder='Enter Your Username'
                                name='username'
                                value={username}
                                onChange={(e) => onInputChange(e)} required />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Email' className='form-label'>Email</label>
                            <input
                                className='form-control'
                                type={"text"}
                                placeholder='Enter Your Email'
                                name='email'
                                value={email}
                                onChange={(e) => onInputChange(e)} required />
                        </div>
                        <button type='submit' className='btn btn-outline-primary'>Submit</button>
                        <Link className='btn btn-outline-danger mx-2' to="/">Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
