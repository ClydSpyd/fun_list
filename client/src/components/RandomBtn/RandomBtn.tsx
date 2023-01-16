import { Dispatch, SetStateAction } from 'react';
import boxImage from '../../assets/mystery_box.png'
import './RandomBtn.scss'

interface Props {
  toggleModal: Dispatch<SetStateAction<boolean>>
}
const RandomBtn = ({ toggleModal }: Props) => {
  return (
    <div onClick={() => toggleModal(true)} className="button-container">
      <img src={boxImage} alt="box_image" />
    </div>
  );
}

export default RandomBtn