<script>
  import { tick } from "svelte";
  import { lists } from "~/store/list";

  // lists.add({ title: "nkh!" });
  let isEditMode = false;
  let title = "";
  let textareaEl;

  function addList() {
    if (title.trim()) {
      lists.add({ title });
    }
    offEditMode();
  }

  async function onEditMode() {
    isEditMode = true;
    // forcus가 안되는데 -> isEditMode가 true가 되면 화면갱신될때까지 기다려야함 -> tick 사용
    await tick();
    textareaEl && textareaEl.focus();
  }

  function offEditMode() {
    isEditMode = false;
    title = "";
  }
</script>

<div class="create-list">
  {#if isEditMode}
    <div class="edit-mode">
      <textarea
        bind:value={title}
        bind:this={textareaEl}
        placeholder="Enter a title for this list..."
        on:keydown={event => {
          event.key === "enter" && addList();
          event.key === "Escape" && offEditMode();
          event.key === "Esc" && offEditMode();
        }}
      />
      <div class="actions">
        <div class="btn success" on:click={addList}>Add List</div>
        <div class="btn" on:click={offEditMode}>Cancel</div>
      </div>
    </div>
  {:else}
    <div class="add-another-list" on:click={onEditMode}>+ Add another list</div>
  {/if}
</div>

<style lang="scss">
  .create-list {
    white-space: normal;
    font-size: 16px;
    display: inline-block;
    width: 290px;
    padding: 10px 8px;
    vertical-align: top;
    background: rgba(#ebecf0, 0.6);
    border-radius: 4px;
    margin: 0 4px;
    line-height: 20px;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
      background: #ebecf0;
    }
  }
</style>
