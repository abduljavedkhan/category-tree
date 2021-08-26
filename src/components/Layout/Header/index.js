import React from "react";
import Category from "../../Category";

const Header = () => {
  return (
    <>
    <header>
      <div className="flex justify-between p-4  bg-yellow-400 shadow-md border-b-4 border-green-300 h-20">
        <h1 className="font-bold text-xl md:text-3xl lg:3xl px-4 py-1 w-max text-red-900 flex-wrap-reverse">
          Category Tree
        </h1>
        <Category />
      </div>

    </header>

    </>
  );
};

export default Header;
