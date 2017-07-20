const Hapi = require('hapi');
const Inert = require('inert');
const Path = require('path');

let connection = {
    port: process.env.PORT || 3000,
    host: process.env.IP || 'localhost'
};

let routes = [
    {
        method: 'GET',
        path: '/scripts/{path*}',
        handler: {
            directory: {
                path: Path.join(__dirname, '/app/scripts')
              }
        }
    },
    {
        method: 'GET',
        path: '/styles/{path*}',
        handler: {
            directory: {
                path: Path.join(__dirname, '/app/styles')
              }
        }
    },
    {
        method: 'GET',
        path: '/assets/{path*}',
        handler: {
            directory: {
                path: Path.join(__dirname, '/app/assets')
              }
        }
    },
    {
        method: 'GET',
        path: '/templates/{path*}',
        handler: {
            directory: {
                path: Path.join(__dirname, '/app/templates')
              }
        }
    },
    {
        method: 'GET',
        path: '/{path*}',
        handler: {
            file: Path.join(__dirname, '/app/index.html')
        }
    }
]

let server = new Hapi.Server();
server.connection(connection);

server.register([Inert], (err) => {
    if (err) {
        throw err;
    }

    server.route(routes);
});

server.start(() => {
    console.log('Server started at: ' + server.info.uri);
});

server.on('response', function (request) {
    if(request.url.path.includes('templates')) {
        console.log();
        console.log(new Date().toString() + ':  ' + request.method.toUpperCase() + ' - ' + request.url.path + ' - (' + request.response.statusCode + ')');
    }
});

module.exports = server;
