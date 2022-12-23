import { useState } from 'react'
import { Formik } from 'formik';
import { useAuth } from '../../context/AuthContext';
import { cookies } from '../../utils/cookies';
import boxImage from '../../assets/mystery_box.png'
import './LoginForm.scss'

const initialValues = {
    userName: '',
    password: ''
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

  return (
    <div className={`login-form-wrapper ${isAuthenticated && 'loggedIn'}`}>
      <img className="box-image" src={boxImage} alt="box_image" />
      <div className="title">
        <p>Lina & Dave's</p>
        <h4 className={`retro`}>MYSTERY BOX</h4>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => handleLogin(values)}
        >
          {({ errors, touched, handleSubmit, handleChange, values }) => (
            <form onSubmit={handleSubmit}>
              <input
                placeholder='username'
                value={values.userName}
                onChange={handleChange}
                type="text"
                name="userName"
                id=""
              />
              <input
                placeholder='password'
                value={values.password}
                onChange={handleChange}
                type="password"
                name="password"
                id=""
              />
              <button type="submit">go</button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default LoginForm