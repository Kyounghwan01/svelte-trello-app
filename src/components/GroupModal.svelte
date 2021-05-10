<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  const changeGroupModal = () => {
    dispatch("changeGroupModal", false);
  };
</script>

<div class="group-modal">
  <div class="group-modal__header">
    <i class="fas fa-chevron-left" />
    <div class="group-modal__header__title">
      <span>Add to Workspace</span>
    </div>
    <i class="fas fa-times" on:click={changeGroupModal} />
  </div>
  <div class="group-modal__content">
    <img
      src="/build-team.png"
      alt="그룹이미지"
      class="group-modal__content__img"
    />
    <div class="group-modal__content__title">Build your dream team</div>
    <div class="group-modal__content__desc">
      Workspaces make it easy to organize boards and members in one place.
    </div>
    <div class="btn success group-modal__content__btn">Add to Workspace</div>
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
    }
  }
</style>
