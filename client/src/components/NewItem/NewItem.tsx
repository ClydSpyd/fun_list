import { Formik, useFormikContext } from "formik";
import { useState, useRef, useEffect, FormEvent } from "react";
import { itemTags } from "../../config";
import { apiCall } from "../../utils/api";
import "./NewItem.scss";

interface Props {
  query: any;
  editItem: Item | null;
}

let initialValues = {
  title: "",
  description: "",
  link: "",
  imgLink: "",
  tags: [],
};

const NewItem = ({ query, editItem }: Props) => {
  const { refetch, isRefetching } = query;
  const [open, setOpen] = useState(false);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState(itemTags);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const { setFieldValue } = useFormikContext()

  useEffect(() => {
    if (open) titleRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if(editItem){
      setOpen(true);
      setFieldValue('title', 'hello world')
      // initialValues.title = editItem.title;
    }
  },[editItem])

  const handleCancel = () => {
    setOpen(false)
    removeAllTags();
  }
  const handleTag = (tag: string) => {
    console.log(tag);
    if (activeTags.includes(tag)) {
      setActiveTags([...activeTags.filter((i) => i !== tag)]);
      setAvailableTags([...availableTags, tag]);
    } else {
      setActiveTags([...activeTags, tag]);
      setAvailableTags([...availableTags.filter((i) => i !== tag)]);
    }
  };

  const removeAllTags = () => {
    setActiveTags([]);
    setAvailableTags(itemTags);
  };

  return (
    <div className={`new-item-container ${open && "open"}`}>
      <div
        onClick={() => setOpen(true)}
        className={`placeholder ${open && "hidden"}`}
      >
        <span>+</span>
        Add new item
      </div>
      <Formik initialValues={initialValues} onSubmit={() => console.log("ö")}>
        {({ handleChange, values, resetForm }) => {
          const handleSublit = async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            await apiCall("post", "api/item/create", {...values, tags: activeTags});
            removeAllTags();
            resetForm();
            refetch();
            setOpen(false);
          };
          return (
            <form
              className={`${open && "open"}`}
              onSubmit={(e) => handleSublit(e)}
            >
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
                <div className="tags">
                  <p className="title">Tags</p>
                  <div className="active-tags">
                    {activeTags.length === 0 ? (
                      <p className="no-tags">Click tags to add to item</p>
                    ) : (
                      activeTags.map((tag) => (
                        <div onClick={()=>handleTag(tag)} className="tag active">{tag}</div>
                      ))
                    )}
                    {activeTags.length > 0 && (
                      <div onClick={removeAllTags} className="remove-all">
                        remove all
                      </div>
                    )}
                  </div>
                  <div className="available-tags">
                    {availableTags.map((tag) => (
                      <div onClick={() => handleTag(tag)} className="tag">
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="buttons">
                <button
                  onClick={handleCancel}
                  className="cancel"
                  type="submit"
                >
                  cancel
                </button>
                <button
                  className={`go ${isRefetching && "loading"}`}
                  type="submit"
                />
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default NewItem;

{
  /* <div className="row">
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
              </div> */
}
