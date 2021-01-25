import { Reducer } from "redux";
import { ChampionsType } from "./types";

const INITIAL_STATE = {
  champions: [],
  currentChampion: {},
  error: {
    message: "",
    hasError: false,
  },
  loading: false,
};

const reducer: Reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ChampionsType.CHAMPION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ChampionsType.CHAMPION_SUCCESS:
      return {
        ...state,
        champions: action.payload,
        loading: false,
      };
    case ChampionsType.CHAMPION_FAILURE:
      return {
        ...state,
        error: {
          message: "Erro inesperado",
          hasError: true,
        },
      };
    case ChampionsType.CURRENT_CHAMPION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ChampionsType.CURRENT_CHAMPION_SUCCESS:
      return {
        ...state,
        loading: false,
        currentChampion: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
