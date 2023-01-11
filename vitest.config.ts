import { defineConfig, configDefaults } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude],
  },
  plugins: [tsconfigPaths()],
})
