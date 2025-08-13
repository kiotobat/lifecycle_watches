import removeIcon from '../../assets/remove.svg';
import IWatch from '../../models/IWatch';
import './watchItem.css';

interface IWatchItemProps {
  obj: IWatch;
  time: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  onRemove: (watch: IWatch) => void;
}

const WatchItem = ({ obj, time, onRemove }: IWatchItemProps) => {
  const hoursDeg = (360 / 12) * ((time.hours + Number(obj.offset)) % 12);
  const minutesDeg = (360 / 60) * time.minutes;
  const secondsDeg = (360 / 60) * time.seconds;

  return (
    <li className="watch-item">
      <h5 className="watch-item__title">{obj.zone}</h5>
      <div className="watch-item__content">
        <span
          className="hour-arrow"
          style={{ transform: `rotate(${hoursDeg}deg)` }}
        ></span>
        <span
          className="minute-arrow"
          style={{ transform: `rotate(${minutesDeg}deg)` }}
        ></span>
        <span
          className="second-arrow"
          style={{ transform: `rotate(${secondsDeg}deg)` }}
        ></span>
      </div>
      <img
        className="watch-item__remove"
        src={removeIcon}
        alt="remove"
        onClick={() => onRemove(obj)}
      />
    </li>
  );
};

export default WatchItem;
