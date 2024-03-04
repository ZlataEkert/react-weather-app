const InputForm = ({ errorMsg }) => {
  return (
    <div className="w-full max-w-[450px] lg:max-w-[450px] bg-[#db2777] text-white absolute top-2 lg:top-2 p-4 capitalize backdrop-blur-[32px] rounded-[32px]">{`${errorMsg.value}`}</div>
  );
};

export default InputForm;
