<script>
  import { tick } from "svelte";
  import { cards } from "~/store/list";
  import { autoFocusout } from "~/actions/autoFocusout";

  export let card;
  export let listId;

  let isEditMode = false;
  let title;
  let textareaEl;

  function saveCard() {
    if (title.trim()) {
      cards.edit({
        listId,
        cardId: card.id,
        title
      });
    }
    offEditMode();
  }

  function removeCard() {
    cards.remove({ listId, cardId: card.id });
    offEditMode();
  }

  async function onEditMode() {
    isEditMode = true;
    title = card.title;
    await tick();
    textareaEl && textareaEl.focus();
  }

  function offEditMode() {
    isEditMode = false;
    title = "";
  }
</script>

<div class="card">
  {#if isEditMode}
    <div
      class="edit-mode"
      use:autoFocusout={{ offEditMode, state: isEditMode }}
    >
      <textarea
        bind:value={title}
        bind:this={textareaEl}
        placeholder="Enter a title for this list..."
        on:keydown={event => {
          event.key === "enter" && saveCard();
          event.key === "Escape" && offEditMode();
          event.key === "Esc" && offEditMode();
        }}
      />
      <div class="actions">
        <div class="btn success" on:click={saveCard}>Save</div>
        <div class="btn" on:click={offEditMode}>Cancel</div>
        <div class="btn danger" on:click={removeCard}>Delete Card</div>
      </div>
    </div>
  {:else}
    <div class="title" on:click={onEditMode}>
      {card.title}
      <div class="btn small">Edit</div>
    </div>
  {/if}
</div>

<style lang="scss">
  .card {
    margin-bottom: 8px;
    /* 카드의 마지막 요소는 1px */
    &:last-child {
      margin-bottom: 1px;
    }
    .title {
      background: #ffffff;
      padding: 6px 8px;
      border-radius: 4px;
      box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
      line-height: 20px;
      position: relative;
      &:hover {
        background: #f5f5f5;
      }
      .btn {
        position: absolute;
        top: 6px;
        right: 8px;
        display: none;
      }
      &:hover .btn {
        display: block;
      }
    }
  }
</style>
