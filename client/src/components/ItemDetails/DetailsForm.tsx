import { useRef, useEffect } from "react";
import "./ItemDetails.scss";
import { FaRegEdit } from "react-icons/fa";

interface Props {
  values: any;
  handleSubmit: any;
  handleChange: any;
  handleTag: any;
  removeAllTags: any;
  handleCancel: any;
  query: any;
  availableTags: any;
  activeTags: any;
  setValues: any;
  setOpen: any;
  editItem: any;
  open: boolean;
}

const DetailsForm = ({
  open,
  setOpen,
  values,
  handleSubmit,
  handleChange,
  handleTag,
  removeAllTags,
  handleCancel,
  availableTags,
  activeTags,
  editItem,
  setValues,
  query,
}: Props) => {
  const { isRefetching } = query;
  const titleRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    console.log(editItem);
    if (editItem) {
      setOpen(true);
      setValues(editItem);
    }
  }, [editItem]);

  return (
    <div
      className={`new-item-container ${open && "open"} ${
        editItem && "editing"
      }`}
    >
      <div
        onClick={() => setOpen(true)}
        className={`placeholder ${open && "hidden"}`}
      >
        <span>+</span>
        Add new item
      </div>
      <div className="editing">
        <h4>Editing</h4>
        <FaRegEdit />
      </div>
      <form className={`${open && "open"}`} onSubmit={(e) => handleSubmit(e)}>
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
                activeTags.map((tag: string) => (
                  <div onClick={() => handleTag(tag)} className="tag active">
                    {tag}
                  </div>
                ))
              )}
              {activeTags.length > 0 && (
                <div onClick={removeAllTags} className="remove-all">
                  remove all
                </div>
              )}
            </div>
            <div className="available-tags">
              {availableTags.map((tag: string) => (
                <div onClick={() => handleTag(tag)} className="tag">
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="buttons">
          <button onClick={handleCancel} className="cancel" type="submit">
            cancel
          </button>
          <button className={`go ${isRefetching && "loading"}`} type="submit" />
        </div>
      </form>
    </div>
  );
};

export default DetailsForm;
