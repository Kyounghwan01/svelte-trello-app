<script>
  import { onMount } from "svelte";
  import { link } from "svelte-spa-router";
  import active from "svelte-spa-router/active";
  import { lists } from "~/store/list";

  onMount(() => {
    console.log($lists);
  }, []);
</script>

<div class="main-container">
  {#each $lists as list}
    <div class="main-container__list">{list.title}</div>
  {/each}
  <div class="main-container__create-board">Create new Board</div>
</div>

<style lang="scss">
  .main-container {
    width: 60%;
    padding: 30px;
    margin: 0 auto;
    &__create-board {
      background-color: rgba(9, 30, 66, 0.04);
      box-shadow: none;
      border: none;
      color: #172b4d;
      display: table-cell;
      height: 80px;
      font-weight: 400;
      text-align: center;
      vertical-align: middle;
      width: inherit;
      transition-property: background-color, border-color, box-shadow;
      transition-duration: 85ms;
      transition-timing-function: ease;
      &:hover {
        background-color: rgba(9, 30, 66, 0.08);
        box-shadow: none;
        border: none;
        color: #172b4d;
        cursor: pointer;
      }
    }
  }
</style>
