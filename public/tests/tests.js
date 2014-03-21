var assert = chai.assert;

suite('Tokens', function() {
    test('Asignacion y Suma: ', function() {
     original.value = "d = 4 + 6";
     var esperado = '[{"type": "=","left": {"type": "ID","value": "d"},"right": {"type": "+","left": {"type": "NUM","value": 4},"right": {"type": "NUM","value": 6}}}]';
     main ();
       assert.deepEqual(OUTPUT.innerHTML, esperado);
    });
   test('Asignacion y Producto: ', function() {
     original.value = "d = 4*4;";
     var esperado = '[[{"type": "=","left": {"type": "ID", "value": "d" }, "right": { "type": "*", "left": {"type": "NUM", "value": 4},"right": {"type": "NUM", "value": 4  } } }], null]';    
     main ();
       assert.deepEqual(OUTPUT.innerHTML, esperado);
    });
   test('Condicion: ', function() {
     original.value = "e = 6; if e < 10 then p e";
     var esperado = '[ [   {     "type": "=",     "left": {        "type": "ID",        "value": "e"      },      "right": {        "type": "NUM",        "value": 6      }    }  ],  [    {      "type": "IF",      "left": {        "type": "<",        "left": {          "type": "ID",          "value": "e"        },        "right": {          "type": "NUM",          "value": 10        }      },      "right": {        "type": "P",        "value": {          "type": "ID",          "value": "e"        }      }    }  ]]';
       assert.deepEqual(OUTPUT.innerHTML, esperado);
    });
   test('Bucle while: ', function() {
     original.value = "while n < 18 do begin n = n + 1; p b end";
     var esperado = '[  {    "type": "WHILE",    "left": {      "type": "<",      "left": {        "type": "ID",        "value": "n"      },      "right": {        "type": "NUM",        "value": 18      }    },    "right": {      "type": "BEGIN",      "left": [        [          {            "type": "=",            "left": {              "type": "ID",              "value": "n"            },            "right": {              "type": "+",              "left": {                "type": "ID",                "value": "n"              },              "right": {                "type": "NUM",                "value": 1              }            }          }        ],        [          {            "type": "P",            "value": {              "type": "ID",              "value": "b"            }          }        ]      ]    }  }]';
     main ();
       assert.deepEqual(OUTPUT.innerHTML, esperado);
  });
   test('Error: ', function() {
     original.value = "(e = ;10";
     main ();
       assert.match(OUTPUT.innerHTML, /Error/);
    });
});