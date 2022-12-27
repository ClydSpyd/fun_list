import Boxes from '../../components/Boxes/Boxes';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import './Home.scss';
import { useItems } from './queries/useItems';
import { itemTags } from '../../config';
import ItemDetails from '../../components/ItemDetails/ItemDetails';

const Home = () => {
  const [ filters, setFilters ] = useState<ItemFilters>({submittedBy: ['Dave', 'Lina'], complete: [true, false], tags: itemTags})
  const [ editItem, setEditItem] = useState< null | Item>(null)
  const { isAuthenticated } = useAuth();
  const query = useItems(filters)

  return (
    <div className="home">
      <Sidebar query={query} filters={filters} setFilters={setFilters} />
      {isAuthenticated && (
        <div className="container">
          <ItemDetails query={query} editItem={editItem} />
          <Boxes query={query} setEditItem={setEditItem} />
        </div>
      )}
    </div>
  );
}

export default Home