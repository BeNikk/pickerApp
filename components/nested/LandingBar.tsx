const LandingBar = () => {
  return (
    <div>
      <div className="mt-4 flex flex-row justify-evenly ">
        <div>
          <input type="date" />
          {/* <Calendar /> */}
        </div>
        <div>
          <div className="text-2xl font-bold">
            NCR 1{/* NCR DATA WILL COME FROM BACKEND */}
          </div>
        </div>
        <div>
          <button className="text-white bg-green-500 p-2 rounded-lg">
            Logout
            {/* Logout functionality onclick */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingBar;
