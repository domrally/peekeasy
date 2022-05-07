import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// enviroment variables
const { PORT, HOST } = process.env

// https://vitejs.dev/config/
export default defineConfig({
	root: 'code',
	plugins: [svelte()],
	envDir: 'code/index/environments',
	build: { outDir: '../docs' },
	server: {
		host: HOST ?? 'localhost',
		port: Number.parseInt(PORT ?? '1234'),
	},
})
