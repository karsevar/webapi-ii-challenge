const server = require('./server.js');

const port = 8000;

server.listen(port, () => {
    console.log(`api on port ${port}`)
});
