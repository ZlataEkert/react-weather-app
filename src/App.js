import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ImSpinner9 } from "react-icons/im";
import { IoMdSearch } from "react-icons/io";
import { BsWater, BsClouds, BsThermometer, BsWind } from "react-icons/bs";

const App = () => {
  const APIkey = "f4adf741a7b362beb26a9614ee5d1025";
  const [data, setData] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [errorMsg, setErrorMsg] = useState({ value: "", type: "local" });
  const inputRef = useRef(null);

  const fetchData = async (location = "Kyiv") => {
    setLoading(true);

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;
      const res = await axios.get(url);
      inputRef.current.value = "";
      setTimeout(() => {
        setData(res.data);
        setLoading(false);
      }, 500);
    } catch (e) {
      setLoading(false);
      setErrorMsg({ value: e.response.data.message, type: "remote" });
      // inputRef.current.value = "";
    } finally {
      inputRef.current.focus();
    }
  };

  // Fetch the data
  useEffect(() => {
    fetchData().then(() => {
      console.log("Data fetched successfully!");
    });
  }, []);

  // Error message
  useEffect(() => {
    const timer = setTimeout(() => {
      if (errorMsg.type === "remote") {
        setErrorMsg({ value: "", type: "local" });
      }
    }, 3000);

    //  Clear timer
    return () => clearTimeout(timer);
  }, [errorMsg]);

  const handleInput = (e) => {
    const reg = /^[a-zA-Z]+$/;
    if (reg.test(e.target.value)) {
      setInputValue(e.target.value);
      setErrorMsg({ value: "", type: "local" });
    } else {
      setInputValue("");
      setErrorMsg({ value: "Enter correct city or country", type: "local" });
    }
  };

  const handleSubmit = (e) => {
    console.log("handleSubmit");
    // if input is not empty
    if (inputValue !== "") {
      fetchData(inputValue);
    }

    // if input value is empty
    if (inputRef.current.value === "") {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 500);
    } else {
      // Clear input
      if (errorMsg.type !== "local") {
        // inputRef.current.value = "";
        // setInputValue("");
        inputRef.current.focus();
      }
    }

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
      {errorMsg.value && (
        <div className="w-full max-w-[450px] lg:max-w-[450px] bg-[#db2777] text-white absolute top-2 lg:top-2 p-4 capitalize backdrop-blur-[32px] rounded-[32px]">{`${errorMsg.value}`}</div>
      )}
      <form
        className={`${animate ? "animate-shake" : "animate-none"} h-16 bg-black/40 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-8`}
      >
        <div className="h-full relative flex items-center justify-between p-2">
          <input
            className="flex-1 bg-transparent outline-none placeholder:text-white text-white text-[17px] font-light pl-6 h-full"
            type="text"
            ref={inputRef}
            placeholder="Search by city or country..."
            onChange={(e) => handleInput(e)}
          />
          <button
            className="bg-[#db2777] hover:bg-[#be185d] w-20 h-12 rounded-full flex justify-center items-center transition"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            <IoMdSearch className="text-2xl text-white" />
          </button>
        </div>
      </form>
      {/*  card */}
      <div className="w-full max-w-[450px] bg-black/40 min-h-[450px] text-white backdrop-blur-[32px] rounded-[32px] py-2 px-8">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <ImSpinner9 className="text-white text-6xl animate-spin" />
          </div>
        ) : (
          data && (
            <div>
              {/*  card top */}
              <div className="flex items-center gap-x-6">
                <div>
                  <img
                    src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                    alt="icon-weather"
                  />
                </div>
                <div>
                  {/*  country name */}
                  <div className="text-3xl font-semibold py-2">
                    {data.name}, {data.sys.country}
                  </div>
                  {/* date */}
                  <div>{dateBuilder(new Date())}</div>
                </div>
              </div>

              {/*  card body */}
              <div className="my-15">
                <div className="flex justify-center items-center">
                  {/* temp */}
                  <div className="text-center text-[90px] leading-none py-10">{`${data.main.temp.toFixed()}℃`}</div>
                </div>
                {/*  weather desc*/}
                <div className="capitalize text-center">
                  {data.weather[0].description}
                </div>
              </div>
              {/*  card bottom */}
              <div className="max-w-[378px] mx-auto flex flex-col gap-y-4 py-8">
                <div className="flex justify-between">
                  <div className="flex items-center gap-x-2">
                    {/*  icon */}
                    <div>
                      <BsClouds />
                    </div>
                    <div>
                      Cloudiness{" "}
                      <span className="ml-2">{data.clouds.all} %</span>
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
