import { useEffect, useRef, useState } from 'react';
import { getAllDiaries, createDiaryEntry } from './services/diaryService';
import { DiaryEntry, Visibility, Weather } from './types';
import axios from 'axios';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<Weather>(Weather.NotSet);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.NotSet);
  const [comment, setComment] = useState('');
  const [error, setError] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    getAllDiaries().then((data) => setDiaries(data));
  }, []);

  const createEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createDiaryEntry({
      date,
      visibility,
      weather,
      comment,
    })
      .then((newDiary) => setDiaries(diaries.concat(newDiary)))
      .catch((error: unknown) => {
        if (axios.isAxiosError(error)) {
          const errMsg = `Incorrect ${error.response?.data.error[0].path[0]}: ${error.response?.data.error[0].received}`;

          setError(errMsg);

          setTimeout(() => {
            setError(null);
          }, 10000);
        } else {
          console.log(error);
        }
      });

    setDate('');
    setComment('');
    setVisibility(Visibility.NotSet);
    setWeather(Weather.NotSet);

    formRef.current?.reset();
  };

  return (
    <>
      <h2>Add new entry</h2>
      {error && (
        <div style={{ color: 'red', marginBottom: '20px' }}>Error: {error}</div>
      )}

      <form ref={formRef} onSubmit={createEntry}>
        <div>
          date{' '}
          <input
            type='date'
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          visibility: great
          <input
            type='radio'
            name='visibility'
            onChange={() => setVisibility(Visibility.Great)}
          />
          good
          <input
            type='radio'
            name='visibility'
            onChange={() => setVisibility(Visibility.Good)}
          />
          ok
          <input
            type='radio'
            name='visibility'
            onChange={() => setVisibility(Visibility.Ok)}
          />
          poor
          <input
            type='radio'
            name='visibility'
            onChange={() => setVisibility(Visibility.Poor)}
          />
        </div>
        <div>
          weather: sunny
          <input
            type='radio'
            name='weather'
            onChange={() => setWeather(Weather.Sunny)}
          />
          rainy
          <input
            type='radio'
            name='weather'
            onChange={() => setWeather(Weather.Rainy)}
          />
          cloudy
          <input
            type='radio'
            name='weather'
            onChange={() => setWeather(Weather.Cloudy)}
          />
          stormy
          <input
            type='radio'
            name='weather'
            onChange={() => setWeather(Weather.Stormy)}
          />
          windy
          <input
            type='radio'
            name='weather'
            onChange={() => setWeather(Weather.Windy)}
          />
        </div>
        <div>
          comment{' '}
          <input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button type='submit'>add</button>
      </form>
      <h2>Diary entries</h2>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <div>
            visibility: {diary.visibility}
            <br />
            weather: {diary.weather}
          </div>
        </div>
      ))}
    </>
  );
};

export default App;
