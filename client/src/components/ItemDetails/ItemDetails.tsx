import { useState } from "react";
import { Formik } from "formik";
import { apiCall } from "../../utils/api";
import { itemTags } from "../../config";
import DetailsForm from "./DetailsForm";

interface Props {
  query: any;
  editItem: Item | null;
  setEditItem: React.Dispatch<React.SetStateAction<Item | null>>;
}

let initialValues = {
  title: "",
  description: "",
  link: "",
  imgLink: "",
  tags: [],
};

const ItemDetails = ({ query, editItem, setEditItem }: Props) => {
  const { refetch } = query;
  const [open, setOpen] = useState(false);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState(itemTags);

  const handleTag = (
    tag: string,
    obj: { available: string[]; active: string[] }
  ) => {
    if (obj) {
      setActiveTags([...obj.active]);
      setAvailableTags([...obj.available]);
    } else if (activeTags.includes(tag)) {
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

  const URL = editItem
  ? `api/item/edit/${editItem._id}`
  : "api/item/create";
  
  //@ts-ignore
  const handleSubmit = async (values, { resetForm }) => {
    await apiCall("post", URL, {
      ...values,
      tags: activeTags,
    });
    removeAllTags();
    refetch();
    resetForm();
    setOpen(false);
    setEditItem(null);
  }

  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={handleSubmit}>
      {(formikProps) => {
        return (
          <DetailsForm
            formikProps={formikProps}
            setEditItem={setEditItem}
            handleTag={handleTag}
            query={query}
            removeAllTags={removeAllTags}
            activeTags={activeTags}
            availableTags={availableTags}
            open={open}
            setOpen={setOpen}
            editItem={editItem}
          />
        );
      }}
    </Formik>
  );
};

export default ItemDetails;
