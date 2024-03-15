import React, { useState, useEffect } from 'react';
import getTodayPicture from './nasa';
import './styles.css';

function App() {
  const [imageData, setImageData] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [error, setError] = useState(null);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const fetchImageData = async (date) => {
    try {
      const data = await getTodayPicture(date);
      setImageData(data);
      setError(null); 
    } catch (error) {
      console.error('Error fetching image data:', error);
      setError('Aucune image trouvée pour cette date.');
      setImageData(null); 
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchImageData(selectedDate);
  };

  useEffect(() => {
   
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
    fetchImageData(today);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Voici la photo du jour :
        </p>
        <form onSubmit={handleSubmit}>
          <input 
            type="date" 
            value={selectedDate} 
            onChange={handleDateChange} 
          />
          <button type="submit">Choisir une date</button>
        </form>
        {error && <p>{error}</p>} {}
        {imageData && !error && ( 
          <div>
            <h2>{imageData.title}</h2>
            <img src={imageData.url} alt={imageData.title} />
            <p>{imageData.explanation}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
