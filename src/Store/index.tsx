import { createStore } from "redux";
// import {configureStore} from 'redux.js/toolkit'

const searchReducer = (state = { searchTxt: "" }, action: any) => {
  return { searchTxt: state.searchTxt + "kme" };
};

const store = createStore(searchReducer); //wants pointer to reducer function

export default store;
