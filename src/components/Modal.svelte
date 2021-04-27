<script>
  export let showModal;
</script>

{#if showModal}
  <div class="backdrop" on:click|self>
    <div class="modal">
      <slot />
    </div>
  </div>
{/if}

<style>
  .backdrop {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 3;
  }
  .modal {
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    margin: 0 auto;
    padding: 10px;
    border-radius: 4px;
    text-align: center;
    background-image: url(/bg.jpeg);
    background-size: cover;
  }
</style>
