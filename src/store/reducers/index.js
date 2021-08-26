import {
  ADD_CHILD,
  REMOVE_CHILD,
  CREATE_NODE,
  DELETE_NODE,
  UPDATE_CHILD,
} from "../../store/actions";

const childIds = (state, action) => {
  switch (action.type) {
    case ADD_CHILD:
      return [...state, action.childId];
    case REMOVE_CHILD:
      return state.filter((id) => id !== action.childId);
    case UPDATE_CHILD:
      console.log(
        "s " +
          JSON.stringify(state) +
          "  " +
          action.childId +
          "   " +
          action.newCategory
      );
      let updatedState;
      if (state.find((id) => id === action.childId)) {
        console.log("hrer " + state.childIds[action.childId]);
        updatedState = { ...state[action.childId], name: action.newCategory };
        return { ...state, [action.childId]: updatedState };
      }
      break;
    default:
      return state;
  }
};

const node = (state, action) => {
  switch (action.type) {
    case CREATE_NODE:
      return {
        id: action.nodeId,
        name: `${action.name}`,
        childIds: [],
      };

    case ADD_CHILD:
    case REMOVE_CHILD:
      return {
        ...state,
        childIds: childIds(state.childIds, action),
      };
    case UPDATE_CHILD:
      return {
        ...state,
        childIds: childIds(state.childIds, action),
      };
    default:
      return state;
  }
};

const getAllDescendantIds = (state, nodeId) =>
  state[nodeId].childIds.reduce(
    (acc, childId) => [...acc, childId, ...getAllDescendantIds(state, childId)],
    []
  );

const deleteMany = (state, ids) => {
  state = { ...state };
  ids.forEach((id) => delete state[id]);
  return state;
};

export default (state = {}, action) => {
  const { nodeId } = action;
  if (typeof nodeId === "undefined") {
    return state;
  }

  if (action.type === DELETE_NODE) {
    const descendantIds = getAllDescendantIds(state, nodeId);
    return deleteMany(state, [nodeId, ...descendantIds]);
  }

  return {
    ...state,
    [nodeId]: node(state[nodeId], action),
  };
};
