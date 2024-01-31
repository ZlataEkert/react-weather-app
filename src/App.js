import { useState, useEffect } from "react";
import axios from "axios";
import { ImSpinner9 } from "react-icons/im";

const App = () => {
  const APIkey = "f4adf741a7b362beb26a9614ee5d1025";
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Kyiv");
  const [loading, setLoading] = useState(false);

  // Fetch the data
  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIkey}&units=metric`;
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setLoading(false);
      });
  }, [location]);

  console.log(data);

  return (
    <div className="container">
      <input className="input font-bold" placeholder="Enter City..." />
      <div className="text-3xl">
        Weather
        {loading ? (
          <ImSpinner9 className="text-9xl right-4 animate-spin" />
        ) : (
          data && (
            <>
              <div>City: {data.name}</div>
              <div>Weather: {`${data.main.temp.toFixed()}℃`}</div>
              <img
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt="ddd"
              />
            </>
          )
        )}
        <div></div>
      </div>
    </div>
  );
};

export default App;
