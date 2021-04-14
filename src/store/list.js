import { writable } from "svelte/store";
import { v4 as uuidv4 } from "uuid";

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
  add(payload) {
    // 1. add함수가 실행되면
    const { title } = payload;
    // 2. _lists가 바뀌고
    _lists.update($lists => {
      $lists.push({ id: uuidv4(), title, cards: [] });
      return $lists;
    });
  }
};
