import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { MdOutlineDeleteForever } from "react-icons/md";
import { RiErrorWarningFill } from "react-icons/ri";
import { ImCross } from "react-icons/im";
import { IoMdPricetag } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import { FaRegEdit } from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";
import { useRef, useState } from "react";
import { useOutsideClick } from "../../../utils/hooks/useOutsideClick";
import spinner from "../../../assets/loading_roller.svg";
import { apiCall } from "../../../utils/api";
import './ListItem.scss';

type Props = {
  item: Item;
  refetch?: any;
  setEditItem?: React.Dispatch<React.SetStateAction<Item | null>>;
  isEditing?: boolean | null;
  readOnly?: boolean;
};

type TagsProps = {
  item: Item;
}

const Tags = ({ item }: TagsProps) => {
  return (
    <div className="tags">
      {item.tags.map((tag) => (
        <div className={"tag"}>
          <IoMdPricetag /> {tag}
        </div>
      ))}
    </div>
  );
}

const ListItem = ({ item, refetch, setEditItem, isEditing, readOnly }: Props) => {
  const [deleteState, setDeleteState] = useState(false);
  const [loading, toggleLoading] = useState(false);
  const confRef = useRef<HTMLDivElement>(null);
  const { userId } = useAuth();
  const isMine = userId === item.submittedBy._id;
  const complete = item.complete;

  const handleDelete = async () => {
    toggleLoading(true);
    await apiCall("post", `api/item/delete`, {
      id: item._id,
    });
    refetch();
  };

  useOutsideClick(confRef, () => {
    if (deleteState) setDeleteState(false);
  });

  return (
    <div
      className={`item ${isMine && "isMine"} ${complete && "complete"} ${
        isEditing && "editing"
      } ${readOnly && "readOnly"}`}
    >
      <div className="complete-tick">
        <TiTick />
      </div>
      <div
        ref={confRef}
        className={`confirm-delete ${deleteState && "visible"}`}
      >
        <div className="warning">
          <RiErrorWarningFill />
          <h2>Delete this item</h2>
        </div>
        <div className="conf">
          {!loading ? (
            <>
              <p>Are you sure?</p>
              <div className="conf-btns">
                <div onClick={() => setDeleteState(false)} className="btn no">
                  <ImCross />
                </div>
                <div onClick={handleDelete} className="btn yes">
                  <TiTick />
                </div>
              </div>
            </>
          ) : (
            <img className="spinner" src={spinner} alt="spinner" />
          )}
        </div>
      </div>
      <div className="left">
        {!readOnly ? (
          <GiPerspectiveDiceSixFacesRandom color="#F58634" />
        ) : (
          <img src={item.submittedBy.avatar} alt="" />
        )}
        <h4>{item.title}</h4>
        {!readOnly && <Tags item={item} />}
      </div>
      {!readOnly && (
        <div className="right">
          {userId === item.submittedBy._id && !readOnly && (
            <div className="user-btns">
              <div
                onClick={() => setEditItem && setEditItem(item)}
                className="action-btn edit"
              >
                <FaRegEdit />
              </div>
              <div
                onClick={() => setDeleteState(true)}
                className="action-btn delete"
              >
                <MdOutlineDeleteForever />
              </div>
            </div>
          )}
          <img src={item.submittedBy.avatar} alt="" />
        </div>
      )}
      {
        readOnly &&
          <div className="bottom">
            <Tags item={item} />
          </div>
      }
    </div>
  );
};

export default ListItem;
