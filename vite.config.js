import { defineConfig } from 'vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig(() => {
  return {
    plugins: [
      ViteImageOptimizer({
        png: {
					quality: 40,
				},
				jpeg: {
					quality: 40,
				},
				jpg: {
					quality: 40,
				}
      }),
    ],
		css: {
			preprocessorOptions: {
				scss: {
					api: 'modern'
				}
			}
		}
  };
});