const path = require('path');
const fs = require('fs');

const htmlName = 'index.html';
const htmlPath = path.resolve(__dirname, 'dist', htmlName);

if (!fs.existsSync(htmlPath)) {
    throw new Error('dist/index.html does not exist');
}

fs.renameSync(htmlPath, path.resolve(__dirname, htmlName));
