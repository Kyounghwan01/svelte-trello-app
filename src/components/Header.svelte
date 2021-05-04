<script>
  import { tick } from "svelte";
  import { push, location } from "svelte-spa-router";
  import { boardData, boards } from "~/store/board";
  import { autoFocusout } from "~/actions/autoFocusout";

  let editTitleMode = false;
  let title = "";
  let textInput;

  const onEditMode = async () => {
    editTitleMode = true;
    title = $boardData.title;
    await tick();
    textInput && textInput.focus();
  };

  const offEditMode = () => {
    editTitleMode = false;
    title = $boardData.title;
  };

  const changeBoardTitle = () => {
    boards.changeBoardTitle({ title });
    offEditMode();
  };
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
  <!-- todo: 그룹 지정하기 -->
  <div class="list-header">
    {#if !editTitleMode}
      <h1 on:click={onEditMode}>{$boardData.title}</h1>
    {:else}
      <input
        use:autoFocusout={{
          offEditMode: changeBoardTitle,
          state: editTitleMode
        }}
        type="text"
        bind:value={title}
        bind:this={textInput}
        on:keydown={event => {
          event.key === "Enter" && changeBoardTitle();
          event.key === "Escape" && offEditMode();
          event.key === "Esc" && offEditMode();
        }}
      />
    {/if}

    <i
      class="far fa-star"
      style={$boardData.star ? "color: #f2d600" : "color: white"}
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
    padding: 10px 30px;

    h1 {
      display: inline-block;
      font-size: 18px;
      font-weight: 700;
      line-height: 32px;
      padding: 0 12px;
      color: black;
      &:hover {
        background-color: rgba(0, 0, 0, 0.24);
        cursor: pointer;
      }
    }

    input {
      background-color: #fff;
      border: 0;
      font-weight: 700;
      font-size: 18px;
      height: 32px;
      margin: 0;
      padding: 0 12px;
      outline: none;
      opacity: 0.5;
    }
    i {
      background-color: rgba(0, 0, 0, 0.16);
      border-radius: 3px;
      color: #fff;
      font-size: 14px;
      height: 32px;
      width: 32px;
      text-align: center;
      line-height: 32px;

      &:hover {
        background-color: rgba(0, 0, 0, 0.24);
        cursor: pointer;
      }
    }
  }

  .main-logo-background {
    background-color: rgb(5, 105, 167);
  }

  .board-logo-background {
    background-color: rgba(0, 0, 0, 0.4);
  }
</style>
