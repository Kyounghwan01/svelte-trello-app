<script>
  import { onDestroy, tick, createEventDispatcher } from "svelte";
  import { boards } from "~/store/board";
  import { autoFocusout } from "~/actions/autoFocusout";
  export let list;

  let isEditMode = false;
  let title = list.title;
  let textareaEl;

  // 타이틀 수정시 dnd안되게 한다 -> isEditMode가 true이면 부모 컴포넌트 List.svelte에 dispatcher로 값을보내 sortable disabled 시킴
  const dispatch = createEventDispatcher();

  function saveTitle() {
    if (title.trim()) {
      boards.editList({
        listId: list.id,
        title
      });
    }
    offEditMode();
  }

  function removeList() {
    boards.removeList({ listId: list.id });
    offEditMode();
  }

  async function onEditMode() {
    isEditMode = true;
    title = list.title;
    // List.svelte에 vue로 치면 emit
    dispatch("editMode", true);
    await tick();
    textareaEl && textareaEl.focus();
  }

  function offEditMode() {
    isEditMode = false;
    dispatch("editMode", false);
  }

  onDestroy(() => {
    offEditMode();
  });
</script>

{#if isEditMode}
  <div class="edit-mode" use:autoFocusout={{ offEditMode, state: isEditMode }}>
    <textarea
      bind:value={title}
      bind:this={textareaEl}
      placeholder="Enter a title for this list..."
      on:keydown={event => {
        event.key === "enter" && saveTitle();
        event.key === "Escape" && offEditMode();
        event.key === "Esc" && offEditMode();
      }}
    />
    <div class="actions">
      <div class="btn success" on:click={saveTitle}>Save</div>
      <div class="btn" on:click={offEditMode}>Cancel</div>
      <div class="btn danger" on:click={removeList}>Delete List</div>
    </div>
  </div>
{:else}
  <h2 class="title">
    {list.title}
    <div class="btn small edit-btn-for-list" on:click={onEditMode}>Edit</div>
  </h2>
{/if}

<!-- edit 모드일때 / 아니면 타이틀 보임 -->
<style lang="scss">
  h2.title {
    font-weight: 700;
    padding: 4px 8px;
    cursor: pointer;
    position: relative;
    .btn {
      position: absolute;
      top: 0;
      right: 0;
      display: none;
    }
  }
  :global(.list__inner:hover .edit-btn-for-list) {
    display: block !important;
  }
</style>
