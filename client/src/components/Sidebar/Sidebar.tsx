import { useState, useRef, useEffect } from "react";
import { useQuery } from "react-query";
import { filterItems } from "../../config";
import { useAuth } from "../../context/AuthContext";
import { apiCall } from "../../utils/api";
import { filterString } from "../../utils/filterStrings";
import { HiUser } from "react-icons/hi";
import "./Sidebar.scss";
import { filterCategoryItem } from "../../utils/filterCategoryIcon";

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

  const doTheThing = (key: string, value: string | boolean) => {
    let newValue;
    if (filters[key].includes(value)) {
      newValue = filters[key].filter((i:any) => i !== value);
    } else {
      newValue = [...filters[key], value];
    }
    setFilters({ ...filters, [key]: newValue });
  };
  
  const users = useQuery('users', async () => {
    const { data } = await apiCall('get', `api/user/get_all`);
    return data
  })

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
        {users.data && filterItems().map((item) => (
          <div className="block">
            <>
            {filterCategoryItem('user')}
            <p className="filter-title"> {item.title}</p>
            </>
            <div className={`radios ${item.className}`}>
              {item.values.map((value) => (
                <div onClick={(e) => doTheThing(item.key, value)} className="filter-row">
                  <p>{filterString(String(value))}</p>
                  <div className={`checkbox ${filters[item.key].includes(value) && 'checked'}`}></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;