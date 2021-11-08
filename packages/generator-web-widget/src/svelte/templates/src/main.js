import webWidgetSvelte from "web-widget-svelte";
import App from "./App.svelte";

const svelteLifecycles = webWidgetSvelte({
  component: App,
});

export const { bootstrap, mount, unmount } = svelteLifecycles;
