<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  let step = 2;

  const changeGroupModal = () => {
    dispatch("changeGroupModal", false);
  };
</script>

<div class="group-modal">
  <div class="group-modal__header">
    <i
      class={`fas fa-chevron-left ${step === 1 ? "invisible" : ""}`}
      on:click={() => (step = step - 1)}
    />
    <div class="group-modal__header__title">
      <span>Add to Workspace</span>
    </div>
    <i class="fas fa-times" on:click={changeGroupModal} />
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
        Add to Workspace
      </div>
    {:else}
      <div class="group-modal__content__step-2__label">Your Workspaces</div>
      <!-- select option -> Create a new Workspace이면 step3, 
        label - Workspace name
        text input
        add to workspace 버튼 disabled


        option에서 선택했으면 addf to workspace success로 바꾸고 버튼 누르면 group 활성화
      -->
      <div
        class="btn group-modal__content__btn disabled"
        on:click={() => (step = 2)}
      >
        Add to Workspace
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
</style>
