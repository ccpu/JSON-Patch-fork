if (typeof window === 'undefined') {
  const jsdom = require("jsdom");
  const { JSDOM } = jsdom;
  const dom = new JSDOM();
  global.window = dom.window;
  global.document = dom.window.document;
}

if (typeof jsonpatch === 'undefined') {
  jsonpatch = require('./../../lib/duplex');
}

if (typeof Benchmark === 'undefined') {
  var Benchmark = require('benchmark');
  var benchmarkResultsToConsole = require('./../lib/benchmark_console_reporter.js').benchmarkResultsToConsole;
}

var suite = new Benchmark.Suite();
suite.add('generate operation', {
  setup: function() {
    var obj = {
      firstName: 'Albert',
      lastName: 'Einstein',
      phoneNumbers: [
        {
          number: '12345'
        },
        {
          number: '45353'
        }
      ]
    };
    var observer = jsonpatch.observe(obj);
  },
  fn: function() {
    obj.firstName = 'Joachim';
    obj.lastName = 'Wester';
    obj.phoneNumbers[0].number = '123';
    obj.phoneNumbers[1].number = '456';

    var patches = jsonpatch.generate(observer);
  }
});
suite.add('generate operation and re-apply', {
  setup: function() {
    var obj = {
      firstName: 'Albert',
      lastName: 'Einstein',
      phoneNumbers: [
        {
          number: '12345'
        },
        {
          number: '45353'
        }
      ]
    };
    var observer = jsonpatch.observe(obj);
  },
  fn: function() {
    obj.firstName = 'Joachim';
    obj.lastName = 'Wester';
    obj.phoneNumbers[0].number = '123';
    obj.phoneNumbers[1].number = '456';

    var patches = jsonpatch.generate(observer);
    obj2 = {
      firstName: 'Albert',
      lastName: 'Einstein',
      phoneNumbers: [
        {
          number: '12345'
        },
        {
          number: '45353'
        }
      ]
    };

    jsonpatch.applyPatch(obj2, patches);
  }
});
suite.add('compare operation', {
  setup: function() {
    var obj = {
      firstName: 'Albert',
      lastName: 'Einstein',
      phoneNumbers: [
        {
          number: '12345'
        },
        {
          number: '45353'
        }
      ]
    };
    var obj2 = {
      firstName: 'Joachim',
      lastName: 'Wester',
      mobileNumbers: [
        {
          number: '12345'
        },
        {
          number: '45353'
        }
      ]
    };
  },
  fn: function() {
    var patches = jsonpatch.compare(obj, obj2);
  }
});

suite.add('compare operation same but deep objects', {
  setup: function() {
    var depth = 10;

    function shallowObj() {
      return {
        shallow: {
          firstName: 'Tomek',
          lastName: 'Wytrebowicz',
          mobileNumbers: [
            {
              number: '12345'
            },
            {
              number: '45353'
            }
          ]
        }
      };
    }
    var obj = shallowObj();
    var node = obj;
    while (depth-- > 0) {
      node.nested = shallowObj();
      node = node.nested;
    }
    var obj2 = obj;
  },
  fn: function() {
    var patches = jsonpatch.compare(obj, obj2);
  }
});

// Benchmark generating test operations
suite.add('generate operation, invertible = true', {
  setup: function() {
    var obj = {
      firstName: 'Albert',
      lastName: 'Einstein',
      phoneNumbers: [
        {
          number: '12345'
        },
        {
          number: '45353'
        }
      ]
    };
    var observer = jsonpatch.observe(obj);
  },
  fn: function() {
    obj.firstName = 'Joachim';
    obj.lastName = 'Wester';
    obj.phoneNumbers[0].number = '123';
    obj.phoneNumbers[1].number = '456';

    var patches = jsonpatch.generate(observer, true);
  }
});
suite.add('generate operation and re-apply, invertible = true', {
  setup: function() {
    var obj = {
      firstName: 'Albert',
      lastName: 'Einstein',
      phoneNumbers: [
        {
          number: '12345'
        },
        {
          number: '45353'
        }
      ]
    };
    var observer = jsonpatch.observe(obj);
  },
  fn: function() {
    obj.firstName = 'Joachim';
    obj.lastName = 'Wester';
    obj.phoneNumbers[0].number = '123';
    obj.phoneNumbers[1].number = '456';

    var patches = jsonpatch.generate(observer, true);
    obj2 = {
      firstName: 'Albert',
      lastName: 'Einstein',
      phoneNumbers: [
        {
          number: '12345'
        },
        {
          number: '45353'
        }
      ]
    };

    jsonpatch.applyPatch(obj2, patches);
  }
});
suite.add('compare operation, invertible = true', {
  setup: function() {
    var obj = {
      firstName: 'Albert',
      lastName: 'Einstein',
      phoneNumbers: [
        {
          number: '12345'
        },
        {
          number: '45353'
        }
      ]
    };
    var obj2 = {
      firstName: 'Joachim',
      lastName: 'Wester',
      mobileNumbers: [
        {
          number: '12345'
        },
        {
          number: '45353'
        }
      ]
    };
  },
  fn: function() {
    var patches = jsonpatch.compare(obj, obj2, true);
  }
});

suite.add('compare operation same but deep objects, invertible = true', {
  setup: function() {
    var depth = 10;

    function shallowObj() {
      return {
        shallow: {
          firstName: 'Tomek',
          lastName: 'Wytrebowicz',
          mobileNumbers: [
            {
              number: '12345'
            },
            {
              number: '45353'
            }
          ]
        }
      };
    }
    var obj = shallowObj();
    var node = obj;
    while (depth-- > 0) {
      node.nested = shallowObj();
      node = node.nested;
    }
    var obj2 = obj;
  },
  fn: function() {
    var patches = jsonpatch.compare(obj, obj2, true);
  }
});

// if we are in the browser with benchmark < 2.1.2
if (typeof benchmarkReporter !== 'undefined') {
  benchmarkReporter(suite);
} else {
  suite.on('complete', function() {
    benchmarkResultsToConsole(suite);
  });
  suite.run();
}
