var Hapi = require('hapi'),
    path = require('path'),
    port = process.env.PORT || 3000,
    server = new Hapi.Server(port),
    routes = {
        css: {
            method: 'GET',
            path: '/styles/{path*}',
            handler: createDirectoryRoute('styles')
        },
        js: {
            method: 'GET',
            path: '/scripts/{path*}',
            handler: createDirectoryRoute('scripts')
        },
        assets: {
            method: 'GET',
            path: '/assets/{path*}',
            handler: createDirectoryRoute('assets')
        },
        templates: {
            method: 'GET',
            path: '/templates/{path*}',
            handler: createDirectoryRoute('templates')
        },
        spa: {
            method: 'GET',
            path: '/{path*}',
            handler: {
                file: path.join(__dirname, '/app/index.html')
            }
        }
    };

server.route([ routes.css, routes.js, routes.assets, routes.templates, routes.spa ]);

server.start( onServerStarted );

server.on('response', function (request) {
    if(request.url.path.includes('templates')) {
        console.log();
        console.log(new Date().toString() + ':  ' + request.method.toUpperCase() + ' - ' + request.url.path + ' - (' + request.response.statusCode + ')');
    }
});

function onServerStarted() {
    console.log( 'Server running on port ', port );
}

function createDirectoryRoute(directory) {
    return {
        directory: {
            path: path.join(__dirname, '/app/', directory)
        }
    };
}

module.exports = server;
