'use strict';

const Hapi = require('hapi');

require('marko/node-require').install();
var template = require('./lib/views/default.marko');

const server = new Hapi.Server();
server.connection({ port: 8000 });

server.route({
    method: 'GET',
    path: '/{name*}',
    handler: function (request, reply) {
        return reply(template.stream({ "name": request.params.name }));
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});