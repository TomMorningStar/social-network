const initialState = {
  loadingSaves: false,
  saves: [],
  error: null,
};

const saves = (state = initialState, action) => {
  switch (action.type) {
    case "get/saves/pending":
      return {
        ...state,
        loadingSaves: true,
        error: null,
      };
    case "get/saves/fulfilled":
      return {
        ...state,
        loadingSaves: false,
        saves: [...action.payload[0].saves],
      };
    case "get/saves/rejected":
      return {
        ...state,
        loadingSaves: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export const getSaves = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const token = state.application.token;
    dispatch({ type: "get/saves/pending" });
    try {
      const res = await fetch(`http://localhost:4000/saves`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const saves = await res.json();
      console.log(saves)
      if (saves.error) {
        dispatch({ type: "get/saves/rejected", error: saves.error });
      } else {
        dispatch({ type: "get/saves/fulfilled", payload: saves });
      }
    } catch (error) {
      dispatch({ type: "get/saves/rejected", error });
    }
  };
};

export default saves;
