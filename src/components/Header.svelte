<script>
  import { push, location } from "svelte-spa-router";
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
  }

  .main-logo-background {
    background-color: rgb(5, 105, 167);
  }

  .board-logo-background {
    background-color: rgba(0, 0, 0, 0.4);
  }
</style>
