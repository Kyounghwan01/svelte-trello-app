<script>
  import CreateCard from "~/components/CreateCard.svelte";
  import ListTitle from "~/components/ListTitle.svelte";
  import Card from "~/components/Card.svelte";

  export let list;
</script>

<div class="list">
  <div class="list__inner">
    <div class="list__heading">
      <ListTitle {list} />
      <p>{list.cards.length} cards</p>
    </div>
    <div class="list__cards">
      {#each list.cards as card (card.id)}
        <Card {card} listId={list.id} />
      {/each}
    </div>
    <CreateCard listId={list.id} />
  </div>
</div>

<style lang="scss">
  .list {
    display: inline-block;
    font-size: 16px;
    width: 290px;
    height: 100%;
    box-sizing: border-box;
    white-space: normal;
    margin: 0 4px;
    line-height: 20px;

    :global(&.sortable-ghost) {
      position: relative;
      opacity: 0.2;
      &::after {
        /* 가상요소에 content 필수 */
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: #000;
        border-radius: 4px;
      }
    }
    :global(&.sortable-chosen) {
      cursor: move;
    }

    // --stop --run : 상태
    // __inner : 클래스의 부분
    &__inner {
      display: flex;
      flex-direction: column;
      max-height: 100%;
      padding: 10px 8px;
      box-sizing: border-box;
      background: #ebecf0;
      border-radius: 4px;
    }
    &__heading {
      margin-bottom: 10px;
      p {
        color: #5e6c84;
        padding: 0 8px;
      }
    }
    &__cards {
      overflow-y: auto;
      overflow-x: hidden;
      margin-bottom: 10px;
      .card {
        height: 150px;
        border: 10px solid black;
        box-sizing: border-box;
      }
    }
  }

  .create-card {
    border: 10px solid red;
    box-sizing: border-box;
  }
</style>
