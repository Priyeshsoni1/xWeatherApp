export const fetchWeather = async ({ city }) => {
  const apiKey = "2c7db425c64b49f8bd6185908240102";
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  try {
    const res = await fetch(url);

    if (!res.ok) throw new Error("Status Invalid");

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Failed to fetch weather data:", err);
    alert("Failed to fetch weather data");
    return {};
  }
};
