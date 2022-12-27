import { useRef, useEffect, FormEvent } from "react";
import "./ItemDetails.scss";
import { FaRegEdit } from "react-icons/fa";
import { itemTags } from "../../config";

interface Props {
  values: any;
  handleSubmit: any;
  handleChange: any;
  handleTag: any;
  removeAllTags: any;
  query: any;
  availableTags: any;
  activeTags: any;
  setValues: any;
  setOpen: any;
  editItem: any;
  setEditItem: React.Dispatch<React.SetStateAction<Item | null>>;
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
  setEditItem,
  availableTags,
  activeTags,
  editItem,
  setValues,
  query,
}: Props) => {
  const { isRefetching, isLoading } = query;
  const titleRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (editItem) {
      setOpen(true);
      setValues(editItem);
      const available = itemTags.filter(i => editItem.tags.indexOf(i) === -1);
      handleTag('', { available, active: [...editItem.tags]})
    }
  }, [editItem]);
  
  const handleCancel = (e:any) => {
    e.preventDefault();
    console.log('cancel')
    setOpen(false);
    removeAllTags();
    setEditItem(null)
  };

  useEffect(() => {
    if(open) titleRef?.current?.focus();
  }, [open])

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
          <button onClick={e=>handleCancel(e)} className="cancel">
            cancel
          </button>
          <button className={`go ${isRefetching | isLoading && "loading"} ${editItem && "save"}`} type="submit" />
        </div>
      </form>
    </div>
  );
};

export default DetailsForm;
