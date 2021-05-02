<script>
  import { onMount } from "svelte";
  import { parse } from "qs";
  import { querystring } from "svelte-spa-router";
  import Sortable from "sortablejs";
  import { boards, boardId } from "~/store/board";
  import List from "~/components/List.svelte";
  import CreateList from "~/components/CreateList.svelte";

  import _find from "lodash/find";

  let listsEl; // SortableJs에서 사용할 List 목록 요소
  let sortableLists; // list 정렬위한 sortableJS 인스턴스

  let newList = { lists: [] };

  // lists 스토어의 값($lists)가 변경되면 아래 반응성 구문이 실행
  $: {
    if ($boards && $boardId) {
      newList = _find($boards, { id: $boardId });
    }
  }

  onMount(() => {
    $boardId = parse($querystring).id;

    sortableLists = new Sortable(listsEl, {
      group: "My Lists", // 같은 그룹내에서 이동가능
      handle: ".list",
      delay: 50,
      animation: 0,
      forceFallback: true, // 크로스브라우징 이슈로 sortable rnd만 사용
      onEnd(event) {
        console.log(event);
        boards.reorder({
          oldIndex: event.oldIndex,
          newIndex: event.newIndex
        });
      }
    });
  });

  // document.body.style에 여러 속성을 넣을때
  Object.assign(document.body.style, {
    backgroundColor: "darkgray",
    backgroundImage: "url(/bg.jpeg)",
    backgroundSize: "cover"
  });
</script>

<svelte:head>
  <title>{newList.title} | Trello-clone</title>
</svelte:head>

<div class="list-container">
  <div class="lists" bind:this={listsEl}>
    {#each newList.lists as list (list.id)}
      <List {list} {sortableLists} />
    {/each}
  </div>
  <CreateList />
</div>

<style lang="scss">
  .list-container {
    width: 100vw;
    height: calc(100vh - 80px);
    padding: 30px;
    /* box-sizing: border: padding이 있는경우 영역을 넘어가는 경우가 있는데 그것을 막기위해 사용 */
    box-sizing: border-box;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    font-size: 0;
    .lists {
      display: inline-block;
      height: 100%;
      white-space: nowrap;
      font-size: 0;
    }
  }
</style>
