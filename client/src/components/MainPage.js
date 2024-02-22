import { useEffect, useState } from "react";

const MainPage = () => {
  const NASA_API = `https://api.nasa.gov/planetary/apod?api_key=veGZGixyQs8IufJFiv4riab2aYO4Xb6ido76D1vk`;
  const [nasaData, setNasaData] = useState(null);

  useEffect(() => {
    const fetchNasaApi = async () => {
      try {
        const response = await fetch(NASA_API);
        const data = await response.json();
        setNasaData(data); 
        console.log(data); 
      } catch (error) {
        console.error('Error fetching NASA API:', error);
      }
    };
    fetchNasaApi();
  },[]); 


  return (
    <div>
      <h1>Welcome!</h1>
      {nasaData && (
        <div>
          <h2>{nasaData.title}</h2>
          <img src={nasaData.url} alt={nasaData.title} />
          <p>{nasaData.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default MainPage;
