import Main from "~/components/Main.svelte";
import ListContainer from "~/components/ListContainer.svelte";
import RedirectUrl from "~/components/RedirectUrl.svelte";

const routes = {
  "/": Main,
  "/board": ListContainer,
  "/refresh": RedirectUrl
};

export default routes;
