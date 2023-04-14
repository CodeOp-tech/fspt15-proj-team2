import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5003",
        changeOrigin: true,
        secure: false,
      },
      "/users": {
        target: "http://localhost:5003",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
