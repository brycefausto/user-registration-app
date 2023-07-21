import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import expressServerPlugin from "./plugins/expressServerPlugin"

/*
  Vite is a build tool that aims to provide a faster and leaner development experience for modern web projects. It consists of two major parts:

  A dev server that provides rich feature enhancements over native ES modules, for example extremely fast Hot Module Replacement (HMR).

  A build command that bundles your code with Rollup, pre-configured to output highly optimized static assets for production.
*/

// The express server plugin is used to run the express server with vite

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), expressServerPlugin()],
})
