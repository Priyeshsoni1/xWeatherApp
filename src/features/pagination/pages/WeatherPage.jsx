import React, { useState } from "react";
import { fetchWeather } from "../server/Fetcher";

const WeatherPage = () => {
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState([]);
  const fetchData = async (city) => {
    setLoading(true);
    const data = await fetchWeather({ city });

    if (Object.keys(data).length !== 0) {
      setReportData([
        { title: "Temperature", value: `${data.current.temp_c} °C` },
        { title: "Humidity", value: `${data.current.humidity} %` },
        { title: "Condition", value: `${data.current.condition.text} ` },
        { title: "Wind Speed", value: `${data.current.wind_kph} kph` },
      ]);
    } else {
      setReportData([]);
    }

    setLoading(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const formData = form.entries().reduce((acc, [key, value]) => {
      return { ...acc, [key]: value };
    }, {});

    fetchData(formData.city);
  };
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input placeholder="Enter City" name="city" type="text" />
        <button type="search">Search</button>
      </form>
      {loading && <p>Loading data...</p>}
      {reportData.length > 0 && !loading && (
        <div
          className="weather-cards"
          style={{
            width: "60%",
            alignContent: "center",
            alignItems: "center", // correct spelling
            display: "flex",
            flexDirection: "row", // correct prop name

            justifyContent: "space-between",
            margin: "2rem auto",
          }}
        >
          {reportData.map((item, index) => {
            return (
              <div key={index} className="weather-card">
                <div>{item.title}</div>
                <div>{item.value}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WeatherPage;
