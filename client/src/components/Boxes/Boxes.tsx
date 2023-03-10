import "./Boxes.scss";
import ListItem from "./ListItem/ListItem";
import loader from "../../assets/loading_roller.svg";

interface Props {
  query: any;
  setEditItem: React.Dispatch<React.SetStateAction<Item | null>>;
  editItem: Item | null;
}

const Boxes = ({ query, setEditItem, editItem }: Props) => {
  const { error, data, isLoading } = query;
  
  return (
    <div className="boxes-container">
      <div className="tabs-bar">
        <div className="tabs">
          <div className="tab main">Main Box</div>
          <div className="tab new">+</div>
        </div>
      </div>
      <div className="list-container">
        <div className="header">
          <div className="title">Box Contents</div>
        </div>
        <div className="list">
          {isLoading ? (
            <div className="loading-container">
              <img src={loader} alt="spinner" />
              <h6>Loading list...</h6>
            </div>
          ) : error ? (
            <h6>ERROR</h6>
          ) : (
            data?.map((i: Item) => (
              <ListItem
                key={i._id}
                item={i}
                refetch={query.refetch}
                setEditItem={setEditItem}
                isEditing={editItem && editItem._id === i._id}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Boxes;
