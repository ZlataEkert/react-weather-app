const WeatherProperty = ({ title, value, icon }) => {
  return (
    <div className="flex items-center gap-x-2">
      {icon}
      <div className="flex">
        {title} <span className="flex ml-2">{value}</span>
      </div>
    </div>
  );
};

export default WeatherProperty;
