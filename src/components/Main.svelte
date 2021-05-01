<script>
  import { tick } from "svelte";
  // import { lists } from "~/store/list";
  import { boards } from "~/store/board";
  import { modal } from "~/store/modal";
  import Modal from "~/components/Modal.svelte";

  let title = "";
  let textInput;

  const toggleModal = async () => {
    title = "";
    $modal = !$modal;
    await tick();
    if ($modal) textInput && textInput.focus();
  };

  const addBoard = () => {
    if (title.trim()) {
      boards.add({ title });
    }
    toggleModal();
  };

  const changeFavorite = (e, id) => {
    e.stopPropagation();
    boards.changeFavorite({ id });
  };

  Object.assign(document.body.style, {
    backgroundColor: "#eeeeee",
    backgroundImage: ""
  });
</script>

<div class="main-container">
  <Modal showModal={$modal} on:click={toggleModal}>
    <div class="modal-block">
      <input
        bind:value={title}
        bind:this={textInput}
        type="text"
        placeholder="Add board title"
        class="create-board-input"
        on:keydown={event => {
          event.key === "Enter" && addBoard();
          event.key === "Escape" && toggleModal();
          event.key === "Esc" && toggleModal();
        }}
      />

      <div class="btn-group">
        <div
          class={title.length ? "btn success" : "btn disabled"}
          on:click={addBoard}
        >
          Create board
        </div>
        <div class="btn" on:click={toggleModal}>Cancel</div>
      </div>
    </div>
  </Modal>

  <div class="main-container__board">
    <div class="main-container__title">
      <i class="far fa-star" />
      <div class="main-container__title__desc">Stared boards</div>
    </div>

    <div class="main-container__content">
      {#each $boards as board}
        {#if board.star}
          <span class="overlay">
            <p>{board.title}</p>
            <i
              class="fas fa-star"
              on:click={e => changeFavorite(e, board.id)}
            />
            <img src="/bg.jpeg" class="img-responsive" alt="about img 2" />
          </span>
        {/if}
      {/each}
    </div>
  </div>

  <div class="main-container__board">
    <div class="main-container__title">
      <div class="main-container__title__logo">P</div>
      <div class="main-container__title__desc">Personal boards</div>
    </div>

    <div class="main-container__content">
      {#each $boards as board}
        <span class="overlay">
          <p>{board.title}</p>
          <i
            class="far fa-star"
            style="color: white; display: none"
            on:click={e => changeFavorite(e, board.id)}
          />
          <img src="/bg.jpeg" class="img-responsive" alt="about img 2" />
        </span>
      {/each}

      <div class="main-container__content__create-board" on:click={toggleModal}>
        Create new Board
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .main-container {
    width: 60%;
    padding: 30px;
    margin: 0 auto;

    &__board {
      margin-bottom: 30px;
    }
    &__title {
      display: flex;
      margin-bottom: 20px;
      i {
        font-size: 20px;
        line-height: 30px;
      }
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
      position: relative;
      .overlay {
        position: relative;
        display: inline-block;
        width: 200px;
        i {
          position: absolute;
          bottom: 10px;
          right: 10px;
        }
        img {
          width: 200px;
          background-size: cover;
          background-position: 50%;
          height: 100px;
          vertical-align: middle;
        }
        p {
          position: absolute;
          top: 10px;
          left: 10px;
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
        &:hover {
          i {
            display: block !important;
            cursor: pointer;
            transition: 1s ease;
          }
        }
      }
      &__create-board {
        background-color: rgba(9, 30, 66, 0.04);
        border: none;
        color: #172b4d;
        height: 100px;
        font-weight: 400;
        width: 200px;
        transition: 0.5s ease;
        display: flex;
        justify-content: center;
        align-items: center;
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

  .star {
    background: linear-gradient(#cc4223, #cb7d25);
  }

  .modal-block {
    width: 250px;
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .create-board-input {
      border: none !important;
      background: transparent !important;
      box-shadow: none;
      box-sizing: border-box;
      color: #fff;
      font-size: 18px;
      font-weight: 700;
      line-height: 30px;
      margin-bottom: 4px;
      padding: 2px 8px;
      &::placeholder {
        color: #eee;
      }

      &:hover {
        background: hsla(0, 0%, 100%, 0.15) !important;
        box-shadow: none;
      }
      &:focus {
        background: hsla(0, 0%, 100%, 0.3) !important;
        box-shadow: none;
        outline: none;
      }
    }
    .btn-group {
      text-align: right;
    }
  }
</style>
