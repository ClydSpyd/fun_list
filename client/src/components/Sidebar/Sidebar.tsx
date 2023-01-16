import { useState, useRef, useEffect } from "react";
import { useQuery } from "react-query";
import { filterItems } from "../../config";
import { useAuth } from "../../context/AuthContext";
import { apiCall } from "../../utils/api";
import { filterString } from "../../utils/filterStrings";
import { HiUser } from "react-icons/hi";
import { TiTick } from "react-icons/ti";
import { IoMdPricetag } from "react-icons/io";
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

  const doTheThing = (key: string, value: string | boolean | []) => {
    if(Array.isArray(value)){
      return setFilters({ ...filters, [key]: [] });
    }
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
        {users.data && filterItems().map((item, idx) => (
          <div key={idx} className="block">
            <div className="title-row">
            {idx === 0 ? <HiUser/> : idx === 1 ? <TiTick/> : <IoMdPricetag />}
            <p className="filter-title"> {item.title}</p>
            <div onClick={(e) => doTheThing(item.key, [])} className="clear-all">Clear all</div>
            </div>
            <div className={`radios ${item.className}`}>
              {item.values.map((value, idx) => (
                <div key={idx} onClick={(e) => doTheThing(item.key, value)} className="filter-row">
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
