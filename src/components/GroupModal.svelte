<script>
  import { onMount, createEventDispatcher, tick } from "svelte";
  import { boardData, boards } from "~/store/board";
  import _uniqBy from "lodash/uniqBy";

  const dispatch = createEventDispatcher();

  let step = 1;
  let groupTitle = "";
  let groupArray = [];
  let textInput;

  onMount(() => {
    if ($boardData.group) {
      step = 2;
      groupTitle = $boardData.group;
    }

    getGroupArray();
  });

  $: {
    if (groupTitle === "create") {
      goStep3();
    }
  }

  const getGroupArray = () => {
    groupArray = _uniqBy(
      $boards.filter(board => board.group).map(board => board.group)
    );
  };

  const goStep3 = async () => {
    groupTitle = "";
    step = 3;
    await tick();
    textInput && textInput.focus();
  };

  const changeGroupModal = e => {
    e.stopPropagation();
    dispatch("changeGroupModal", false);
  };

  const goBack = () => {
    step = step - 1;
    groupTitle = "";
  };

  const assignGroup = () => {
    boards.assignGroup({ title: groupTitle });
    getGroupArray();
    dispatch("changeGroupModal", false);
  };
</script>

<div class="group-modal">
  <div class="group-modal__header">
    <i
      class={`fas fa-chevron-left ${step === 1 ? "invisible" : ""}`}
      on:click={goBack}
    />
    <div class="group-modal__header__title">
      <span>{step === 3 ? "Create" : "Change"} Workspace</span>
    </div>
    <i class="fas fa-times" on:click={e => changeGroupModal(e)} />
  </div>
  <div class="group-modal__content">
    {#if step === 1}
      <img
        src="/build-team.png"
        alt="그룹이미지"
        class="group-modal__content__img"
      />
      <div class="group-modal__content__title">Build your dream team</div>
      <div class="group-modal__content__desc">
        Workspaces make it easy to organize boards and members in one place.
      </div>
      <div
        class="btn success group-modal__content__btn"
        on:click={() => (step = 2)}
      >
        Change Workspace
      </div>
    {:else if step === 3}
      <div class="group-modal__content__step-2__label">Workspace type</div>
      <input
        type="text"
        bind:this={textInput}
        bind:value={groupTitle}
        placeholder="토이프로젝트"
      />
      <div
        class={`btn group-modal__content__btn ${
          !groupTitle ? "disabled" : "success"
        }`}
        on:click={assignGroup}
      >
        Create Workspace
      </div>
    {:else}
      <div class="group-modal__content__step-2__label">Your Workspaces</div>
      <select bind:value={groupTitle}>
        <option value="">none</option>
        {#each groupArray as group, index (index)}
          <option>{group}</option>
        {/each}
        <option value="create">Create new Workspace</option>
      </select>
      <div class="btn group-modal__content__btn success" on:click={assignGroup}>
        Change Workspace
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  .group-modal {
    background: #ffffff;
    width: 304px;
    padding: 12px;
    border-radius: 4px;
    &__header {
      height: 20px;
      line-height: 20px;
      text-align: center;
      display: grid;
      grid-template-columns: 12px 1fr 12px;
      border-bottom: 1px solid #eeeeee;
      padding-bottom: 10px;
      &__title {
        color: #5e6c84;
      }
      i {
        color: #5e6c84;
        font-size: 18px;
        line-height: 18px;
        &:hover {
          cursor: pointer;
        }
      }
    }
    &__content {
      margin-top: 10px;
      &__img {
        width: 304px;
        height: 160px;
      }
      &__title {
        padding-top: 15px;
        font-size: 16px;
        line-height: 20px;
        text-align: center;
        color: #000;
        font-weight: bold;
      }
      &__desc {
        text-align: center;
        font-size: 14px;
        line-height: 20px;
        color: #5e6c84;
        padding-bottom: 8px;
      }
      &__btn {
        width: 280px;
        text-align: center;
      }

      &__step-2 {
        &__label {
          font-weight: 700;
          color: #5e6c84;
          font-size: 12px;
          line-height: 16px;
          margin-top: 20px;
          margin-bottom: 4px;
          display: block;
        }
      }
    }
  }

  .invisible {
    visibility: hidden;
  }

  input,
  select {
    min-height: 36px;
    background-color: #fafbfc;
    box-shadow: inset 0 0 0 2px #dfe1e6;
    border-radius: 3px;
    -webkit-appearance: none;
    border: none;
    width: 100%;
    padding-left: 12px;
    background-size: 20px;
    background-position: right 8px center;
    outline: none;
  }
</style>
