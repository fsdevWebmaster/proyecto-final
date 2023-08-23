import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
import reactRefresh from '@vitejs/plugin-react-refresh'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@common': path.resolve(__dirname, 'src/common'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@helpers': path.resolve(__dirname, 'src/helpers'),
      '@layout': path.resolve(__dirname, 'src/layout'),
      '@models': path.resolve(__dirname, 'src/models'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@stores': path.resolve(__dirname, 'src/stores'),
      '@styles': path.resolve(__dirname, 'src/styles'),
    },
  },   
})