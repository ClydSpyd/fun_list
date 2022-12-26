import { useState, useRef, useEffect } from 'react'
import { Formik } from 'formik';
import { useAuth } from '../../context/AuthContext';
import boxImage from '../../assets/mystery_box.png'
import './LoginForm.scss'
import { addAnimation } from '../../utils/addAnimation';

const initialValues = {
    userName: '',
    password: ''
};

const LoginForm = () => {
    const [ errors, setErrors ] = useState<{msg:string}[]>([]);
    const { login, isAuthenticated, loading } = useAuth();
    const errorsRef = useRef(null)
    
    const handleLogin = async (values: any) => {
        const res = await login(values);
        if(res.errors){
            setErrors(res.errors)
        };
    }

  useEffect(() => {
    if (errors.length) {
      addAnimation(errorsRef, "shakeSlow", 500);
    }
  }, [errors]);

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
            <form onChange={()=>setErrors([])} onSubmit={handleSubmit}>
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
              <button className={`${loading && 'loading'}`} type="submit"/>
            </form>
          )}
        </Formik>
        {
          errors.length > 0 &&
            <div ref={errorsRef} className="errors">
              <p className="error">{errors[0].msg}</p>
            </div>
        }
      </div>
    </div>
  );
}

export default LoginForm