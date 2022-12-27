import { useState, useRef, useEffect } from "react";
import { filterItems } from "../../config";
import { useAuth } from "../../context/AuthContext";
import "./Sidebar.scss";

type Props = {
  query: any;
  filters: ItemFilters;
  setFilters: React.Dispatch<React.SetStateAction<ItemFilters>>;
};

const Sidebar = ({ query, filters, setFilters }: Props) => {
  const [sidebarOpen, toggleSidebar] = useState(true);
  const sidebarRef = useRef(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    toggleSidebar(isAuthenticated);
  }, [isAuthenticated]);
  const doTheThing = (e: any) => {
    let newValue;
    if (filters.submittedBy.includes(e?.target?.value)) {
      newValue = filters.submittedBy.filter((i) => i !== e.target.value);
    } else {
      newValue = [...filters.submittedBy, e.target.value];
    }
    setFilters({ ...filters, submittedBy: newValue });
  };

  return (
    <div ref={sidebarRef} className={`sidebar ${sidebarOpen && "open"}`}>
      <div
        className={`handle ${sidebarOpen && "open"}`}
        onClick={() => toggleSidebar(!sidebarOpen)}
      >
        {`>`}
      </div>
      <div className="inner">
        <h5 className="title">Filter Items</h5>
        {filterItems(query.data).map((item) => (
          <div className="block">
            <p className="filter-title">{item.title}</p>
            <div className={`radios ${item.className}`}>
              {item.values.map((value) => (
                <label>
                  <>
                    {String(value)}
                    <input
                      onClick={(e) => doTheThing(e)}
                      type="checkbox"
                      name="submittedBy"
                      value={String(value)}
                      checked={filters['submittedBy'].includes(value)}
                    />
                  </>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
{
  /* <div className="submittedBy">
<label>
  Dave
  <input
    onClick={(e) => doTheThing(e)}
    type="checkbox"
    name="submittedBy"
    value={"Dave"}
    checked={filters.submittedBy.includes("Dave")}
  />
</label>
<label>
  Lina
  <input
    onClick={(e) => doTheThing(e)}
    type="checkbox"
    name="submittedBy"
    value={"Lina"}
    checked={filters.submittedBy.includes("Lina")}
  />
</label>
</div> */
}


// let newValue;
// if (filters.submittedBy.includes(e?.target?.value)) {
//   newValue = filters.submittedBy.filter((i) => i !== e.target.value);
// } else {
//   newValue = [...filters.submittedBy, e.target.value];
// }
// setFilters({ ...filters, submittedBy: newValue });