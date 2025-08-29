import { differenceInCalendarDays, format } from "date-fns";
import React from "react";
import icons from "../../assets/icons/icons";


const BookingDates = ({booking, className}) => {
  return (
    <div className="border-t border-gray-300 mt-2 py-2 flex gap-1 sm:gap-2 text-gray-600 max-[630px]:text-xs max-[630px]:flex-col">
      <div className="flex gap-1 items-center">
        {icons.night}
        {differenceInCalendarDays(
          new Date(booking.checkOut),
          new Date(booking.checkIn)
        )}{" "}
        nights:
      </div>
      <div className="flex gap-2">
        <div className="flex gap-1 items-center ml-0 sm:ml-2">
          {icons.calender}
          {format(new Date(booking.checkIn), "yyyy-MM-dd")} &rarr;
        </div>
        <div className="flex gap-1 items-center">
          {icons.calender}
          {format(new Date(booking.checkOut), "yyyy-MM-dd")}
        </div>
      </div>
    </div>
  );
};

export default BookingDates;
