import { writable } from "svelte/store";
import { v4 as uuidv4 } from "uuid";
import _find from "lodash/find";
import _remove from "lodash/remove";
import _cloneDeep from "lodash/cloneDeep";

const repoLists = JSON.parse(window.localStorage.getItem("lists")) || [];

// _는 list.js 내부에서만 사용하는 데이터
const _lists = writable(repoLists);

// 3. _lists가 바뀌면 subscribe의 첫번째 인수 실행
_lists.subscribe($lists => {
  // 4. localStore에 바뀐 리스트가 저장됨
  window.localStorage.setItem("lists", JSON.stringify($lists));
});

// custom store
export const lists = {
  // subscribe 참조관계 만듬 (자동 구독 형태로 만듬)
  subscribe: _lists.subscribe,
  reorder(payload) {
    const { oldIndex, newIndex } = payload;
    _lists.update($lists => {
      const clone = _cloneDeep($lists[oldIndex]);
      $lists.splice(oldIndex, 1);
      $lists.splice(newIndex, 0, clone);
      return $lists;
    });
  },
  add(payload) {
    // 1. add함수가 실행되면
    const { title } = payload;
    // 2. _lists가 바뀌고
    _lists.update($lists => {
      $lists.push({ id: uuidv4(), title, cards: [] });
      return $lists;
    });
  },
  edit(payload) {
    const { listId, title } = payload;
    _lists.update($lists => {
      // const foundList = $lists.find(l => {
      //   return l.id === listId;
      // });
      const foundList = _find($lists, { id: listId });
      foundList.title = title;

      return $lists;
    });
  },
  remove(payload) {
    const { listId } = payload;
    _lists.update($lists => {
      _remove($lists, { id: listId });
      return $lists;
    });
  }
};

export const cards = {
  add(payload) {
    const { listId, title } = payload;
    _lists.update($lists => {
      const foundList = _find($lists, { id: listId });
      foundList.cards.push({ id: uuidv4(), title });
      return $lists;
    });
  }
};
