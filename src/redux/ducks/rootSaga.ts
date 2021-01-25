import { all, takeLatest } from "redux-saga/effects";
import { load, loadChamp } from "./champions/sagas";
import { ChampionsType } from "./champions/types";

export default function* rootSaga() {
  return yield all([
    takeLatest(ChampionsType.CHAMPION_REQUEST, load),
    takeLatest(ChampionsType.CURRENT_CHAMPION_REQUEST, loadChamp as any),
  ]);
}
