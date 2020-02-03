import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'

export default {
	input: 'src/app.js',
	output: {
		file: 'docs/js/app.js',
		format: 'iife',
		name: 'bundle',
	},
	plugins: [
		resolve({
			main: true,
			browser: true
		}),
		commonjs(),
	]
}
