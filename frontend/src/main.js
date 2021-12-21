import App from "./App.svelte";
import effectsdk from "@effectai/effect-js/dist/index";
const app = new App({
  target: document.body,
  props: {
    name: "world",
    client: new effectsdk.EffectClient("jungle"),
  },
});

export default app;
