import { Formik } from 'formik';
import { useState } from 'react'
import './NewItem.scss'

const initialValues = {
  userName: '',
  password: ''
};

const NewItem = () => {
  const [ open, setOpen ] = useState(false)
  return (
    <div className={`new-item-container ${open && 'open'}`}>
        <div onClick={()=>setOpen(true)} className={`placeholder ${open && 'hidden'}`}>
          <span>+</span>
          Add new item
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => console.log(values)}
        >
          {({ errors, touched, handleSubmit, handleChange, values }) => (
            <form className={`${open && 'open'}`} onSubmit={handleSubmit}>
              <input
              autoFocus
                placeholder="Title"
                value={values.userName}
                onChange={handleChange}
                type="text"
                name="Title"
                id=""
              />
              <input
                placeholder="Descrition"
                value={values.password}
                onChange={handleChange}
                type="text"
                name="Descrition"
                id=""
              />
              <div className="row">
                <input
                  placeholder="link"
                  value={values.password}
                  onChange={handleChange}
                  type="text"
                  name="link"
                  id=""
                />
                <input
                  placeholder="imgLink"
                  value={values.password}
                  onChange={handleChange}
                  type="text"
                  name="imgLink"
                  id=""
                />
              </div>
              <div className="buttons">

                <button onClick={()=> setOpen(false)} className='cancel' type="submit">cancel</button>
                <button type="submit">go</button>
              </div>
            </form>
          )}
        </Formik>
    </div>
  );
}

export default NewItem