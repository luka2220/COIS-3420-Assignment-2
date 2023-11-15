// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "pages/about.html"),
        contact: resolve(__dirname, "pages/contact.html"),
        login: resolve(__dirname, "pages/login.html"),
        products: resolve(__dirname, "pages/products.html"),
        profile: resolve(__dirname, "pages/profile.html"),
      },
    },
  },
});
