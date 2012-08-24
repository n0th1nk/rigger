var assert = require('assert'),
    rigger = require('..'),
    fs = require('fs'),
    path = require('path'),
    inputPath = path.resolve(__dirname, 'input-aliases'),
    outputPath = path.resolve(__dirname, 'output'),
    files = fs.readdirSync(inputPath),
    riggerOpts = {
        aliases: {
            testdir: '../includes/testdir',
            input: '../input/'
        }
    };

// run tests for each of the input files
describe('aliases replacement rigging tests', function() {
    
    // create a test for each of the input files
    (files || []).forEach(function(file) {
        it('should be able to rig: ' + file, function(done) {
            var targetPath = path.join(inputPath, file);
            
            fs.stat(targetPath, function(err, stats) {
                if ((! err) && stats.isFile()) {
                    // read the output file
                    fs.readFile(path.join(outputPath, file), 'utf8', function(refErr, reference) {
                        assert.ifError(refErr, 'No output file found for test');

                        rigger(path.join(inputPath, file), riggerOpts, function(parseErr, parsed) {
                            if (! parseErr) {
                                assert.equal(parsed, reference);
                            }

                            done(parseErr);
                        });
                    });
                }
                else {
                    done(err);
                }
            });
        });
    });
});