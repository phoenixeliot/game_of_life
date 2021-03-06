// Generated by CoffeeScript 1.9.3
(function() {
  var Life, grid, options,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    modulo = function(a, b) { return (+a % (b = +b) + b) % b; };

  Life = (function(superClass) {
    extend(Life, superClass);

    Life.prototype.dirs = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

    function Life(props) {
      this.render = bind(this.render, this);
      this.step = bind(this.step, this);
      var bottom, grid, height, i, interval, left, padding, ref, results, right, top, width, wrap;
      Life.__super__.constructor.call(this, props);
      grid = props.grid, this.options = props.options;
      ref = this.options, padding = ref.padding, interval = ref.interval, wrap = ref.wrap;
      left = padding.left, right = padding.right, top = padding.top, bottom = padding.bottom;
      this.options.width = width = grid[0].length + left + right;
      this.options.height = height = grid.length + top + bottom;
      this.grid = (function() {
        results = [];
        for (var i = 0; 0 <= height ? i < height : i > height; 0 <= height ? i++ : i--){ results.push(i); }
        return results;
      }).apply(this).map(function() {
        var i, results;
        return (function() {
          results = [];
          for (var i = 0; 0 <= width ? i < width : i > width; 0 <= width ? i++ : i--){ results.push(i); }
          return results;
        }).apply(this).map(function() {
          return false;
        });
      });
      grid.forEach((function(_this) {
        return function(row, r) {
          return row.forEach(function(cell, c) {
            return _this.grid[r + top][c + left] = grid[r][c];
          });
        };
      })(this));
      setInterval(this.step, interval);
    }

    Life.prototype.isAlive = function(r, c) {
      if (!this.options.wrap && ((r === (-1) || r === this.grid.length) || (c === (-1) || c === this.grid[0].length))) {
        return false;
      }
      return this.grid[modulo(r, this.options.height)][modulo(c, this.options.width)];
    };

    Life.prototype.step = function() {
      var i, ref, results;
      this.grid = (function() {
        results = [];
        for (var i = 0, ref = this.grid.length; 0 <= ref ? i < ref : i > ref; 0 <= ref ? i++ : i--){ results.push(i); }
        return results;
      }).apply(this).map((function(_this) {
        return function(r) {
          var i, ref, results;
          return (function() {
            results = [];
            for (var i = 0, ref = _this.grid[0].length; 0 <= ref ? i < ref : i > ref; 0 <= ref ? i++ : i--){ results.push(i); }
            return results;
          }).apply(this).map(function(c) {
            var n;
            n = _this.neighborsAlive(r, c);
            if (_this.isAlive(r, c)) {
              return n === 2 || n === 3;
            } else {
              return n === 3;
            }
          });
        };
      })(this));
      return this.setState({
        data: this.grid
      });
    };

    Life.prototype.neighborsAlive = function(r, c) {
      return this.dirs.map((function(_this) {
        return function(arg) {
          var dc, dr, ref;
          dr = arg[0], dc = arg[1];
          return (ref = _this.isAlive(r + dr, c + dc)) != null ? ref : {
            1: 0
          };
        };
      })(this)).reduce(function(a, b) {
        return a + b;
      });
    };

    Life.prototype.toString = function() {
      return "\n" + this.grid.map(function(row, r) {
        return " " + row.map(function(cell, c) {
          if (cell) {
            return "*";
          } else {
            return ".";
          }
        }).reduce(function(a, b) {
          return a + b;
        });
      }).reduce(function(a, b) {
        return a + "\n" + b;
      });
    };

    Life.prototype.render = function() {
      var c, cell, div, input, r, ref, row, state;
      ref = React.DOM, div = ref.div, input = ref.input;
      return div(null, (function() {
        var i, len, ref1, results;
        ref1 = this.grid;
        results = [];
        for (r = i = 0, len = ref1.length; i < len; r = ++i) {
          row = ref1[r];
          results.push(div({
            className: "row",
            key: "row" + r
          }, (function() {
            var j, len1, results1;
            results1 = [];
            for (c = j = 0, len1 = row.length; j < len1; c = ++j) {
              cell = row[c];
              state = (this.isAlive(r, c) ? "alive" : "dead");
              results1.push(div({
                key: "col" + c,
                className: "cell " + state
              }));
            }
            return results1;
          }).call(this)));
        }
        return results;
      }).call(this));
    };

    return Life;

  })(React.Component);

  grid = [[false, true, true], [true, true, false], [false, true, false]];

  options = {
    interval: 1000 / 30,
    wrap: true,
    padding: {
      left: 30,
      right: 30,
      top: 30,
      bottom: 30
    }
  };

  React.render(React.createElement(Life, {
    "grid": grid,
    "options": options
  }), document.getElementById('content'));

}).call(this);
