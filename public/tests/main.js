var main, parse,OUTPUT;

main = function() {
  var result, source;
  source =  cadena;
  try {
    result = JSON.stringify(parse(source), null, 2);
  } catch (_error) {
    result = _error;
    result = "<div class=\"error\">" + result + "</div>";
  }
  return OUTPUT.innerHTML = result;
};

window.onload = function() {
  return PARSE.onclick = main;
};

Object.constructor.prototype.error = function(message, t) {
  t = t || this;
  t.name = "SyntaxError";
  t.message = message;
  throw treturn;
};

RegExp.prototype.bexec = function(str) {
  var i, m;
  i = this.lastIndex;
  m = this.exec(str);
  if (m && m.index === i) {
    return m;
  }
  return null;
};

String.prototype.tokens = function() {
  var ADDSUBOP, COMPARISON, ID, MULTDIVOP, MULTIPLELINECOMMENT, NUM, ONECHAROPERATORS, ONELINECOMMENT, RESERVED_WORD, STRING, WHITES, from, getTok, i, key, m, make, n, result, rw, tokens, value;
  from = void 0;
  i = 0;
  n = void 0;
  m = void 0;
  result = [];
  WHITES = /\s+/g;
  ID = /[a-zA-Z_]\w*/g;
  NUM = /\b\d+(\.\d*)?([eE][+-]?\d+)?\b/g;
  STRING = /('(\\.|[^'])*'|"(\\.|[^"])*")/g;
  ADDSUBOP = /[+-]/g;
  MULTDIVOP = /[*\/]/g;
  ONELINECOMMENT = /\/\/.*/g;
  COMPARISON = /[<>=!]=|[<>]/g;
  MULTIPLELINECOMMENT = /\/[*](.|\n)*?[*]\//g;
  ONECHAROPERATORS = /([=()&|;:,<>\.{}[\]])/g;
  tokens = [COMPARISON, ADDSUBOP, MULTDIVOP, WHITES, ID, NUM, STRING, ONELINECOMMENT, MULTIPLELINECOMMENT, ONECHAROPERATORS];
  RESERVED_WORD = {
    p: "P",
    "if": "IF",
    then: "THEN",
    "while": "WHILE",
    "do": "DO",
    call: "CALL",
    begin: "BEGIN",
    end: "END",
    "const": "CONST",
    "var": "VAR",
    procedure: "PROCEDURE"
  };
  make = function(type, value) {
    return {
      type: type,
      value: value,
      from: from,
      to: i
    };
  };
  getTok = function() {
    var str;
    str = m[0];
    i += str.length;
    return str;
  };
  if (!this) {
    return;
  }
  while (i < this.length) {
    for (key in tokens) {
      value = tokens[key];
      value.lastIndex = i;
    }
    from = i;
    if (m == WHITES.bexec(this) || (m == ONELINECOMMENT.bexec(this)) || (m == MULTIPLELINECOMMENT.bexec(this))) {
      getTok();
    } else if (m == ID.bexec(this)) {
      rw = RESERVED_WORD[m[0]];
      if (rw) {
        result.push(make(rw, getTok()));
      } else {
        result.push(make("ID", getTok()));
      }
    } else if (m == NUM.bexec(this)) {
      n = +getTok();
      if (isFinite(n)) {
        result.push(make("NUM", n));
      } else {
        make("NUM", m[0]).error("Bad number");
      }
    } else if (m == STRING.bexec(this)) {
      result.push(make("STRING", getTok().replace(/^["']|["']$/g, "")));
    } else if (m == COMPARISON.bexec(this)) {
      result.push(make("COMPARISON", getTok()));
    } else if (m == ADDSUBOP.bexec(this)) {
      result.push(make("ADDSUBOP", getTok()));
    } else if (m == MULTDIVOP.bexec(this)) {
      result.push(make("MULTDIVOP", getTok()));
    } else if (m == ONECHAROPERATORS.bexec(this)) {
      result.push(make(m[0], getTok()));
    } else {
      throw "Syntax error near '" + (this.substr(i)) + "'";
    }
  }
  return result;
};

parse = function(input) {
  var block, condition, expression, factor, lookahead, match, program, statement, statements, term, tokens, tree;
  tokens = input.tokens();
  lookahead = tokens.shift();
  match = function(t) {
    if (lookahead.type === t) {
      lookahead = tokens.shift();
      if (typeof lookahead === "undefined") {
        lookahead = null;
      }
    } else {
      throw ("Syntax Error. Expected " + t + " found '") + lookahead.value + "' near '" + input.substr(lookahead.from) + "'";
    }
  };
  statements = function() {
    var result;
    result = [program()];
    while (lookahead && lookahead.type === ";") {
      match(";");
      result.push(program());
    }
    if (result.length === 1) {
      return result[0];
    } else {
      return result;
    }
  };
  program = function() {
    var result;
    if (lookahead && lookahead.type === ".") {
      match(".");
    } else {
      result = block();
    }
    return result;
  };
  block = function() {
    var left, result, result1, right, _results, _results1;
    result = null;
    if (lookahead) {
      switch (lookahead.type) {
        case "CONST":
          _results = [];
          while (lookahead && (lookahead.type === "CONST" || lookahead.type === ",")) {
            if (lookahead.type === "CONST") {
              match("CONST");
            } else if (lookahead.type === ",") {
              match(",");
            }
            left = {
              type: "ID",
              value: lookahead.value
            };
            match("ID");
            match("=");
            right = {
              type: "NUM",
              value: lookahead.value
            };
            match("NUM");
            result = {
              type: "CONST",
              left: left,
              right: right
            };
            _results.push(result);
          }
          return _results;
        case "VAR":
          _results1 = [];
          while (lookahead && (lookahead.type === "VAR" || lookahead.type === ",")) {
            if (lookahead.type === "VAR") {
              match("VAR");
            } else if (lookahead.type === ",") {
              match(",");
            }
            result = {
              type: "VAR",
              value: lookahead.value
            };
            match("ID");
            _results1.push(result);
          }
          return _results1;
        case "PROCEDURE":
          match("PROCEDURE");
          left = lookahead.value;
          match("ID");
          match(";");
          right = block();
          match(";");
          result1 = {
            left: left,
            right: right
          };
          result = {
            left: result1,
            right: statements()
          };
          return result;
        default:
          return result = [statement()];
      }
    }
  };
  statement = function() {
    var left, result, right;
    result = null;
    if (lookahead) {
      switch (lookahead.type) {
        case "ID":
          left = {
            type: "ID",
            value: lookahead.value
          };
          match("ID");
          match("=");
          right = expression();
          result = {
            type: "=",
            left: left,
            right: right
          };
          break;
        case "P":
          match("P");
          right = expression();
          result = {
            type: "P",
            value: right
          };
          break;
        case "CALL":
          match("CALL");
          result = {
            type: "CALL",
            value: lookahead.value
          };
          match("ID");
          break;
        case "BEGIN":
          match("BEGIN");
          left = statements();
          match("END");
          result = {
            type: "BEGIN",
            left: left,
            right: right
          };
          break;
        case "IF":
          match("IF");
          left = condition();
          match("THEN");
          right = statement();
          result = {
            type: "IF",
            left: left,
            right: right
          };
          break;
        case "WHILE":
          match("WHILE");
          left = condition();
          match("DO");
          right = statement();
          result = {
            type: "WHILE",
            left: left,
            right: right
          };
          break;
        default:
          throw "Syntax Error. Expected identifier but found " + (lookahead ? lookahead.value : "end of input") + (" near '" + (input.substr(lookahead.from)) + "'");
      }
    }
    return result;
  };
  condition = function() {
    var left, result, right, type;
    left = expression();
    type = lookahead.value;
    match("COMPARISON");
    right = expression();
    result = {
      type: type,
      left: left,
      right: right
    };
    return result;
  };
  expression = function() {
    var result, right, type;
    result = term();
    while (lookahead && lookahead.type === "ADDSUBOP") {
      type = lookahead.value;
      match("ADDSUBOP");
      right = term();
      result = {
        type: type,
        left: result,
        right: right
      };
    }
    return result;
  };
  term = function() {
    var result, right, type;
    result = factor();
    while (lookahead && lookahead.type === "MULTDIVOP") {
      type = lookahead.value;
      match("MULTDIVOP");
      right = factor();
      result = {
        type: type,
        left: result,
        right: right
      };
    }
    return result;
  };
  factor = function() {
    var result;
    result = null;
    switch (lookahead.type) {
      case "NUM":
        result = {
          type: "NUM",
          value: lookahead.value
        };
        match("NUM");
        break;
      case "ID":
        result = {
          type: "ID",
          value: lookahead.value
        };
        match("ID");
        break;
      case "(":
        match("(");
        result = expression();
        match(")");
        break;
      default:
        throw "Syntax Error. Expected number or identifier or '(' but found " + (lookahead ? lookahead.value : "end of input") + " near '" + input.substr(lookahead.from) + "'";
    }
    return result;
  };
  tree = statements(input);
  if (lookahead !== null) {
    throw "Syntax Error parsing statements. " + "Expected 'end of input' and found '" + input.substr(lookahead.from) + "'";
  }
  return tree;
};
