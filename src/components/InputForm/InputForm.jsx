import { IoMdSearch } from "react-icons/io";

const InputForm = ({
  animate,
  inputRef,
  handleInput,
  handleSubmit,
  isLoading,
}) => {
  return (
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
          disabled={isLoading}
        >
          <IoMdSearch className="text-2xl text-white" />
        </button>
      </div>
    </form>
  );
};

export default InputForm;
