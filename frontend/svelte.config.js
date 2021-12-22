import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-auto";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    ssr: false,

    // hydrate the <div id="svelte"> element in src/app.html
    target: "#svelte",

    vite: {
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: '@import "src/variables.scss";',
          },
        },
      },
    },
  },

  preprocess: [
    preprocess({
      scss: {
        prependData: '@import "src/variables.scss";',
      },
    }),
  ],
};

export default config;
