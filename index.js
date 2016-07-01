var spawn = require('child_process').spawn,
    Stream = require('stream'),
    fs = require('fs'),
    Options = require('./options');

function Camera() {}

var opts = new Options();

var raspistill = function(options, callback) {
    var args = opts.process(options);

    var child = spawn('raspistill', args.concat(['-o',  '-'])
        .on('error', function(error) {
            callback(error);
        }));

    var stream = new Stream();
    child.stderr.on('data', stream.emit.bind(stream, 'error'));
    child.stdout.on('data', stream.emit.bind(stream, 'data'));
    child.stdout.on('end', stream.emit.bind(stream, 'end'));
    child.on('error', stream.emit.bind(stream, 'error'));

    callback(null, stream);
};

Camera.prototype.getImageAsStream = function (options, callback) {
    try {
        if (typeof options !== 'object') {
            callback('Option property should be an object, or null');
        }

        raspistill(options, callback);
    } catch (error) {
        callback(error);
    }
};

Camera.prototype.getImageAsFile = function (options, filename, callback) {
    try {
        if (typeof options !== 'object') {
            callback('Option property should be an object, or null');
        }

        if (typeof filename !== 'string') {
            callback('filename property should be a string');
        }

        raspistill(options, function(err, stream) {
            if (err) {
                callback(err);
                return;
            }

            stream.on('finish', function() {
                callback(null);
            });

            stream.on('error', function(e) {
                callback(e);
            });

            stream.pipe(fs.createWriteStream(filename));
        });
    } catch (error) {
        callback(error);
    }
};

module.exports = Camera;