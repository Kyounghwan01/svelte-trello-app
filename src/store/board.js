import { writable, get, derived } from "svelte/store";
import { v4 as uuidv4 } from "uuid";
import _find from "lodash/find";
import _remove from "lodash/remove";
import _cloneDeep from "lodash/cloneDeep";

const repoBoards = JSON.parse(window.localStorage.getItem("board")) || [];

const _boards = writable(repoBoards);
export const boardId = writable("");
export const boardData = derived([boardId, _boards], ([$boardId, $_boards]) => {
  const boardData = _find($_boards, { id: $boardId });
  return boardData || "";
});

_boards.subscribe($boards => {
  // 4. localStore에 바뀐 리스트가 저장됨
  window.localStorage.setItem("board", JSON.stringify($boards));
});

// custom store
export const boards = {
  // subscribe 참조관계 만듬 (자동 구독 형태로 만듬)
  subscribe: _boards.subscribe,
  reorder(payload) {
    const { oldIndex, newIndex } = payload;
    _boards.update($boards => {
      const foundBoard = _find($boards, { id: get(boardId) });
      const clone = _cloneDeep(foundBoard.lists[oldIndex]);
      foundBoard.lists.splice(oldIndex, 1);
      foundBoard.lists.splice(newIndex, 0, clone);
      return $boards;
    });
  },
  add(payload) {
    // 1. add함수가 실행되면
    const { title } = payload;
    // 2. _boards가 바뀌고
    _boards.update($boards => {
      $boards.push({
        id: uuidv4(),
        title,
        lists: [],
        group: "",
        star: false
      });
      return $boards;
    });
  },
  changeFavorite(payload) {
    const { id } = payload;
    _boards.update($boards => {
      const foundBoard = _find($boards, { id });
      foundBoard.star = !foundBoard.star;

      return $boards;
    });
  },
  addList(payload) {
    const { title } = payload;
    _boards.update($boards => {
      const foundBoard = _find($boards, { id: get(boardId) });
      foundBoard.lists.push({ id: uuidv4(), title, cards: [] });
      return $boards;
    });
  },
  removeList(payload) {
    const { listId } = payload;
    _boards.update($boards => {
      const foundBoard = _find($boards, { id: get(boardId) });
      _remove(foundBoard.lists, { id: listId });
      return $boards;
    });
  },
  editList(payload) {
    const { listId, title } = payload;
    _boards.update($boards => {
      const foundBoard = _find($boards, { id: get(boardId) });
      const foundList = _find(foundBoard.lists, { id: listId });
      foundList.title = title;
      return $boards;
    });
  },

  edit(payload) {
    const { listId, title } = payload;
    _boards.update($lists => {
      const foundList = _find($lists, { id: listId });
      foundList.title = title;

      return $lists;
    });
  },
  remove(payload) {
    const { listId } = payload;
    _boards.update($lists => {
      _remove($lists, { id: listId });
      return $lists;
    });
  }
};

export const cards = {
  reorder(payload) {
    const { fromListId, toListId, oldIndex, newIndex } = payload;
    _boards.update($boards => {
      const foundBoard = _find($boards, { id: get(boardId) });
      const fromList = _find(foundBoard.lists, { id: fromListId });
      const toList =
        fromListId === toListId
          ? fromList
          : _find(foundBoard.lists, { id: toListId });
      const clone = _cloneDeep(fromList.cards[oldIndex]);

      fromList.cards.splice(oldIndex, 1);
      toList.cards.splice(newIndex, 0, clone);
      return $boards;
    });
  },
  addCard(payload) {
    const { listId, title } = payload;
    _boards.update($board => {
      const foundBoard = _find($board, { id: get(boardId) });
      const foundList = _find(foundBoard.lists, { id: listId });
      foundList.cards.push({ id: uuidv4(), title });
      return $board;
    });
  },
  editCard(payload) {
    const { listId, cardId, title } = payload;
    _boards.update($board => {
      const foundBoard = _find($board, { id: get(boardId) });
      const foundList = _find(foundBoard.lists, { id: listId });
      const foundCard = _find(foundList.cards, { id: cardId });
      foundCard.title = title;
      return $board;
    });
  },
  removeCard(payload) {
    const { listId, cardId } = payload;
    _boards.update($board => {
      const foundBoard = _find($board, { id: get(boardId) });
      const foundList = _find(foundBoard.lists, { id: listId });
      _remove(foundList.cards, { id: cardId });
      return $board;
    });
  }
};
