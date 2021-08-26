import React from "react";

const Card = (props) => {
    return (
        <div className=" w-10/12 md:w-5/6 m-5 max-h-full bg-gray-300 pt-8 pb-4 px-2 rounded-lg shadow-xl border-b-2 border-red-900 ring-red-900 items-center justify-center">
            {props.children}
        </div>
    );
};

export default Card;
