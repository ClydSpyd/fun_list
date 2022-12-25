import axios from 'axios';
import { Formik } from 'formik';
import { useState, useRef, useEffect, FormEvent } from 'react'
import './NewItem.scss'

const initialValues = {
  title: '',
  description: '',
  link: '',
  imgLink: '',
};

interface props {
  query: any;
}

const NewItem = ({ query }: props) => {
  const { refetch, isRefectching } = query;
  const [ open, setOpen ] = useState(false)
  const titleRef = useRef<HTMLInputElement|null>(null);

  useEffect(() => {
    if (open) titleRef.current?.focus();
  }, [open]);

  return (
    <div className={`new-item-container ${open && 'open'}`}>
        <div onClick={()=>setOpen(true)} className={`placeholder ${open && 'hidden'}`}>
          <span>+</span>
          Add new item
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={()=>console.log('ö')}
        >
          {({ errors, touched, handleChange, values, resetForm }) =>{ 
            const doTheThing = async (e: FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              const res = await axios.post('/api/item/create', values);
              resetForm();
              refetch();
              setOpen(false)
              console.log(res);
            }
            return (
            <form className={`${open && 'open'}`} onSubmit={(e)=>doTheThing(e)}>
              <input
              autoFocus
                ref={titleRef}
                placeholder="Title"
                value={values.title}
                onChange={handleChange}
                type="text"
                name="title"
                id=""
              />
              <input
                placeholder="Descrition"
                value={values.description}
                onChange={handleChange}
                type="text"
                name="description"
                id=""
              />
              <div className="row">
                <input
                  placeholder="link"
                  value={values.link}
                  onChange={handleChange}
                  type="text"
                  name="link"
                  id=""
                />
                <input
                  placeholder="Image link"
                  value={values.imgLink}
                  onChange={handleChange}
                  type="text"
                  name="imgLink"
                  id=""
                />
              </div>
              <div className="buttons">

                <button onClick={()=> setOpen(false)} className='cancel' type="submit">cancel</button>
                <button className={`go ${isRefectching && 'loading'}`} type="submit" />
              </div>
            </form>
          )}}
        </Formik>
    </div>
  );
}

export default NewItem