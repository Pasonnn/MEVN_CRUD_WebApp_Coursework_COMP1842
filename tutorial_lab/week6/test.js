//import http from 'http'; // this is the same as second line but in real life people usually use this 
const http = require('http'); //import node.js core module
const server = http.createServer(function(req ,res){ // create server
//handling incoming requested here
if (req.url === '/') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<html><body>This is the Home Page</body></html>');
    res.end(); // Make sure to end the response
} else if (req.url === '/student') {
    res.writeHead(200, {'Content-Type': 'text/html'});8
    res.write('This is the Student Page');
    res.end(); // End the response here as well
} else if (req.url === '/admin') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('This is the Admin Page');
    res.end();
} else if (req.url === '/data') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(JSON.stringify({"message": "hello World JSON"}));
    res.end();
} else {
    res.writeHead(404, {'Content-Type': 'text/html'}); // Set a 404 status for invalid requests
    res.end('Invalid Request!');
}

});//create server 

server.listen(8000); //listen for any  incoming requests
console.log('Node.js web server at port 8000 is running');
