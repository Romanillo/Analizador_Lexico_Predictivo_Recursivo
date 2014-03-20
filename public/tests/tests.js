var assert = chai.assert;

suite('Pruebas', function() {
    test('Asignacion y Suma: ', function() {
		 original.value =  "d = 4 + 6";
		 var esperado = '[\n  {\n    "type": "=",\n    "left": {\n      "type": "ID",\n      "value": "d"\n    },\n    "right": {\n      "type": "+",\n      "left": {\n        "type": "NUM",\n        "value": 4\n      },\n      "right": {\n        "type": "NUM",\n        "value": 6\n      }\n    }\n  }\n]';
		 main ();
       assert.deepEqual(OUTPUT.innerHTML, esperado);
    });
	 test('Asignacion y Producto: ', function() {
		 original.value =  "d = 4*4;";
		 var esperado = '[\n  {\n    "type": "=",\n    "left": {\n      "type": "ID",\n      "value": "d"\n    },\n    "right": {\n      "type": "*",\n      "left": {\n        "type": "NUM",\n        "value": 4\n      },\n      "right": {\n        "type": "NUM",\n        "value": 4\n      }\n    }\n  }\n]';		 
		 main ();
       assert.deepEqual(OUTPUT.innerHTML, esperado);
    });
	 test('Condicion: ', function() {
		 original.value =  "d = 16; if d < 20 then d + 2";
		 var esperado = '[\n  [\n    {\n      "type": "=",\n      "left": {\n        "type": "ID",\n        "value": "d"\n      },\n      "right": {\n        "type": "NUM",\n        "value": 16\n          }\n    }\n  ],\n  {\n    "type": "IF",\n    "left": {\n      "type": "&lt;",\n      "left": {\n        "type": "ID",\n        "value": "d"\n      },\n      "right": {\n        "type": "NUM",\n        "value": 20\n      }\n    },\n    "right": {\n      "type": "+",\n      "left": {\n        "type": "NUM",\n        "value": 4\n      },\n      "right": {\n        "type": "NUM",\n        "value": 6\n      }\n    }\n  }\n]';
       assert.deepEqual(OUTPUT.innerHTML, esperado);
    });
	 test('Bucle while: ', function() {
		 original.value =  "while d < 20 do d + 1";
		 var esperado = '[\n  {\n    "type": "WHILE",\n    "left": {\n      "type": "&lt;",\n      "left": {\n        "type": "ID",\n        "value": "d"\n      },\n      "right": {\n        "type": "NUM",\n        "value": 20\n      }\n    },\n    "right": {\n      "type": "+",\n      "left": {\n        "type": "ID",\n        "value": "d"\n      },\n      "right": {\n        "type": "NUM",\n        "value": 1\n      }\n    }\n  }\n]';
		 main ();
       assert.deepEqual(OUTPUT.innerHTML, esperado);
	 test('Error: ', function() {
		 original.value =  "(e = ;10";
		 main ();
       assert.match(OUTPUT.innerHTML, /Error/);
    });
});