import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import entities from "./entities/";
import application from "./application";
import auth from "./auth";
import boards from "./boards";
import errors from "./errors";
import items from "./items";
import settings from "./settings";

const rootReducer = combineReducers({
  routing: routerReducer,
  entities,
  application,
  auth,
  boards,
  errors,
  items,
  settings
});

export default rootReducer;
