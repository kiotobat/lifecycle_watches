import { useState } from 'react';
import WatchForm from './components/WatchForm/WatchForm';
import WatchList from './components/WatchList/WatchList';
import IWatch from './models/IWatch';

const App = () => {
  const [form, setForm] = useState<IWatch>({ zone: '', offset: '' }); // данные из формы
  const [watches, setWatches] = useState<IWatch[]>([]); // все установленные часы
  const [tooltip, setTooltipText] = useState({zoneTooltip: '', offsetTooltip: ''}); // подсказка

  const handleChange = (newForm: IWatch) => {
    setForm(newForm); // актуализация полей формы
    setTooltipText({zoneTooltip: '', offsetTooltip: ''}); // убираем подсказки
  };

  const handleSubmit = (newForm: IWatch) => {
    if (newForm.zone === '') {
      setForm(newForm); // сброс невалидного инпута с городом
      setTooltipText({zoneTooltip: 'А это точно город?', offsetTooltip: ''}); // подсказка
      return;
    }

    if (newForm.offset === '') {
      setForm(newForm); // сброс невалидного инпута с часовым сдвигом
      setTooltipText({zoneTooltip: '', offsetTooltip: 'Введите число от 0 до 23'}); // подсказка
      return;
    }

    // если данные полей ввода валидны и полные:
    const exists = watches.find((el) => el.zone === newForm.zone);
    // если город уже есть:
    if (exists) {
      setForm({ zone: '', offset: '' }); // очистка полей формы
      setTooltipText({zoneTooltip: 'Город уже был добавлен', offsetTooltip: ''}); // подсказка
      return;
    }
    setWatches([...watches, newForm]); // актуализация массива с данными
    setForm({ zone: '', offset: '' }); // очистка полей формы
  };

  const handleRemove = (watch: IWatch) => {
    setWatches(watches.filter((el) => el.zone !== watch.zone)); // удаляем часы
  };

  return (
    <>
      <WatchForm
        form={form}
        tooltip={tooltip}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      {watches.length ? <WatchList watches={watches} onRemove={handleRemove} /> : null}
    </>
  );
};

export default App;
