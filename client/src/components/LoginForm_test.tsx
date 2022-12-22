import React, { useState } from 'react'
import { Formik } from 'formik';
import { useAuth } from '../context/AuthContext';
import { cookies } from '../utils/cookies';

const initialValues = {
    userName: 'Lina',
    password: 'testing'
};

const LoginForm = () => {
    const [ errors, setErrors ] = useState<{msg:string}[]>([]);
    const { login, isAuthenticated, setIsAuthenticated } = useAuth();

    const handleLogin = async (values: any) => {
        const res = await login(values);
        if(res.errors){
            setErrors(res.errors)
        };
    }

    const handleLogout = () => {
        cookies.remove('auth_token')
        setIsAuthenticated(false);
        const t = cookies.get('auth_token')
        console.log(t)
    }
  return (
    !isAuthenticated ?
    <>
        <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleLogin(values)}
        >
            {({errors, touched, handleSubmit, handleChange ,values}) => (
                <form onSubmit={handleSubmit}>
                    <input value={values.userName} onChange={handleChange} type="text" name="userName" id="" />
                    <input value={values.password} onChange={handleChange} type="text" name="password" id="" />
                    <button type="submit">go</button>
                </form>
            )}
        </Formik>
        {
            errors.map(i => 
                <p style={{color:'red', fontSize:'12px'}}>{i.msg}</p>
            
            )
        }
    </>
    : 
    <>
        <button onClick={handleLogout}>Log out</button>
    </>
  );
}

export default LoginForm