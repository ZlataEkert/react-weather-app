import { useState, useEffect, useRef } from "react";
import InputForm from "./components/InputForm";
import ErrorMessage from "./components/ErrorMessage";
import WeatherInfoBlock from "./components/WeatherInfoBlock";
import { fetchWeatherData } from "./api/requests";

const App = () => {
  const [data, setData] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [errorMsg, setErrorMsg] = useState({ value: "", type: "local" });
  const inputRef = useRef(null);

  const fetchData = async (location = "Kyiv") => {
    setLoading(true);

    try {
      const res = await fetchWeatherData(location);
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
    // If input is not empty
    if (inputValue !== "") {
      fetchData(inputValue);
    }

    // If input value is empty
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

  return (
    <div className="w-full h-screen bg-gradient-to-b from-purple-900 to-blue-500 bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0">
      {errorMsg.value && <ErrorMessage errorMsg={errorMsg} />}
      <InputForm
        inputRef={inputRef}
        animate={animate}
        handleInput={handleInput}
        handleSubmit={handleSubmit}
        isLoading={loading}
      />
      <WeatherInfoBlock loading={loading} data={data} />
    </div>
  );
};

export default App;
