# joiner-stream

node.js stream that joins multiple pipe inputs into a single unified stream.

[![build status](https://secure.travis-ci.org/eugeneware/joiner-stream.png)](http://travis-ci.org/eugeneware/joiner-stream)

## Installation

Install via npm:

```
$ npm install joiner-stream
```

## Examples

### Join multiple streams

The reason I wrote this was to merge multiple object streams into a single stream:

``` js
var joiner = require('joiner-stream');
var aggregator = joiner();

// Stream 1
makeStreamOfObjects()
  .pipe(aggregator);

// Stream 2
makeStreamOfObjects()
  .pipe(aggregator);

// Stream 3
makeStreamOfObjects()
  .pipe(aggregator);

aggregator.on('data', console.log);
aggregator.on('end', process.exit);
```
