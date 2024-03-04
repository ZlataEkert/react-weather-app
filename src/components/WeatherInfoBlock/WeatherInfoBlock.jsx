import { ImSpinner9 } from "react-icons/im";
import { BsClouds, BsThermometer, BsWater, BsWind } from "react-icons/bs";
import WeatherProperty from "./components/WeatherProperty";

const InputForm = ({ loading, data }) => {
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
                  <WeatherProperty
                    title="Cloudiness "
                    icon={<BsClouds />}
                    value={`${data.clouds.all} %`}
                  />
                </div>
                <div className="flex items-center gap-x-2">
                  {/*  icon */}
                  <WeatherProperty
                    title="Feels like "
                    icon={<BsThermometer />}
                    value={`${data.main.feels_like.toFixed(0)} °C`}
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <WeatherProperty
                  title="Humidity "
                  icon={<BsWater />}
                  value={`${data.main.humidity} %`}
                />
                <WeatherProperty
                  title="Wind "
                  icon={<BsWind />}
                  value={`${data.wind.speed.toFixed(1)} m/s`}
                />
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default InputForm;
