import React from 'react';


function BalloonMap(props) {

    let percent = ((2 / 3) * 100);

    return (
        <div className={"rounded-lg h-6 relative border border-gray-700 w-[130px] bg-gray-100 "}>
            <div style={{width: percent + "%"}} className={`h-full rounded-lg bg-indigo-200  py-1`}>
            </div>
            <p className={"absolute w-full top-[2px]"}>Plan: 200 UZS</p>
        </div>
    );
}

export default BalloonMap;