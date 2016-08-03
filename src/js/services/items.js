import fetch, { fetchJSON } from "../utils/fetch";
import { API_ROOT } from "../constants/application";

export const ITEMS_ENDPOINT = `${API_ROOT}/items`;


export function fetchBoardItems(boardId) {
  return fetch(`${ITEMS_ENDPOINT}/board/${boardId}`)
    .then(res => res.items);
}


export function addItemByFile({ file, palette, boardId }) {
  const data = new FormData();
  data.append("file", file);
  data.append("boardId", boardId);
  data.append("palette", palette);

  const params = {
    method: "POST",
    body: data
  };

  return fetch(`${ITEMS_ENDPOINT}/file`, params)
    .then(res => res.item);
}

export function updateItems(items) {
  return fetchJSON(ITEMS_ENDPOINT, items, "PUT")
    .then(res => res.items);
}

export function deleteItems(items) {
  return fetchJSON(ITEMS_ENDPOINT, items, "DELETE")
    .then(res => res.items);
}
