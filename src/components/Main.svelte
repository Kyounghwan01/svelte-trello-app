<script>
  import { onMount } from "svelte";
  import { link } from "svelte-spa-router";
  import active from "svelte-spa-router/active";
  import { lists } from "~/store/list";

  onMount(() => {
    console.log($lists);
    250, 251, 252;
  }, []);

  Object.assign(document.body.style, {
    backgroundColor: "rgb(250,251,252)",
    backgroundImage: ""
  });
</script>

<div class="main-container">
  <div class="main-container__title">
    <div class="main-container__title__logo">P</div>
    <div class="main-container__title__desc">Personal boards</div>
  </div>

  <div class="main-container__content">
    {#each $lists as list}
      <span class="overlay">
        <p>{list.title}</p>
        <img src="/bg.jpeg" class="img-responsive" alt="about img 2" />
      </span>
    {/each}

    <div class="main-container__content__create-board">Create new Board</div>
  </div>
</div>

<style lang="scss">
  .main-container {
    width: 60%;
    padding: 30px;
    margin: 0 auto;
    &__title {
      display: flex;
      margin-bottom: 20px;
      &__logo {
        background: linear-gradient(#b22865, #cd5a91);
        display: flex;
        align-items: center;
        justify-content: center;
        height: 36px;
        width: 36px;
        border-radius: 5px;
        font-size: 20px;
        color: #fff;
        font-weight: 700;
      }
      &__desc {
        display: inline-block;
        line-height: 24px;
        margin: 4px 0 0 4px;
        font-size: 16px;
        font-weight: 700;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    &__content {
      display: grid;
      grid-gap: 10px;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      .overlay {
        position: relative;
        display: inline-block;
        width: 200px;
        img {
          width: 200px;
          background-size: cover;
          background-position: 50%;
          height: 100px;
          vertical-align: middle;
        }
        p {
          position: absolute;
          width: 150px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: white;
          font-weight: bold;
        }
        &::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: #000;
          opacity: 0;
          transition: 0.5s ease;
        }
        &:hover::before {
          opacity: 0.23;
          cursor: pointer;
        }
      }
      &__create-board {
        background-color: rgba(9, 30, 66, 0.04);
        box-shadow: none;
        border: none;
        color: #172b4d;
        display: table-cell;
        height: 100px;
        font-weight: 400;
        text-align: center;
        vertical-align: middle;
        width: 200px;
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
  }
</style>
