import React from "react";
import filterData from "../../assets/filters/icon";

const Filter = ({ setFilter, toggle, setToggle }) => {
  const handleFilter = (e, value) => {
    e.preventDefault();
    setFilter(value);
  };

  const handleToggle = ()=>{
    setToggle(!toggle)
  }

  return (
    <div className="grid sm:grid-cols-[4fr_1fr] gap-4 mt-4 select-none ">
      <div className="w-full flex gap-8 mt-4 overflow-x-auto ">
        {filterData.map((data) => {
          return (
            <div
              className="flex flex-col justify-center items-center cursor-pointer"
              value={data.value}
              key={data.value}
              onClick={(e) => handleFilter(e, data.value)}
            >
              <img
                src={data.image}
                alt=""
                className="h-5 w-5"
                value={data.value}
              />
              <p className="text-sm">{data.value}</p>
            </div>
          );
        })}
      </div>

      <div className="p-4 text-black border border-grap-800 rounded-3xl w-full">
        <div className="flex items-center justify-center w-full">
          <label htmlFor="toggleB" className="flex items-center cursor-pointer">
            <div className="relative" >
              <input type="checkbox" id="toggleB" className="sr-only" value={toggle} onClick={handleToggle} />

              {/* <div className="block bg-gray-300 w-14 h-8 rounded-full"></div> */}
              <div className={`block w-14 h-8 rounded-full transition ${toggle ? "bg-pink-600" : "bg-gray-300"}`}></div>


              <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
            </div>

            <div className="ml-3 text-gray-700 font-medium text-sm">Display total after taxes</div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Filter;
