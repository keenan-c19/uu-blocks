
export const toolbox = {
  "kind": "categoryToolbox",
  "contents": [
    {
      "kind": "category",
      "name": "Logic",
      "categorystyle": "logic_category",
      "contents": [
        {
          "kind": "label",
          "text": "Conditional IF Statement",
          "web-class": "myLabelStyle"
        },
        {
          "kind": "block",
          "type": "controls_if"
        },
        {
          "kind": "label",
          "text": "Conditional Compare Statement",
          "web-class": "myLabelStyle"
        },
        {
          "kind": "block",
          "type": "logic_compare"
        },
        {
          "kind": "label",
          "text": "Conditional Operation Statement",
          "web-class": "myLabelStyle"
        },
        {
          "kind": "block",
          "type": "logic_operation"
        },
        {
          "kind": "label",
          "text": "Conditional TRUE/FALSE",
          "web-class": "myLabelStyle"
        },
        {
          "kind": "block",
          "type": "logic_boolean"
        },
          /*
        {
          "kind": "label",
          "text": "Condition NULL",
          "web-class": "myLabelStyle"
        },
        {
          "kind": "block",
          "type": "logic_null"
        },
           */
      ]
    },
    {
      "kind": "category",
      "name": "Loops",
      "categorystyle": "loop_category",
      "contents": [
        {
          "kind": "label",
          "text": "Repeat Loop External Variable",
          "web-class": "myLabelStyle"
        },
        {
          "kind": "block",
          "type": "controls_repeat_ext"
        },
        {
          "kind": "label",
          "text": "Repeat Loop Internal Value",
          "web-class": "myLabelStyle"
        },
        {
          "kind": "block",
          "type": "controls_repeat"
        },
        {
          "kind": "label",
          "text": "While Loop",
          "web-class": "myLabelStyle"
        },
        {
          "kind": "block",
          "type": "controls_whileUntil"
        },
      ]
    },
    {
      "kind": "category",
      "name": "Math",
      "categorystyle": "math_category",
      "contents": [
        {
          "kind": "label",
          "text": "Math Number",
          "web-class": "myLabelStyle"
        },
        {
          "kind": "block",
          "type": "math_number"
        },
        {
          "kind": "label",
          "text": "Math Arithmetic",
          "web-class": "myLabelStyle"
        },
        {
          "kind": "block",
          "type": "math_arithmetic"
        },
      ]
    },
    {
      'kind': 'sep',
    },
    {
      "kind": "category",
      "name": "Onboard LEDs",
      "categorystyle": "led_category",
      "contents": [
        {
          "kind": "label",
          "text": "Turn Off All LEDs",
          "web-class": "myLabelStyle"
        },
        {
          "kind": "block",
          "type": "led_reset"
        },
        {
          "kind": "label",
          "text": "Turn on Red Led",
          "web-class": "myLabelStyle"
        },
        {
          "kind": "block",
          "type": "led_red"
        },
        {
          "kind": "label",
          "text": "Turn on Blue Led",
          "web-class": "myLabelStyle"
        },
        {
          "kind": "block",
          "type": "led_blue"
        },
        {
          "kind": "label",
          "text": "Turn on Green Led",
          "web-class": "myLabelStyle"
        },
        {
          "kind": "block",
          "type": "led_green"
        },
      ]
    },
    {
      "kind": "category",
      "name": "Bitwise Operators",
      "categorystyle": "bitwise_category",
      "contents": [
        {
          "kind": "label",
          "text": "Math Number",
          "web-class": "myLabelStyle"
        },
        {
          "kind": "block",
          "type": "math_number"
        },
        {
          "kind": "label",
          "text": "Bitwise Arithmetics",
          "web-class": "myLabelStyle"
        },
        {
          "kind": "block",
          "type": "bitwise_arithmetic"
        },
      ]
    },
    {
      "kind": "category",
      "name": "Clk",
      "categorystyle": "clk_category",
      "contents": [
        {
          "kind": "label",
          "text": "Enable Clk in Port",
          "web-class": "myLabelStyle"
        },
        {
          "kind": "block",
          "type": "clk_config",
        },
      ]
    },
    {
      "kind": "category",
      "name": "Input/Output",
      "categorystyle": "io_category",
      "contents": [
        {
          "kind": "label",
          "text": "Enable GPIO DATA Configurations",
          "web-class": "myLabelStyle"
        },
        {
          "kind": "block",
          "type": "data_config"
        },
        {
          "kind": "label",
          "text": "Set Pin Direction",
          "web-class": "myLabelStyle"
        },
        {
          "kind": "block",
          "type": "dir_config"
        },
        {
          "kind": "label",
          "text": "Set Pin Strength Configurations",
          "web-class": "myLabelStyle"
        },
        {
          "kind": "block",
          "type": "str_config"
        },
        {
          "kind": "label",
          "text": "Enable GPIO Digital Configurations",
          "web-class": "myLabelStyle"
        },
        {
          "kind": "block",
          "type": "dig_config"
        },
        {
          "kind": "label",
          "text": "Enable Pin Resistor",
          "web-class": "myLabelStyle"
        },
        {
          "kind": "block",
          "type": "resistor_config"
        },
      ]
    },
    {
      "kind": "category",
      "name": "Time",
      "categorystyle": "time_category",
      "contents": [
        {
          "kind": "label",
          "text": "Call Delay Function",
          "web-class": "myLabelStyle"
        },
        {
          "kind": "block",
          "type": "delay_ms"
        },
      ]
    },
    {
      'kind': 'sep',
    },

    {
      "kind": "category",
      "name": "Functions",
      "categorystyle": "procedure_category",
      "contents": [
        {
          "kind": "label",
          "text": "Main Function",
          "web-class": "myLabelStyle"
        },
        {
          "kind": "block",
          "type": "procedures_main"
        },
        {
          "kind": "label",
          "text": "Function No Return",
          "web-class": "myLabelStyle"
        },
        {
          "kind": "block",
          "type": "procedures_defnoreturn"
        },
        {
          "kind": "label",
          "text": "Function With Return",
          "web-class": "myLabelStyle"
        },
        {
          "kind": "block",
          "type": "procedures_defreturn"
        },
        {
          "kind": "label",
          "text": "Function Call With Return",
          "web-class": "myLabelStyle"
        },
        {
          "kind": "block",
          "type": "procedures_callreturn"
        },
        {
          "kind": "label",
          "text": "Function Call No Return",
          "web-class": "myLabelStyle"
        },
        {
          "kind": "block",
          "type": "procedures_callnoreturn"
        },
      ]
    },

    {
      "kind": "category",
      "name": "Variables",
      "categorystyle": "variable_category",
      "contents": [
        {
          "kind": "label",
          "text": "Call Variable",
          "web-class": "myLabelStyle"
        },
        {
          "kind": "block",
          "type": "variables_get"
        },
        {
          "kind": "label",
          "text": "Set Variable",
          "web-class": "myLabelStyle"
        },
        {
          "kind": "block",
          "type": "variables_set"
        },
      ]
    },
  ]
}
