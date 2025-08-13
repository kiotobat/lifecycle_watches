import Tooltip from '../Tooltip/Tooltip';
import IWatch from '../../models/IWatch';
import './watchForm.css';

interface IWatchFormProps {
  form: IWatch;
  onChange: (newForm: IWatch) => void;
  onSubmit: (newForm: IWatch) => void;
  tooltip: {
    zoneTooltip: string;
    offsetTooltip: string;
  }
}

const WatchForm = ({ form, tooltip, onChange, onSubmit }: IWatchFormProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newForm = { ...form, [name]: value };
    onChange(newForm);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validateForm(); // валидация формы и отправка данных наверх в App
  };

  const validateForm = () => {
    // 1. проверка города:
    const trimmedZone = form.zone.trim();
    if (!trimmedZone || !trimmedZone.match(/^[а-яa-z][а-яa-z -]*[а-яa-z]$/i)) {
      onSubmit({ ...form, zone: '' }); // сброс инпута с городом
      return;
    }

    // 2. проверка часового сдвига:
    const trimmedOffset = form.offset.trim();
    if (
      !trimmedOffset ||
      isNaN(Number(trimmedOffset)) ||
      Number(trimmedOffset) < 0 ||
      Number(trimmedOffset) > 23
    ) {
      onSubmit({ ...form, offset: '' }); // сброс инпута с часовым сдвигом
      return;
    }

    // первые буквы города делаем заглавными (Санкт-Петербург, Нижний Новгород):
    const fixedZone = trimmedZone
      .split(/[-]/)
      .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
      .join('-')
      .split(/[ ]/)
      .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
      .join(' ');

    onSubmit({ zone: fixedZone, offset: trimmedOffset }); // отправка данных формы наверх в App
  };

  return (
    <form className="watch-form" onSubmit={handleSubmit}>
      <div className="watch-form__column">
        <label htmlFor="zone" className="watch-form__zone-label">
          Название
        </label>
        <input
          id="zone"
          className="watch-form__zone-input"
          type="text"
          required
          placeholder="город"
          name="zone"
          value={form.zone}
          onChange={handleChange}
        />
        {tooltip.zoneTooltip && <Tooltip text={tooltip.zoneTooltip} />}
      </div>

      <div className="watch-form__column">
        <label htmlFor="offset" className="watch-form__offset-label">
          Временная зона
        </label>
        <input
          id="offset"
          className="watch-form__offset-input"
          type="text"
          required
          placeholder="сдвиг в часах"
          name="offset"
          value={form.offset}
          onChange={handleChange}
        />
        {tooltip.offsetTooltip && <Tooltip text={tooltip.offsetTooltip} />}
      </div>

      <button className="watch-form__button" type="submit">
        Добавить
      </button>
    </form>
  );
};

export default WatchForm;
