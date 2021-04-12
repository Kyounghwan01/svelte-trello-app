<script>
  import Header from "~/components/Header.svelte";

  // document.body.style에 여러 속성을 넣을때
  Object.assign(document.body.style, {
    backgroundColor: "darkgray",
    backgroundImage: "url(/bg.jpeg)",
    backgroundSize: "cover"
  });
</script>

<Header />
