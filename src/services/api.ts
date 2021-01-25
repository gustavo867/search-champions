import axios from "axios";

const api = axios.create({
  baseURL: "https://ddragon.leagueoflegends.com/cdn/11.2.1/data/pt_BR",
});

const BASE_IMAGE_URL =
  "https://ddragon.leagueoflegends.com/cdn/11.2.1/img/champion/";
const SPEEL_IMAGE_URL =
  "https://ddragon.leagueoflegends.com/cdn/11.2.1/img/spell/";

export default api;
export { BASE_IMAGE_URL, SPEEL_IMAGE_URL };
