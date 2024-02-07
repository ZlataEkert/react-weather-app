import { useState, useEffect } from "react";
import axios from "axios";
import { ImSpinner9 } from "react-icons/im";
import { IoMdSearch } from "react-icons/io";
import { BsWater, BsEye, BsThermometer, BsWind } from "react-icons/bs";

const App = () => {
  const APIkey = "f4adf741a7b362beb26a9614ee5d1025";
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Kyiv");
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch the data
  useEffect(() => {
    setLoading(true);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;
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

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    // if input is not empty
    if (inputValue !== "") {
      setLocation(inputValue);
    }

    // select input
    const input = document.querySelector("input");
    // clear input
    input.value = "";

    e.preventDefault();
  };

  // Get a date
  const dateBuilder = (timestamp) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const day = days[timestamp.getDay()];
    const date = timestamp.getDate();
    const month = months[timestamp.getMonth()];
    const year = timestamp.getFullYear();
    const hours = timestamp.getHours();
    let minutes = timestamp.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    return `${day} ${date} ${month} ${year} ${hours}:${minutes}`;
  };

  return (
    <div className="w-full h-screen bg-gradient-to-b from-purple-900 to-blue-500 bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0">
      {/*{errorMsg && <div>{`${errorMsg.res.data.message}`}</div>}*/}
      <form className="h-16 bg-black/40 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-8">
        <div className="h-full relative flex items-center justify-between p-2">
          <input
            className="flex-1 bg-transparent outline-none placeholder:text-white text-white text-[17px] font-light pl-6 h-full"
            type="text"
            placeholder="Enter City..."
            onChange={(e) => handleInput(e)}
          />
          <button
            className="bg-[#db2777] hover:bg-[#be185d] w-20 h-12 rounded-full flex justify-center items-center transition"
            onClick={(e) => handleSubmit(e)}
          >
            <IoMdSearch className="text-2xl text-white" />
          </button>
        </div>
      </form>
      {/*  card */}
      <div className="w-full max-w-[450px] bg-black/40 min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <ImSpinner9 className="text-white text-6xl animate-spin" />
          </div>
        ) : (
          data && (
            <div>
              {/*  card top */}
              <div className="flex items-center gap-x-5">
                {data && (
                  <div>
                    <img
                      src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                      alt="icon-weather"
                    />
                  </div>
                )}
                <div>
                  {/*  country name */}
                  <div className="text-3xl font-semibold">
                    {data.name}, {data.sys.country}
                  </div>
                  {/* date */}
                  <div>{dateBuilder(new Date())}</div>
                </div>
              </div>

              {/*  card body */}
              <div className="my-20">
                <div className="flex justify-center items-center">
                  {/* temp */}
                  <div className="text-center text-[100px] leading-none">{`${data.main.temp.toFixed()}℃`}</div>
                </div>
                {/*  weather desc*/}
                <div className="capitalize text-center py-5">
                  {data.weather[0].description}
                </div>
              </div>
              {/*  card bottom */}
              <div className="max-w-[378px] mx-auto flex flex-col gap-y-6">
                <div className="flex justify-between">
                  <div className="flex items-center gap-x-2">
                    {/*  icon */}
                    <div>
                      <BsEye />
                    </div>
                    <div>
                      Visibility{" "}
                      <span className="ml-2">{data.visibility / 1000} km</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-2">
                    {/*  icon */}
                    <div>
                      <BsThermometer />
                    </div>
                    <div className="flex">
                      Feels like{" "}
                      <span className="flex ml-2">
                        {data.main.feels_like.toFixed(0)} °C
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center gap-x-2">
                    {/*  icon */}
                    <div>
                      <BsWater />
                    </div>
                    <div>
                      Humidity{" "}
                      <span className="ml-2">{data.main.humidity} %</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-2">
                    {/*  icon */}
                    <div>
                      <BsWind />
                    </div>
                    <div className="flex">
                      Wind{" "}
                      <span className="flex ml-2">
                        {data.wind.speed.toFixed(1)} m/s
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default App;
