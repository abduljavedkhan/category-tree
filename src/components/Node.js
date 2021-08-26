import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";

export const Node = (props) => {
  const handleAddChildClick = (e) => {
    e.preventDefault();
    const newSubCategory = prompt("Add Sub Category");
    const { addChild, createNode, id } = props;
    if (newSubCategory === "") {
      alert("Category can't be empty");
    } else if (newSubCategory) {
      const childId = createNode(newSubCategory).nodeId;
      addChild(id, childId);
    } else {
      // user hit cancel
    }
  };

  const handleRemoveClick = (e) => {
    e.preventDefault();
    const { removeChild, deleteNode, parentId, id } = props;
    removeChild(parentId, id);
    deleteNode(id);
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    const newCategory = prompt("Update Sub Category");
    const { updateChild, parentId, id } = props;
    updateChild(parentId, id, newCategory);
  };

  const [showAction, setShowAction] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    if (e.type === "click") {
      setShowAction(true);
    } else if (e.type === "contextmenu") {
      setShowAction(true);
    }
  };

  const [selected, setSelected] = useState(props.selected ?? true);
  const { parentId, childIds, name } = props;
  const toggleSelected = () => {
    setSelected((prev) => !prev);
  };
  const hasChildren = childIds && childIds.length !== 0;
  const renderSubCategory = (subCatId) => {
    const { id } = props;
    if (hasChildren) {
      return (
        <div className=" pl-4" key={subCatId}>
          <ConnectedNode id={subCatId} parentId={id} />
        </div>
      );
    }
    return null;
  };
  return (
    <>
      <div>
        {parentId !== undefined && (
          <div className="flex m-1 p-2  border-green-400 border-b-2  justify-between">
            <div
              onContextMenu={handleClick}
              className="text-green-700 text-md font-bold"
            >
              {`${name}`}
              <span className="text-yellow-700 mx-1 px-1">{`(${
                childIds && childIds.length
              })`}</span>
            </div>
            {hasChildren && selected ? (
              <button
                onClick={toggleSelected}
                className="text-red-900 justify-center items-center  border-2 border-green-700  w-8 h-8 rounded-md bg-gray-400 my-1 mr-2"
              >
                -
              </button>
            ) : (
              <button
                onClick={toggleSelected}
                className="text-red-900 justify-center items-center  border-2 border-green-700  w-8 h-8 rounded-md bg-gray-400  my-1 mr-2"
              >
                +
              </button>
            )}            
            {showAction ? (
              <div className="flex justify-end ml-28 pl-64 ">
                {" "}

                {typeof parentId !== "undefined" && (
                  
                  <div className="flex justify-center">
                    <button
                      onClick={handleRemoveClick}
                      className="mr-2 ring-yellow-500 cursor-pointer hover:text-red-900 hover:border-red-400 hover:bg-green-400 border-2 text-xs  p-2 text-yellow-400 bg-red-900 border-yellow-300 h-10"
                    >
                      Delete
                    </button>

                    <button
                      href="#"
                      onClick={() => {}}
                      className="mr-2 ring-yellow-500 cursor-pointer hover:text-red-900 hover:border-red-400 hover:bg-green-400 border-2 text-xs  p-2 text-yellow-400 bg-red-900 border-yellow-300 h-10"
                    >
                      Edit
                    </button>

                    <button
                      className="ring-yellow-500 cursor-pointer hover:text-red-900 hover:border-red-400 hover:bg-green-400 border-2 text-xs  p-2 text-yellow-400 bg-red-900 border-yellow-300 h-10 w-28"
                      onClick={handleAddChildClick}
                    >
                      + Sub Category
                    </button>
                  </div>
                )}
              </div>
            ) : (
              ``
            )}
          </div>
        )}
        <ul>{selected && childIds && childIds.map(renderSubCategory)}</ul>
      </div>
    </>
  );
};

function mapStateToProps(state, ownProps) {
  return state[ownProps.id];
}

const ConnectedNode = connect(mapStateToProps, actions)(Node);
export default ConnectedNode;
