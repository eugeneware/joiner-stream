var expect = require('chai').expect
  , joiner = require('..')
  , Stream = require('stream')
  , after = require('after');

describe('joiner stream', function() {
  function makeStream(type) {
    var s = new Stream();
    s.readable = true;

    var n = 10;
    var next = after(n, function () {
      process.nextTick(function () {
        s.emit('end');
      });
    });

    for (var i = 0; i < n; i++) {
      var o = {
        type: type,
        name: 'name ' + i,
        number: i * 10
      };

      (function (o) {
        process.nextTick(function () {
          s.emit('data', o);
          next();
        });
      })(o);
    }
    return s;
  }

  it('should be able to join multiple streams', function(done) {
    var n = 0;
    var aggregator = joiner();
    aggregator
      .on('data', function () {
        n++;
      })
      .on('end', function () {
        expect(n).to.equal(30);
        done();
      });

    makeStream('a')
      .pipe(aggregator);
    makeStream('b')
      .pipe(aggregator);
    makeStream('c')
      .pipe(aggregator);

  });
});
