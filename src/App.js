import { useState, useEffect } from "react";
import axios from "axios";
import { ImSpinner9 } from "react-icons/im";
import { IoMdSearch } from "react-icons/io";

const App = () => {
  const APIkey = "f4adf741a7b362beb26a9614ee5d1025";
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Kyiv");
  const [loading, setLoading] = useState(false);
  const [inputCity, setInputCity] = useState("");

  // Fetch the data
  useEffect(() => {
    if (location.trim() === "") {
      // If location is empty
      return;
    }

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

  // Handle input change
  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    // Restrict special characters
    const filteredInput = inputValue.replace(/^[a-zA-Z][a-zA-Z\s-]*$/);
    setInputCity(filteredInput);
  };

  // Handle search button click
  const handleSearch = () => {
    if (inputCity.trim() !== "") {
      setLocation(inputCity);
    }
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
    <div className="w-full h-screen bg-gradient-to-r from-purple-500 to-transparent bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0">
      <form
        className="h-16 bg-black/40 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-8"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <div
          className={`h-full relative flex items-center justify-between p-2`}
        >
          <input
            className="flex-1 bg-transparent outline-none placeholder:text-white text-white text-[17px] font-light pl-6 h-full"
            placeholder="Enter City..."
            value={inputCity}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSearch();
              }
            }}
          />
          <button
            className="bg-[#db2777] hover:bg-[#be185d] w-20 h-12 rounded-full flex justify-center items-center transition"
            disabled={inputCity.trim() === ""}
            onClick={handleSearch}
          >
            <IoMdSearch className="text-2xl text-white" />
          </button>
        </div>
      </form>

      {/*  card  */}
      <div className="w-full max-w-[450px] bg-black/40 min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6">
        <div>
          {/* card top */}
          <div>
            {/* icon */}
            {data && (
              <div>
                <img
                  src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                  alt="icon-weather"
                />
                {/* city & country name */}
                <div>
                  <div className="text-3xl font-semibold">
                    {data.name}, {data.sys.country}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="text-3xl">{dateBuilder(new Date())}</div>
        {loading ? (
          <ImSpinner9 className="text-9xl right-4 animate-spin" />
        ) : (
          data && (
            <>
              <div className="text-center text-[100px] leading-none">{`${data.main.temp.toFixed()}℃`}</div>
              <div className="capitalize text-center py-5">
                {data.weather[0].description}
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default App;
