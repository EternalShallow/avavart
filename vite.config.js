import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {fileURLToPath, URL} from "url";
import path from "path";
import remoteConsole from 'vite-plugin-remove-console'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 12421,
    // proxy: {
    //   "/api": {
    //     target: "http://198.46.189.214:5168",
    //     pathRewrite:{
    //       '^/api' : '' // 重写请求
    //     }
    //     // rewrite: (path) => path.replace(/^\/api/, ""),
    //   },
    // },
  },
  base: './',
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./", import.meta.url)),
      "@": path.resolve(__dirname, './src')
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  },
  plugins: [
    vue(),
    remoteConsole(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ]
})
