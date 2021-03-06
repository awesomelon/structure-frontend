module.exports = ({ file, options, env }) => ({
	parser: file.extname === '.sss' ? 'sugarss' : false,
	plugins: [require('autoprefixer')(), require('cssnano')]
});
