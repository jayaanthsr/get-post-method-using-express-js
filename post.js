var http = require('http');
var querystring = require('querystring');
var qs, name, email, age, phone, gen;

http.createServer(function(req, res) {
    if (req.method === 'POST') {
        var data1 = '';

        req.on('data', function(chunk) {
            console.log(chunk);
            data1 += chunk;
            console.log("Data in String format: " + data1);
        });

        req.on('end', function() {
            console.log("Data: " + data1);

            if (!data1) {
                res.writeHead(400, {'Content-Type': 'text/plain'});
                res.end('Error: No data provided.');
                return;
            }

            qs = querystring.parse(data1);
            console.log(qs);

            name = qs['name'];
            email = qs['email'];
            age = qs['age'];
            phone = qs['phone'];
            gen = qs['gender'];

            // Check if any required field is missing
            if (!name || !email || !age || !phone || !gen) {
                res.writeHead(400, {'Content-Type': 'text/plain'});
                res.end('Error: Please provide all the required information.');
                return;
            }

            // Send HTML response
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write('<!DOCTYPE html><html><head><title>Student details</title>');
            res.write('<style>');
            res.write(`
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
            res.write('</style>');
            res.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">');
            res.write('</head><body>');
            res.write('<div class="container mt-5"><table class="table">');
            res.write('<thead class="table-dark" style="background-color: black">');
            res.write('<tr>');
            res.write('<th>Name</th><th>Age</th><th>Email</th><th>Phone</th><th>Gender</th>');
            res.write('</tr>');
            res.write('</thead> ');
            res.write('<tbody>');
            res.write('<tr>');
            res.write(`<td>${name}</td><td>${age}</td><td>${email}</td><td>${phone}</td><td>${gen}</td>`);
            res.write('</tr>');
            res.write('</tbody>');
            res.write('</table></div>');
            res.write('<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>');
            res.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>');
            res.write('<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>');
            res.write('</body></html>');
            res.end();
        });
    } else {
        res.writeHead(405, {'Content-Type': 'text/plain'});
        res.end('Error: Method not allowed. Only POST requests are supported.');
    }
}).listen(7777);

console.log("Server started");
