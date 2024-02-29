import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {fileURLToPath, URL} from "url";
import path from "path";
import remoteConsole from 'vite-plugin-remove-console'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 12421
  },
  base: './',
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./", import.meta.url)),
      "@": path.resolve(__dirname, './src'),
      web3: path.resolve(__dirname, "./node_modules/web3/dist/web3.min.js"),
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  },
  plugins: [
    vue(),
    remoteConsole(),
  ]
})
