
import * as Blockly from 'blockly/core';


export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([
    // Block to access led blue
    {
        "type": "led_blue",
        "message0": "LED BLUE %1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "STATE",
                "options": [
                    [
                        "ON",
                        "HIGH"
                    ],
                    [
                        "OFF",
                        "LOW"
                    ],
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        'style': 'led_blocks',
        "tooltip": "",
        "helpUrl": ""
    },
    // Block to access led red
    {
        "type": "led_red",
        "message0": "LED RED %1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "STATE",
                "options": [
                    [
                        "ON",
                        "HIGH"
                    ],
                    [
                        "OFF",
                        "LOW"
                    ],
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        'style': 'led_blocks',
        "tooltip": "",
        "helpUrl": ""
    },
    // Block to access led green
    {
        "type": "led_green",
        "message0": "LED GREEN %1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "STATE",
                "options": [
                    [
                        "ON",
                        "HIGH"
                    ],
                    [
                        "OFF",
                        "LOW"
                    ],
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        'style': 'led_blocks',
        "tooltip": "",
        "helpUrl": ""
    },
    // Block to reset data register
    {
        "type": "led_reset",
        "message0": "RESET",
        "previousStatement": null,
        "nextStatement": null,
        'style': 'led_blocks',
        "tooltip": "",
        "helpUrl": ""
    },
    // Block representing the if statement in the controls_if mutator.
    {
        'type': 'controls_if_if',
        'message0': '%{BKY_CONTROLS_IF_IF_TITLE_IF}',
        'nextStatement': null,
        'enableContextMenu': false,
        'style': 'logic_blocks',
        'tooltip': '%{BKY_CONTROLS_IF_IF_TOOLTIP}',
    },
    // Block representing the else-if statement in the controls_if mutator.
    {
        'type': 'controls_if_elseif',
        'message0': '%{BKY_CONTROLS_IF_ELSEIF_TITLE_ELSEIF}',
        'previousStatement': null,
        'nextStatement': null,
        'enableContextMenu': false,
        'style': 'logic_blocks',
        'tooltip': '%{BKY_CONTROLS_IF_ELSEIF_TOOLTIP}',
    },
    // Block representing the else statement in the controls_if mutator.
    {
        'type': 'controls_if_else',
        'message0': '%{BKY_CONTROLS_IF_ELSE_TITLE_ELSE}',
        'previousStatement': null,
        'enableContextMenu': false,
        'style': 'logic_blocks',
        'tooltip': '%{BKY_CONTROLS_IF_ELSE_TOOLTIP}',
    },
    {
        'type': 'controls_repeat_ext',
        'message0': '%{BKY_CONTROLS_REPEAT_TITLE}',
        'args0': [{
            'type': 'input_value',
            'name': 'TIMES',
            'check': 'Number',
        }],
        'message1': '%{BKY_CONTROLS_REPEAT_INPUT_DO} %1',
        'args1': [{
            'type': 'input_statement',
            'name': 'DO',
        }],
        'previousStatement': null,
        'nextStatement': null,
        'style': 'loop_blocks',
        'tooltip': '%{BKY_CONTROLS_REPEAT_TOOLTIP}',
        'helpUrl': '%{BKY_CONTROLS_REPEAT_HELPURL}',
    },
    // Block for repeat n times (internal number).
    // The 'controls_repeat_ext' block is preferred as it is more flexible.
    {
        'type': 'controls_repeat',
        'message0': '%{BKY_CONTROLS_REPEAT_TITLE}',
        'args0': [{
            'type': 'field_number',
            'name': 'TIMES',
            'value': 10,
            'min': 0,
            'precision': 1,
        }],
        'message1': '%{BKY_CONTROLS_REPEAT_INPUT_DO} %1',
        'args1': [{
            'type': 'input_statement',
            'name': 'DO',
        }],
        'previousStatement': null,
        'nextStatement': null,
        'style': 'loop_blocks',
        'tooltip': '%{BKY_CONTROLS_REPEAT_TOOLTIP}',
        'helpUrl': '%{BKY_CONTROLS_REPEAT_HELPURL}',
    },
    // Block for 'do while/until' loop.
    {
        'type': 'controls_whileUntil',
        'message0': '%1 %2',
        'args0': [
            {
                'type': 'field_dropdown',
                'name': 'MODE',
                'options': [
                    ['%{BKY_CONTROLS_WHILEUNTIL_OPERATOR_WHILE}', 'WHILE'],
                    ['%{BKY_CONTROLS_WHILEUNTIL_OPERATOR_UNTIL}', 'UNTIL'],
                ],
            },
            {
                'type': 'input_value',
                'name': 'BOOL',
                'check': 'Boolean',
            },
        ],
        'message1': '%{BKY_CONTROLS_REPEAT_INPUT_DO} %1',
        'args1': [{
            'type': 'input_statement',
            'name': 'DO',
        }],
        'previousStatement': null,
        'nextStatement': null,
        'style': 'loop_blocks',
        'helpUrl': '%{BKY_CONTROLS_WHILEUNTIL_HELPURL}',
        'extensions': ['controls_whileUntil_tooltip'],
    },
    // Block for 'for' loop.
    {
        'type': 'controls_for',
        'message0': '%{BKY_CONTROLS_FOR_TITLE}',
        'args0': [
            {
                'type': 'field_variable',
                'name': 'VAR',
                'variable': null,
            },
            {
                'type': 'input_value',
                'name': 'FROM',
                'check': 'Number',
                'align': 'RIGHT',
            },
            {
                'type': 'input_value',
                'name': 'TO',
                'check': 'Number',
                'align': 'RIGHT',
            },
            {
                'type': 'input_value',
                'name': 'BY',
                'check': 'Number',
                'align': 'RIGHT',
            },
        ],
        'message1': '%{BKY_CONTROLS_REPEAT_INPUT_DO} %1',
        'args1': [{
            'type': 'input_statement',
            'name': 'DO',
        }],
        'inputsInline': true,
        'previousStatement': null,
        'nextStatement': null,
        'style': 'loop_blocks',
        'helpUrl': '%{BKY_CONTROLS_FOR_HELPURL}',
        'extensions': [
            'contextMenu_newGetVariableBlock',
            'controls_for_tooltip',
        ],
    },
    // Block for 'for each' loop.
    {
        'type': 'controls_forEach',
        'message0': '%{BKY_CONTROLS_FOREACH_TITLE}',
        'args0': [
            {
                'type': 'field_variable',
                'name': 'VAR',
                'variable': null,
            },
            {
                'type': 'input_value',
                'name': 'LIST',
                'check': 'Array',
            },
        ],
        'message1': '%{BKY_CONTROLS_REPEAT_INPUT_DO} %1',
        'args1': [{
            'type': 'input_statement',
            'name': 'DO',
        }],
        'previousStatement': null,
        'nextStatement': null,
        'style': 'loop_blocks',
        'helpUrl': '%{BKY_CONTROLS_FOREACH_HELPURL}',
        'extensions': [
            'contextMenu_newGetVariableBlock',
            'controls_forEach_tooltip',
        ],
    },
    // Block for flow statements: continue, break.
    {
        'type': 'controls_flow_statements',
        'message0': '%1',
        'args0': [{
            'type': 'field_dropdown',
            'name': 'FLOW',
            'options': [
                ['%{BKY_CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK}', 'BREAK'],
                ['%{BKY_CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE}', 'CONTINUE'],
            ],
        }],
        'previousStatement': null,
        'style': 'loop_blocks',
        'helpUrl': '%{BKY_CONTROLS_FLOW_STATEMENTS_HELPURL}',
        'suppressPrefixSuffix': true,
        'extensions': [
            'controls_flow_tooltip',
            'controls_flow_in_loop_check',
        ],
    },
    {
        "type": "delay_ms",
        "message0": "%{BKY_DELAY} %1",
        "args0": [
            {
                "type": "field_number",
                "name": "MS",
                "value": 0,
                "min": 0,
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        'style': 'time_blocks',
        "tooltip": "",
        "helpUrl": ""
    },
    // Block for variable getter.
    {
        'type': 'variables_get',
        'message0': '%1',
        'args0': [
            {
                'type': 'field_variable',
                'name': 'VAR',
                'variable': '%{BKY_VARIABLES_DEFAULT_NAME}',
            },
        ],
        'output': null,
        'style': 'variable_blocks',
        'helpUrl': '%{BKY_VARIABLES_GET_HELPURL}',
        'tooltip': '%{BKY_VARIABLES_GET_TOOLTIP}',
        'extensions': ['contextMenu_variableSetterGetter'],
    },
    // Set Variable Block
    {
        "type": "variables_set",
        "message0": " %1 %2 %3 %4",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "DATA",
                "options": [
                    [
                        "singed",
                        "SIGNED"
                    ],
                    [
                        "unsigned",
                        "UNSIGNED"
                    ]
                ]
            },
            {
                "type": "field_dropdown",
                "name": "TYPE",
                "options": [
                    [
                        "int",
                        "INT"
                    ],
                    [
                        "short",
                        "SHORT"
                    ],
                    [
                        "long",
                        "LONG"
                    ],
                    [
                        "long long",
                        "LLONG"
                    ],
                    [
                        "char",
                        "CHAR"
                    ]
                ]
            },
            {
                "type": "field_variable",
                "name": "VAR",
                "variable": "variable"
            },
            {
                "type": "input_value",
                "name": "VALUE"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        'style': 'variable_blocks',
        'tooltip': '%{BKY_VARIABLES_SET_TOOLTIP}',
        'helpUrl': '%{BKY_VARIABLES_SET_HELPURL}',
        'extensions': ['contextMenu_variableSetterGetter'],
    },
    // Block for variable setter.
    {
        'type': 'ass',
        'message0': '%{BKY_VARIABLES_SET}',
        'args0': [
            {
                'type': 'field_variable',
                'name': 'VAR',
                'variable': '%{BKY_VARIABLES_DEFAULT_NAME}',
            },
            {
                'type': 'input_value',
                'name': 'VALUE',
            },
        ],
        'previousStatement': null,
        'nextStatement': null,
        'style': 'variable_blocks',
        'tooltip': '%{BKY_VARIABLES_SET_TOOLTIP}',
        'helpUrl': '%{BKY_VARIABLES_SET_HELPURL}',
        'extensions': ['contextMenu_variableSetterGetter'],
    },
    {
        'type': 'bitwise_arithmetic',
        'message0': '%1 %2 %3',
        'args0': [
            {
                'type': 'input_value',
                'name': 'A',
            },
            {
                'type': 'field_dropdown',
                'name': 'OP',
                'options': [
                    ['%{BKY_BIT_AND_SYMBOL}', 'AND'],
                    ['%{BKY_BIT_OR_SYMBOL}', 'OR'],
                    ['%{BKY_BIT_XOR_SYMBOL}', 'XOR'],
                    ['%{BKY_BIT_ONES_COMPLEMENT_SYMBOL}', 'COMPLEMENT'],
                    ['%{BKY_BIT_SHIFT_RIGHT_SYMBOL}', 'RIGHT'],
                    ['%{BKY_BIT_SHIFT_LEFT_SYMBOL}', 'LEFT']
                ],
            },
            {
                'type': 'input_value',
                'name': 'B',
            },
        ],
        'inputsInline': true,
        'output': 'Number',
        'style': 'bitwise_blocks',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "clk_config",
        "message0": "%{BKY_CLK_ENABLE_TITLE}  %1",
        "args0": [
            {
                'type': 'field_dropdown',
                'name': 'CLK',
                'options': [
                    ['%{BKY_PORT_A}', 'A'],
                    ['%{BKY_PORT_B}', 'B'],
                    ['%{BKY_PORT_C}', 'C'],
                    ['%{BKY_PORT_D}', 'D'],
                    ['%{BKY_PORT_E}', 'E'],
                    ['%{BKY_PORT_F}', 'F'],
                ],
            },
        ],
        "previousStatement": null,
        "nextStatement": null,
        'style': 'clk_blocks',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "data_config",
        "message0": "%{BKY_SELECT_PORT}  %1 %{BKY_SELECT_PIN} %2 %{BKY_SELECT_DATA} %3" ,
        "args0": [
            {
                'type': 'field_dropdown',
                'name': 'PORT',
                'options': [
                    ['%{BKY_PORT_A}', 'A'],
                    ['%{BKY_PORT_B}', 'B'],
                    ['%{BKY_PORT_C}', 'C'],
                    ['%{BKY_PORT_D}', 'D'],
                    ['%{BKY_PORT_E}', 'E'],
                    ['%{BKY_PORT_F}', 'F'],
                ],
            },
            {
                'type': 'field_dropdown',
                'name': 'PIN',
                'options': [
                    ['%{BKY_PIN_0}', '0'],
                    ['%{BKY_PIN_1}', '1'],
                    ['%{BKY_PIN_2}', '2'],
                    ['%{BKY_PIN_3}', '3'],
                    ['%{BKY_PIN_4}', '4'],
                    ['%{BKY_PIN_5}', '5'],
                    ['%{BKY_PIN_6}', '6'],
                    ['%{BKY_PIN_7}', '7'],
                ],
            },
            {
                'type': 'field_dropdown',
                'name': 'DIR',
                'options': [
                    ['%{BKY_HIGH}', 'ON'],
                    ['%{BKY_LOW}', 'OFF'],
                ],
            },
        ],
        "previousStatement": null,
        "nextStatement": null,
        'style': 'io_blocks',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "dir_config",
        "message0": "%{BKY_SELECT_PORT}  %1 %{BKY_SELECT_PIN} %2 %{BKY_SELECT_DIRECTION} %3" ,
        "args0": [
            {
                'type': 'field_dropdown',
                'name': 'PORT',
                'options': [
                    ['%{BKY_PORT_A}', 'A'],
                    ['%{BKY_PORT_B}', 'B'],
                    ['%{BKY_PORT_C}', 'C'],
                    ['%{BKY_PORT_D}', 'D'],
                    ['%{BKY_PORT_E}', 'E'],
                    ['%{BKY_PORT_F}', 'F'],
                ],
            },
            {
                'type': 'field_dropdown',
                'name': 'PIN',
                'options': [
                    ['%{BKY_PIN_0}', '0'],
                    ['%{BKY_PIN_1}', '1'],
                    ['%{BKY_PIN_2}', '2'],
                    ['%{BKY_PIN_3}', '3'],
                    ['%{BKY_PIN_4}', '4'],
                    ['%{BKY_PIN_5}', '5'],
                    ['%{BKY_PIN_6}', '6'],
                    ['%{BKY_PIN_7}', '7'],
                ],
            },
            {
                'type': 'field_dropdown',
                'name': 'DIR',
                'options': [
                    ['%{BKY_INPUT}', 'INPUT'],
                    ['%{BKY_OUTPUT}', 'OUTPUT'],
                ],
            },
        ],
        "previousStatement": null,
        "nextStatement": null,
        'style': 'io_blocks',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "str_config",
        "message0": "%{BKY_SELECT_PORT}  %1 %{BKY_SELECT_PIN} %2 %{BKY_SELECT_STRENGTH} %3 %{BKY_SELECT_STATE} %4" ,
        "args0": [
            {
                'type': 'field_dropdown',
                'name': 'PORT',
                'options': [
                    ['%{BKY_PORT_A}', 'A'],
                    ['%{BKY_PORT_B}', 'B'],
                    ['%{BKY_PORT_C}', 'C'],
                    ['%{BKY_PORT_D}', 'D'],
                    ['%{BKY_PORT_E}', 'E'],
                    ['%{BKY_PORT_F}', 'F'],
                ],
            },
            {
                'type': 'field_dropdown',
                'name': 'PIN',
                'options': [
                    ['%{BKY_PIN_0}', '0'],
                    ['%{BKY_PIN_1}', '1'],
                    ['%{BKY_PIN_2}', '2'],
                    ['%{BKY_PIN_3}', '3'],
                    ['%{BKY_PIN_4}', '4'],
                    ['%{BKY_PIN_5}', '5'],
                    ['%{BKY_PIN_6}', '6'],
                    ['%{BKY_PIN_7}', '7'],
                ],
            },
            {
                'type': 'field_dropdown',
                'name': 'STRENGTH',
                'options': [
                    ['%{BKY_STR_OUTPUT_2}', '2'],
                    ['%{BKY_STR_OUTPUT_4}', '4'],
                    ['%{BKY_STR_OUTPUT_8}', '8'],
                ],
            },
            {
                "type": "field_checkbox",
                "name": "INVERT",
                "checked": false
            },
        ],
        "previousStatement": null,
        "nextStatement": null,
        'style': 'io_blocks',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "dig_config",
        "message0": "%{BKY_SELECT_PORT}  %1 %{BKY_SELECT_PIN} %2 %{BKY_SELECT_DIGITAL} %3" ,
        "args0": [
            {
                'type': 'field_dropdown',
                'name': 'PORT',
                'options': [
                    ['%{BKY_PORT_A}', 'A'],
                    ['%{BKY_PORT_B}', 'B'],
                    ['%{BKY_PORT_C}', 'C'],
                    ['%{BKY_PORT_D}', 'D'],
                    ['%{BKY_PORT_E}', 'E'],
                    ['%{BKY_PORT_F}', 'F'],
                ],
            },
            {
                'type': 'field_dropdown',
                'name': 'PIN',
                'options': [
                    ['%{BKY_PIN_0}', '0'],
                    ['%{BKY_PIN_1}', '1'],
                    ['%{BKY_PIN_2}', '2'],
                    ['%{BKY_PIN_3}', '3'],
                    ['%{BKY_PIN_4}', '4'],
                    ['%{BKY_PIN_5}', '5'],
                    ['%{BKY_PIN_6}', '6'],
                    ['%{BKY_PIN_7}', '7'],
                ],
            },
            {
                'type': 'field_dropdown',
                'name': 'DIR',
                'options': [
                    ['%{BKY_INPUT}', 'INPUT'],
                    ['%{BKY_OUTPUT}', 'OUTPUT'],
                ],
            },
        ],
        "previousStatement": null,
        "nextStatement": null,
        'style': 'io_blocks',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "resistor_config",
        "message0": "%{BKY_SELECT_PORT}  %1 %{BKY_SELECT_PIN} %2 %{BKY_SELECT_RESISTOR} %3 %{BKY_SELECT_STATE} %4" ,
        "args0": [
            {
                'type': 'field_dropdown',
                'name': 'PORT',
                'options': [
                    ['%{BKY_PORT_A}', 'A'],
                    ['%{BKY_PORT_B}', 'B'],
                    ['%{BKY_PORT_C}', 'C'],
                    ['%{BKY_PORT_D}', 'D'],
                    ['%{BKY_PORT_E}', 'E'],
                    ['%{BKY_PORT_F}', 'F'],
                ],
            },
            {
                'type': 'field_dropdown',
                'name': 'PIN',
                'options': [
                    ['%{BKY_PIN_0}', '0'],
                    ['%{BKY_PIN_1}', '1'],
                    ['%{BKY_PIN_2}', '2'],
                    ['%{BKY_PIN_3}', '3'],
                    ['%{BKY_PIN_4}', '4'],
                    ['%{BKY_PIN_5}', '5'],
                    ['%{BKY_PIN_6}', '6'],
                    ['%{BKY_PIN_7}', '7'],
                ],
            },
            {
                'type': 'field_dropdown',
                'name': 'RESISTOR',
                'options': [
                    ['%{BKY_RESISTOR_PUR}', 'PUR'],
                    ['%{BKY_RESISTOR_PDR}', 'PDR'],
                    ['%{BKY_RESISTOR_ODR}', 'ODR'],
                ],
            },
            {
                "type": "field_checkbox",
                "name": "INVERT",
                "checked": false
            },
        ],
        "previousStatement": null,
        "nextStatement": null,
        'style': 'io_blocks',
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "delay_fc",
        "message0": "delay function",
        "previousStatement": null,
        "nextStatement": null,
        'style': 'time_blocks',
        "tooltip": "",
        "helpUrl": ""
    },
]);
