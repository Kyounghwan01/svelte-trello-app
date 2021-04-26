import Main from "~/components/Main.svelte";
import ListContainer from "~/components/ListContainer.svelte";

const routes = {
  "/": Main,
  "/board": ListContainer
};

export default routes;
