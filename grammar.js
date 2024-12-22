module.exports = grammar({
  name: 'chaiscript',

  rules: {
    // The entry point of the grammar
    source_file: $ => repeat($._statement),

    identifier: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,

    number: $ => /\d+(\.\d+)?(u|l|f|d|ul|ull)?/,
    string: $ => seq('"', /[^"]*/, '"'),
    boolean: $ => choice('true', 'false'),

    _literal: $ => choice(
        $.number,
        $.string,
        $.boolean,
    ),

    _expression: $ => choice(
        $._literal,
        $.identifier,
        $.binary_expression,
        $.unary_expression,
        $.vector,
        $.map,
        $.lambda,
    ),

    _statement: $ => choice(
        $.variable_declaration,
        $.for_statement,
        $.while_statement,
        $.switch_statement,
        $.case_statement,
        $.function_definition,
        // $.return_statement,
        // $.comment
    ),


    variable_declaration: $ => seq(
        choice('var', 'auto', 'global', 'GLOBAL'),
        choice(
            seq('&', $.identifier, '=', $.identifier), // reference assignment
            seq(
                $.identifier,
                optional(
                    choice(
                        seq('=', $._expression),
                        seq(':=', $.identifier),
                    )),
            ), // either normal init or := reference assignment
        ),
        ';'
    ),

    for_statement: $ => seq(
        'for',
        '(',
        choice(
            seq($.variable_declaration, $._expression, ';', $._expression,),
            seq($.identifier, ':', $._expression)),
        ')',
        $.block,
    ),
    while_statement: $ => seq(
        'while',
        '(', $._expression, ')',
        $.block,
    ),
    if_statement: $ => seq(
        'if',
        '(', optional($.variable_declaration), $._expression, ')',
        $.block,
    ),
    switch_statement: $ => seq(
        'switch',
        '(', $.identifier, ')',
        $.block,
    ),
    case_statement: $ => seq(
        choice(
            seq('case', '(', choice($.identifier, $._literal), ')'),
            seq('default')),
        $.block,
    ),

    _parameter: $ => choice(
        $.identifier,
        seq($.identifier, $.identifier),
    ),
    _parameter_list: $ => choice(
        seq($._parameter, ',', $._parameter_list),
        $._parameter,
    ),
    parameter_list: $ => $._parameter_list,
    guard: $ => seq(':', $._expression),
    function_identifier: $ => seq(
        repeat(seq($.identifier, '::')), // namespace resolution
        $.identifier,
    ),
    function_definition: $ => seq(
        'def',
        $.function_identifier,
        '(',
        optional($.parameter_list),
        ')',
        optional($.guard),
        $.block,
    ),

    block: $ => seq('{', repeat($._statement), '}'),

    binary_expression: $ => prec.left(2, seq(
        $._expression,
        choice('+', '-', '*', '/', '==', '!=', '<', '>', '<=', '>='),
        $._expression
    )),

    unary_expression: $ => prec.left(2, seq(
        choice('++', '--', '-'),
        $._expression
    )),

    _argument_list: $ => choice(
        seq($._expression, ',', $._argument_list),
        $._expression,
    ),
    argument_list: $ => $._argument_list,
    vector: $ => seq(
        '[',
        optional($._argument_list),
        ']',
    ),

    _map_entry: $ => seq(seq($.string, ':', $._expression)),
    _map_list: $ => choice(
        seq($._map_entry, ',', $._map_list),
        $._map_entry,
    ),
    map: $ => seq(
        '[',
        $._map_list,
        ']',
    ),

    _capture_list: $ => choice(
        seq($.identifier, ',', $._capture_list),
        $.identifier,
    ),
    capture_list: $ => $._capture_list,
    lambda: $ => seq(
        'fun',
        optional(seq('[', $.capture_list, ']')),
        '(', $.parameter_list, ')',
        $.block,
    ),

    function_call: $ => seq(
        $.function_identifier,
        '(',
        optional($.argument_list),
        ')'
    ),
    member_function_call: $ => seq(
        $.identifier,
        '.',
        $.function_identifier,
        '(',
        optional($.argument_list),
        ')'
    ),
  }
});

