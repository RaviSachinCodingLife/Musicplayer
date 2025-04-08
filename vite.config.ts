import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path';


export default defineConfig({
  plugins: [react()],
  // server: {
  //   host: '172.23.128.1',
  //   port: 3000, 
  // },
    assetsInclude: ["**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.gif", "**/*.svg"],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
})
