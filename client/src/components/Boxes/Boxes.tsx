import axios from 'axios'
import { useQuery } from 'react-query'
import './Boxes.scss'

const Boxes = () => {
    
    const getItems = async () => {
        const { data } = await axios.get('/api/item/get_all');
        console.log(data);
        return data
    }
    const { isLoading, error, data } = useQuery('items', getItems);
    

  return (
    <div className="boxes-container">
      <div className="tabs-bar">
        <div className="tabs">
          <div className="tab main">Main Box</div>
          <div className="tab new">+</div>
        </div>
          {/* <div className="new-item">Add new item <span>+</span></div> */}
      </div>
      <div className="list-container">
        <div className="header">
          <div className="title">Box Contents</div>
        </div>
        <div className="list">
          {isLoading ? (
            <h6>Loading...</h6>
          ) : error ? (
            <h6>ERROR</h6>
          ) : (
            data.map((i: any) => <div className="item">{i.title}</div>)
          )}
        </div>
      </div>
    </div>
  );
}

export default Boxes