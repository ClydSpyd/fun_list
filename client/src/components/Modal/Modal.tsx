import { useState, useRef, useCallback, LegacyRef } from "react";
import "./Modal.scss";
import { Dispatch, SetStateAction } from "react";
import ListItem from "../Boxes/ListItem/ListItem";
import { AiFillCloseCircle } from "react-icons/ai";
import starMusic from "../../assets/sounds/mario_kart_star_powerup.mp3";
import endMusic from "../../assets/sounds/mario_kart_end.mp3";
import boxImage from "../../assets/mystery_box.png";

type RandomizeState = 'pre' | 'running' | 'post';
interface Props {
  toggleModal: Dispatch<SetStateAction<boolean>>;
  items: Item[];
}
const getRandomIdx = (current: number, items: Item[]): number => {
  const idx = Math.floor(Math.random() * items?.length);
  if (idx !== current) return idx;
  return getRandomIdx(current, items);
};

const Modal = ({ toggleModal, items }: Props) => {
  const [activeIdx, setActiveIdx] = useState<number>(getRandomIdx(0, items));
  const [ randomizeState, setRandomizeState ] = useState<RandomizeState>('pre')
  const audioRef = useRef<any>();
  const endRef = useRef<any>();

  const changeItem = useCallback(() => {
    setActiveIdx(getRandomIdx(activeIdx, items));
  }, [activeIdx]);

  const startRandomizer = () => {
    setRandomizeState('running')
    const interval = setInterval(changeItem, 100);
    audioRef.current && audioRef.current.play();
    setTimeout(() => {
      clearInterval(interval);
      audioRef.current && audioRef.current.pause();
      endRef.current && endRef.current.play();
      setRandomizeState('post')
    }, 7000);
  };

  const closeModal = () => {
    toggleModal(false);
    audioRef.current && audioRef.current.pause();
  };

  return (
    <div className="modal-container">
      <div className={`modal-content ${randomizeState !== 'pre' && "grad-fade"}`}>
        <audio ref={audioRef} src={starMusic} />
        <audio ref={endRef} src={endMusic} />
        <div className="close" onClick={closeModal}>
          <AiFillCloseCircle />
        </div>
        {randomizeState === 'pre' ? (
          <div onClick={startRandomizer} className="go-btn">
            <img src={boxImage} alt="dice"/>
            <h2>Randomize</h2>
          </div>
        ) : (
          <div className={`item-container ${randomizeState === 'post' && 'pulse'}`}>
            <ListItem
              key={items[activeIdx]._id}
              item={items[activeIdx]}
              readOnly
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
