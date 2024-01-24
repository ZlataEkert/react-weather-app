import { useEffect } from "react";

const App = () => {
  // 1. useState weather data const [data, setData] = useState()
  // 2. fetch data handler (axios with api link, with apiToken)
  // 3. useEffect with fetch data (city hardcode temporary)
  return (
    <div>
      <div>city name from useState</div>
      <div>weather image from useState</div>
    </div>
  );
};

export default App;
