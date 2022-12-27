import { useState, FormEvent } from "react";
import { Formik, useFormikContext } from "formik";
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

  const handleCancel = () => {
    setOpen(false);
    removeAllTags();
    setEditItem(null)
  };
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
    <Formik initialValues={initialValues} onSubmit={() => console.log("ö")}>
      {({ handleChange, values, resetForm, setValues }) => {
        const handleSublit = async (e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          await apiCall("post", "api/item/create", {
            ...values,
            tags: activeTags,
          });
          removeAllTags();
          resetForm();
          refetch();
          setOpen(false);
          setEditItem(null)
        };
        return (
          <DetailsForm
            values={values}
            handleCancel={handleCancel}
            handleChange={handleChange}
            handleSubmit={handleSublit}
            handleTag={handleTag}
            query={query}
            removeAllTags={removeAllTags}
            activeTags={activeTags}
            availableTags={availableTags}
            open={open}
            setOpen={setOpen}
            setValues={setValues}
            editItem={editItem}
          />
        );
      }}
    </Formik>
  );
};

export default ItemDetails;
