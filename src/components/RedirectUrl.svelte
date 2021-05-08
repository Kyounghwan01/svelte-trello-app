<script>
  import { push, querystring } from "svelte-spa-router";
  import { parse } from "qs";
  import { onMount } from "svelte";

  onMount(() => {
    push(`/board?id=${parse($querystring).id}`);
  });
</script>

<div />
