import React from "react";
import icons from "../../../assets/icons/icons";

const PerksLable = ({selected, onChange}) => {
    
    function handleCbClick (e){
        const {checked, name} = e.target
        if(checked){
            onChange([...selected, name])
        }else{
            onChange([...selected.filter(selectedName => selectedName !== name)])
        }
    }

  return (
    <div className="grid grid-cols-3 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 gap-2">
      <label className="flex items-center justify-start border rounded-xl p-4 gap-2">
        <input type="checkbox" onClick={handleCbClick} checked={selected?.includes("wifi")} name="wifi" />
        {icons.wifi}
        <span>Wifi</span>
      </label>
      <label className="flex items-center justify-start border rounded-xl p-4 gap-2">
        <input type="checkbox" onClick={handleCbClick} checked={selected?.includes("parking")} name="parking" />
        {icons.parking}
        <span>Parking</span>
      </label>
      <label className="flex items-center justify-start border rounded-xl p-4 gap-2">
        <input type="checkbox" onClick={handleCbClick} checked={selected?.includes("tv")} name="tv" />
        {icons.TV}
        <span>TV</span>
      </label>
      <label className="flex items-center justify-start border rounded-xl p-4 gap-2">
        <input type="checkbox" onClick={handleCbClick} checked={selected?.includes("kitchen")} name="kitchen" />
        {icons.Kitchen}
        <span>Kitchen</span>
      </label>
      <label className="flex items-center justify-start border rounded-xl p-4 gap-2">
        <input type="checkbox" onClick={handleCbClick} checked={selected?.includes("pet")} name="pet" />
        {icons.pet}
        <span>Pet</span>
      </label>
      <label className="flex items-center justify-start border rounded-xl p-4 gap-2">
        <input type="checkbox" onClick={handleCbClick} checked={selected?.includes("entrance")} name="entrance" />
        {icons.private}
        <span>Private entrance</span>
      </label>
    </div>
  );
};

export default PerksLable;
