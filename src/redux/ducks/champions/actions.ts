import { action } from "typesafe-actions";
import { Champions, ChampionsType, SelectedChampion } from "./types";

export const championRequest = () => action(ChampionsType.CHAMPION_REQUEST);

export const championSuccess = (data: Champions[]) =>
  action(ChampionsType.CHAMPION_SUCCESS, data);

export const championFailure = () => action(ChampionsType.CHAMPION_FAILURE);

export const currentChampionRequest = (name: string) =>
  action(ChampionsType.CURRENT_CHAMPION_REQUEST, name);

export const currentChampionSucces = (data: SelectedChampion) =>
  action(ChampionsType.CURRENT_CHAMPION_SUCCESS, data);

export const currentChampionFailure = () =>
  action(ChampionsType.CURRENT_CHAMPION_FAILURE);
