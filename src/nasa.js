async function getTodayPicture(date) {
  const apiKey = 'DgIWk9wy2hytPi1dEhU9o3Zu6uLd1YYPMJhIpCmi';
  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch image data');
  }
  return await response.json();
}

export default getTodayPicture;
