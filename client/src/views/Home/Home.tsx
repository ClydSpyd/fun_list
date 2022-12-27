import Boxes from '../../components/Boxes/Boxes';
import NewItem from '../../components/NewItem/NewItem';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import './Home.scss';
import { useItems } from './queries/useItems';

const Home = () => {
  const [ filters, setFilters ] = useState<ItemFilters>({submittedBy: ['Dave', 'Lina'], complete: [true, false]})
  const { isAuthenticated } = useAuth();
  const query = useItems(filters)

  return (
    <div className="home">
      <Sidebar query={query} filters={filters} setFilters={setFilters} />
      {isAuthenticated && (
        <div className="container">
          <NewItem query={query} />
          <Boxes query={query} />
        </div>
      )}
    </div>
  );
}

export default Home