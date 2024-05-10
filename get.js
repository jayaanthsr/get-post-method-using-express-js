const http = require('http');
const url = require('url');
const querystring = require('querystring');

function sam(request, response) { 
    console.log('URL ' + request.url + ' received.');
    const parsedUrl = url.parse(request.url, true);
    const path = parsedUrl.pathname;
    
    if (path === '/login') {
        console.log('Request for ' + path + ' received.');
        const query = parsedUrl.query;
        console.log("QUERY IS:");
        console.log(query);
        const { name, email, age, phone, gender } = query;

        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write('<!DOCTYPE html><html><head><title>Student details</title>');
        response.write('<style>');
        response.write(`
            .table {
                background: #e5e5e5 !important;
                border: none !important;
                box-shadow: 15px 20px 20px rgba(0,0,0,.3),
                inset 4px 4px 10px rgb(249, 232, 232);
                border-radius: 20px !important;
                overflow: hidden;
                justify-content: center;
                align-items: center;
                transition: .2s;
            }
            body {
                font-family: Arial, sans-serif;
                background-color: #00A5E3 !important;
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
            }
            .container {
                background-color: #fff;
                border-radius: 10px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
                padding: 20px;
                width: 300px;
                text-align: center;
            }
        `);
        response.write('</style>');
        response.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">');
        response.write('</head><body>');
        response.write('<div class="container mt-5"><table class="table">');
        response.write('<thead class="table-dark" style="background-color: black">');
        response.write('<tr>');
        response.write('<th>Name</th><th>Age</th><th>Email</th><th>Phone</th><th>Gender</th>');
        response.write('</tr>');
        response.write('</thead> ');
        response.write('<tbody>');
        response.write('<tr>');
        response.write(`<td>${name}</td><td>${age}</td><td>${email}</td><td>${phone}</td><td>${gender}</td>`);
        response.write('</tr>');
        response.write('</tbody>');
        response.write('</table></div>');
        response.write('<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>');
        response.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>');
        response.write('<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>');
        response.write('</body></html>');
        response.end();
    } else {
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.write('404 Not Found');
        response.end();
    }
}

http.createServer(sam).listen(8000);
console.log('Server has started...');
