import { useState } from "react";
import { itemTags } from "../../config";
import { useAuth } from "../../context/AuthContext";
import { useItems } from "../../utils/queries/useItems";
import Boxes from "../Boxes/Boxes";
import ItemDetails from "../ItemDetails/ItemDetails";
import Modal from "../Modal/Modal";
import NavBar from "../NavBar/NavBar";
import RandomBtn from "../RandomBtn/RandomBtn";
import Sidebar from "../Sidebar/Sidebar";
import "./AppMain.scss";

const AppMain = () => {
  const [filters, setFilters] = useState<ItemFilters>({
    submittedBy: ["Dave", "Lina"],
    complete: [true, false],
    tags: itemTags,
  });
  const [viewModal, toggleModal] = useState(true);
  const [editItem, setEditItem] = useState<null | Item>(null);
  const query = useItems(filters);
  const { isAuthenticated } = useAuth();

  return (
    <div className={`app-main ${isAuthenticated && "loggedIn"}`}>
      <NavBar />

      <div className="app-inner">
        <Sidebar query={query} filters={filters} setFilters={setFilters} />
        {isAuthenticated && (
          <div className="container">
            <ItemDetails
              query={query}
              editItem={editItem}
              setEditItem={setEditItem}
            />
            <Boxes
              query={query}
              setEditItem={setEditItem}
              editItem={editItem}
            />
          </div>
        )}
      </div>
      {!viewModal ? (
        <RandomBtn toggleModal={toggleModal} />
      ) : (
        query.data && <Modal toggleModal={toggleModal} items={query.data} />
      )}
    </div>
  );
};

export default AppMain;
