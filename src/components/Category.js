import React from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";

const Category = ({ addChild, createNode }) => {
  const handleAddCateClick = (e) => {
    e.preventDefault();
    const newCategory = prompt("Add Category");
    if (newCategory === "") {
      alert("Category can't be empty");
    } else if (newCategory) {
      const childId = createNode(newCategory).nodeId;
      addChild(0, childId);
    } else {
      // user hit cancel
    }
  };

  return (
    <div className="flex justify-center items-center">
      <button
        className=" m-2 ring-yellow-500 cursor-pointer hover:text-red-900 hover:border-red-400 hover:bg-green-400 border-2 text-sm  p-2 text-yellow-400 bg-red-900 border-yellow-300"
        onClick={handleAddCateClick}
      >
        Add Catergory
      </button>
      <button
        className="  m-2 ring-yellow-500 cursor-pointer hover:text-red-900 hover:border-red-400 hover:bg-green-400 border-2 text-sm  p-2 text-yellow-400 bg-red-900 border-yellow-300"
        onClick={() => {}}
      >
        Expand All
      </button>
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  return state[ownProps.id];
}

export default connect(mapStateToProps, actions)(Category);
