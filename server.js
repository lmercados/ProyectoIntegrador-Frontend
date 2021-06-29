const express = require('express')
const path = require('path');
const serveStatic = require('serve-static');
const port = process.env.PORT || 3000;
const app = express();
app.use('/api', serveStatic(path.join(__dirname, '/dist')));
app.listen(port, function() {
    //  console.log('Server started on port ' + port);
})