// vite.config.ts
import { defineConfig } from "file:///Users/fidelsilva/Documents/UPC/master/proyecto_final/proyecto-final/frontend/node_modules/vite/dist/node/index.js";
import reactRefresh from "file:///Users/fidelsilva/Documents/UPC/master/proyecto_final/proyecto-final/frontend/node_modules/@vitejs/plugin-react-refresh/index.js";
import path from "path";
var __vite_injected_original_dirname = "/Users/fidelsilva/Documents/UPC/master/proyecto_final/proyecto-final/frontend";
var vite_config_default = defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      "@assets": path.resolve(__vite_injected_original_dirname, "src/assets"),
      "@common": path.resolve(__vite_injected_original_dirname, "src/common"),
      "@hooks": path.resolve(__vite_injected_original_dirname, "src/hooks"),
      "@components": path.resolve(__vite_injected_original_dirname, "src/components"),
      "@helpers": path.resolve(__vite_injected_original_dirname, "src/helpers"),
      "@layouts": path.resolve(__vite_injected_original_dirname, "src/layouts"),
      "@models": path.resolve(__vite_injected_original_dirname, "src/models"),
      "@pages": path.resolve(__vite_injected_original_dirname, "src/pages"),
      "@services": path.resolve(__vite_injected_original_dirname, "src/services"),
      "@stores": path.resolve(__vite_injected_original_dirname, "src/stores"),
      "@styles": path.resolve(__vite_injected_original_dirname, "src/styles")
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000"
      },
      "/socket.io": {
        target: "ws://localhost:5174",
        ws: true
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvZmlkZWxzaWx2YS9Eb2N1bWVudHMvVVBDL21hc3Rlci9wcm95ZWN0b19maW5hbC9wcm95ZWN0by1maW5hbC9mcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2ZpZGVsc2lsdmEvRG9jdW1lbnRzL1VQQy9tYXN0ZXIvcHJveWVjdG9fZmluYWwvcHJveWVjdG8tZmluYWwvZnJvbnRlbmQvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2ZpZGVsc2lsdmEvRG9jdW1lbnRzL1VQQy9tYXN0ZXIvcHJveWVjdG9fZmluYWwvcHJveWVjdG8tZmluYWwvZnJvbnRlbmQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuLy8gaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IHJlYWN0UmVmcmVzaCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdC1yZWZyZXNoJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdFJlZnJlc2goKV0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0Bhc3NldHMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2Fzc2V0cycpLFxuICAgICAgJ0Bjb21tb24nOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2NvbW1vbicpLFxuICAgICAgJ0Bob29rcyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvaG9va3MnKSxcbiAgICAgICdAY29tcG9uZW50cyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvY29tcG9uZW50cycpLFxuICAgICAgJ0BoZWxwZXJzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9oZWxwZXJzJyksXG4gICAgICAnQGxheW91dHMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2xheW91dHMnKSxcbiAgICAgICdAbW9kZWxzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9tb2RlbHMnKSxcbiAgICAgICdAcGFnZXMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3BhZ2VzJyksXG4gICAgICAnQHNlcnZpY2VzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9zZXJ2aWNlcycpLFxuICAgICAgJ0BzdG9yZXMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3N0b3JlcycpLFxuICAgICAgJ0BzdHlsZXMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3N0eWxlcycpLFxuICAgIH0sXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIHByb3h5OiB7XG4gICAgICAnL2FwaSc6IHtcbiAgICAgICAgdGFyZ2V0OiAnaHR0cDovL2xvY2FsaG9zdDo4MDAwJ1xuICAgICAgfSxcbiAgICAgICcvc29ja2V0LmlvJzpcbiAgICAgIHtcbiAgICAgICAgdGFyZ2V0OiAnd3M6Ly9sb2NhbGhvc3Q6NTE3NCcsXG4gICAgICAgIHdzOiB0cnVlLCAgICAgICAgXG4gICAgICB9XG4gICAgfSxcbiAgfVxufSkiXSwKICAibWFwcGluZ3MiOiAiO0FBQXlaLFNBQVMsb0JBQW9CO0FBRXRiLE9BQU8sa0JBQWtCO0FBQ3pCLE9BQU8sVUFBVTtBQUhqQixJQUFNLG1DQUFtQztBQU16QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsYUFBYSxDQUFDO0FBQUEsRUFDeEIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsV0FBVyxLQUFLLFFBQVEsa0NBQVcsWUFBWTtBQUFBLE1BQy9DLFdBQVcsS0FBSyxRQUFRLGtDQUFXLFlBQVk7QUFBQSxNQUMvQyxVQUFVLEtBQUssUUFBUSxrQ0FBVyxXQUFXO0FBQUEsTUFDN0MsZUFBZSxLQUFLLFFBQVEsa0NBQVcsZ0JBQWdCO0FBQUEsTUFDdkQsWUFBWSxLQUFLLFFBQVEsa0NBQVcsYUFBYTtBQUFBLE1BQ2pELFlBQVksS0FBSyxRQUFRLGtDQUFXLGFBQWE7QUFBQSxNQUNqRCxXQUFXLEtBQUssUUFBUSxrQ0FBVyxZQUFZO0FBQUEsTUFDL0MsVUFBVSxLQUFLLFFBQVEsa0NBQVcsV0FBVztBQUFBLE1BQzdDLGFBQWEsS0FBSyxRQUFRLGtDQUFXLGNBQWM7QUFBQSxNQUNuRCxXQUFXLEtBQUssUUFBUSxrQ0FBVyxZQUFZO0FBQUEsTUFDL0MsV0FBVyxLQUFLLFFBQVEsa0NBQVcsWUFBWTtBQUFBLElBQ2pEO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLFFBQ04sUUFBUTtBQUFBLE1BQ1Y7QUFBQSxNQUNBLGNBQ0E7QUFBQSxRQUNFLFFBQVE7QUFBQSxRQUNSLElBQUk7QUFBQSxNQUNOO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
