import Toast from "react-native-toast-message";
import { call, put } from "redux-saga/effects";
import api from "../../../services/api";
import { championSuccess, currentChampionSucces } from "./actions";
import { SelectedChampion } from "./types";

export function* load() {
  try {
    const response = yield call(api.get, "champion.json");

    const data = Object.values(response.data.data);

    yield put(championSuccess(data as any));
    Toast.show({
      text1: "Campeões carregados com sucesso",
      type: "success",
    });
  } catch (e) {
    Toast.show({
      text1: "Erro ao buscar champions",
      type: "error",
    });
  }
}

export function* loadChamp({ payload }: { payload: string }) {
  try {
    const response = yield call(api.get, `champion/${payload}.json`);

    const data: SelectedChampion[] = Object.values(response.data.data);

    const newData = {
      id: data[0].id,
      name: data[0].name,
      key: data[0].key,
      title: data[0].title,
      skins: data[0].skins,
      lore: data[0].lore,
      spells: data[0].spells,
      passive: data[0].passive,
    };

    yield put(currentChampionSucces(newData as any));
  } catch (e) {
    Toast.show({
      text1: "Erro inesperado",
      type: "error",
    });
  }
}
