<script>
  import { push, location } from "svelte-spa-router";
  import { boardData, boards } from "~/store/board";
</script>

<header
  class={$location === "/" ? "main-logo-background" : "board-logo-background"}
>
  <img
    src="/trello-logo.svg"
    alt="Trello"
    class="logo"
    on:click={() => push("/")}
  />
</header>
{#if $location === "/board"}
  <!-- todo: 타이틀 바꾸기, 그룹 지정하기 -->
  <div class="list-header">
    {$boardData.title}
    <i
      class={$boardData.star ? "fas fa-star" : "far fa-star"}
      style="color: red"
      on:click={() => boards.changeFavorite({ id: $boardData.id })}
    />
  </div>
{/if}

<style lang="scss">
  header {
    height: 40px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    img.logo {
      width: 80px;
      opacity: 0.5;
    }
    img:hover {
      cursor: pointer;
      opacity: 0.1;
    }
  }

  .list-header {
    height: 40px;
    box-sizing: border-box;
    opacity: 0.5;
    background-color: #eee;
    padding: 0 30px;
  }

  .main-logo-background {
    background-color: rgb(5, 105, 167);
  }

  .board-logo-background {
    background-color: rgba(0, 0, 0, 0.4);
  }
</style>
