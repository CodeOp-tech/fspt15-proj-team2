import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    manifest: true,
    rollupOptions: {
      input: "./src/main.jsx",
    },
  },
});

// Both the front and back ends seem to be working on their own,
// but I don't know if they're connected or not.
// This post & repo helped me adjust this file.
// Repo: https://github.com/Vanaldito/React-and-Express-boilerplate
// Post: https://medium.com/@fredimanuelb/how-to-develop-a-react-and-express-application-using-vite-a493f3e844f5
