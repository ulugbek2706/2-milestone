import React, {useEffect} from 'react';
import date from "img/calendar.png";
import {useDispatch, useSelector} from "react-redux";
import {fetchPhoneAndNumber} from "components/navbar/reducers/DashboardSlice";

function DateAndPhone(props) {
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.dashboard);

    useEffect(() => {
        dispatch(fetchPhoneAndNumber());
    }, [dispatch]);
    return (
        <div>
            {data && (
                <div className="flex items-center gap-4 text-white">
                    <b className="flex items-center gap-3 bg-blue-500 p-4 hover:bg-blue-700 rounded-sm">
                        <img src={date} alt="date" />
                        {data.currentDate}
                    </b>
                    <p className="font-bold text-md">{data.supportPhone}</p>
                </div>
            )}
        </div>
    );
}

export default DateAndPhone;