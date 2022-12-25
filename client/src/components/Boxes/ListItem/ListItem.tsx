import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { MdOutlineDeleteForever } from "react-icons/md";
import { RiErrorWarningFill } from "react-icons/ri";
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import { FaRegEdit } from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";
import axios from "axios";
import { useRef, useState } from "react";
import { useOutsideClick } from "../../../utils/hooks/useOutsideClick";
import spinner from "../../../assets/loading_roller.svg";

type Props = {
  item: Item;
  query: any;
};

const ListItem = ({ item, query }: Props) => {
  const [deleteState, setDeleteState] = useState(false);
  const [loading, toggleLoading] = useState(false);
  const confRef = useRef<HTMLDivElement>(null);
  const { userId } = useAuth();
  const isMine = userId === item.submittedBy._id;
  const { refetch } = query;

  const handleDelete = async () => {
    toggleLoading(true)
    await axios.post("/api/item/delete", {
      id: item._id,
    });
    refetch();
  };

  useOutsideClick(confRef, () => {
    if (deleteState) setDeleteState(false);
  });

  return (
    <div className={`item ${isMine && "isMine"}`}>
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
        <GiPerspectiveDiceSixFacesRandom color="#F58634" />
        <h4>{item.title}</h4>
      </div>
      <div className="right">
        {userId === item.submittedBy._id && (
          <div className="user-btns">
            <div className="action-btn edit">
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
    </div>
  );
};

export default ListItem;
