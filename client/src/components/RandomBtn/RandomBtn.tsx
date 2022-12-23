import boxImage from '../../assets/mystery_box.png'
import './RandomBtn.scss'

const RandomBtn = () => {
  return (
    <div className="button-container">
      <img src={boxImage} alt="box_image" />
    </div>
  );
}

export default RandomBtn