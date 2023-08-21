
/**
 * embeddedGenerator C code generator.
 *
 */

import * as Blockly from 'blockly';

export const embeddedGenerator = new Blockly.Generator('Embedded');

/**
 * Order of operation ENUMs.
 * https://www.tutorialspoint.com/cprogramming/c_operators_precedence.htm#:~:text=Operator%20precedence%20determines%20the%20grouping,precedence%20than%20the%20addition%20operator.
 */
embeddedGenerator.ORDER_ATOMIC           = 0;    // 0 "" ...
embeddedGenerator.ORDER_POSTFIX          = 1;    // () [] -> . ++ - -
embeddedGenerator.ORDER_UNARY            = 2;    // + - ! ~ ++ - - (type)* & sizeof
embeddedGenerator.ORDER_MULTIPLICATIVE   = 3;    // * / %
embeddedGenerator.ORDER_ADDITIVE         = 4;    // + -
embeddedGenerator.ORDER_SHIFT            = 5;    // << >>
embeddedGenerator.ORDER_RELATIONAL       = 6;    // < <= > >=
embeddedGenerator.ORDER_EQUALITY         = 7;    // == !=
embeddedGenerator.ORDER_BITWISE_AND      = 8;    // &
embeddedGenerator.ORDER_BITWISE_XOR      = 9;    // ^
embeddedGenerator.ORDER_BITWISE_OR       = 10;   // |
embeddedGenerator.ORDER_COMPLEMENT       = 12;   // ~
embeddedGenerator.ORDER_LOGICAL_AND      = 13;   // &&
embeddedGenerator.ORDER_LOGICAL_OR       = 14;   // ||
embeddedGenerator.ORDER_CONDITIONAL      = 15;   // ?
embeddedGenerator.ORDER_ASSIGNMENT       = 16;   // = += -= *= /= %=>>= <<= &= ^= |=
embeddedGenerator.ORDER_ORDER_COMMA      = 17;   // ,
embeddedGenerator.ORDER_NONE             = 99;

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 */

embeddedGenerator.addReservedWords(
    // https://www.ibm.com/docs/en/developer-for-zos/14.2?topic=programs-c-reserved-keywords
    'auto,else,long,switch,break,enum,register,typedef,case,extern,return,union,char,float,short,' +
    'unsigned,cost,for,signed,void,continue,goto,sizeof,volatile,default,if,static,while,do,int,struct' +
    '_Packed,double' +
    Object.getOwnPropertyNames(globalThis).join(','));

/**
 * Whether the init method has been called.
 * @type {?boolean}
 */
embeddedGenerator.isInitialized = false;

/**
 * Initialise the database of variable names.
 * @param {!Workspace} workspace Workspace to generate code from.
 */

embeddedGenerator.init = function(workspace){
    // Call Blockly.CodeGenerator's init.
    Object.getPrototypeOf(this).init.call(this);

    if (!this.nameDB_) {
        this.nameDB_ = new Blockly.Names(this.RESERVED_WORDS_);
    } else {
        this.nameDB_.reset();
    }

    this.nameDB_.setVariableMap(workspace.getVariableMap());
    this.nameDB_.populateVariables(workspace);
    this.nameDB_.populateProcedures(workspace);

    const defvars = [];
    // Add developer variables (not create or named by the user).
    const devVarList = Blockly.Variables.allDeveloperVariables(workspace);
    for (let i = 0; i < devVarList.length; i++) {
        defvars.push(
            this.nameDB_.getName(devVarList[i], Blockly.Names.NameType.DEVELOPER_VARIABLE));
    }


    // Add user variables, but only ones that are being used.
    const variables = Blockly.Variables.allUsedVarModels(workspace);
    for (let i = 0; i < variables.length; i++) {
        defvars.push(this.nameDB_.getName(variables[i].getId(), Blockly.Names.NameType.VARIABLE));
    }
    this.isInitialized = true;


};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */

embeddedGenerator.finish = function(code) {
    // Convert the definitions dictionary into a list.
    const definitions = Object.values(this.definitions_);
    // Call Blockly.CodeGenerator's finish.
    code = Object.getPrototypeOf(this).finish.call(this, code);
    this.isInitialized = false;

    this.nameDB_.reset();
    return definitions.join('\n\n') + '\n\n\n' + code;
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.  A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
embeddedGenerator.scrubNakedValue = function(line) {
    return line + ';\n';
};

/**
 * Encode a string as a properly escaped embeddedGenerator string, complete with
 * quotes.
 * @param {string} string Text to encode.
 * @return {string} embeddedGenerator string.
 * @protected
 */

embeddedGenerator.scrub_ = function(block, code, opt_thisOnly) {
    let commentCode = '';
    // Only collect comments for blocks that aren't inline.
    if (!block.outputConnection || !block.outputConnection.targetConnection) {
        // Collect comment for this block.
        let comment = block.getCommentText();
        if (comment) {
            comment = Blockly.utils.string.wrap(comment, this.COMMENT_WRAP - 3);
            commentCode += this.prefixLines(comment + '\n', '// ');
        }
        // Collect comments for all value arguments.
        // Don't collect comments for nested statements.
        for (let i = 0; i < block.inputList.length; i++) {
            if (block.inputList[i].type === Blockly.inputTypes.VALUE) {
                const childBlock = block.inputList[i].connection.targetBlock();
                if (childBlock) {
                    comment = this.allNestedComments(childBlock);
                    if (comment) {
                        commentCode += this.prefixLines(comment, '// ');
                    }
                }
            }
        }
    }
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : this.blockToCode(nextBlock);
    return commentCode + code + nextCode;
};

// Conditional Blocks

// If conditional statement
embeddedGenerator['controls_if'] = function(block) {
    // If/elseif/else condition.
    let n = 0;
    let code = '';
    if (embeddedGenerator.STATEMENT_PREFIX) {
        // Automatic prefix insertion is switched off for this block.  Add manually.
        code += embeddedGenerator.injectId(embeddedGenerator.STATEMENT_PREFIX, block);
    }
    do {
        const conditionCode =
            embeddedGenerator.valueToCode(block, 'IF' + n, embeddedGenerator.ORDER_NONE) ||
            'false';
        let branchCode = embeddedGenerator.statementToCode(block, 'DO' + n);
        if (embeddedGenerator.STATEMENT_SUFFIX) {
            branchCode = embeddedGenerator.prefixLines(
                    embeddedGenerator.injectId(embeddedGenerator.STATEMENT_SUFFIX, block),
                    embeddedGenerator.INDENT) +
                branchCode;
        }
        code += (n > 0 ? ' \nelse ' : '') + 'if (' + conditionCode + ') {\n' +
            branchCode + '}';
        n++;
    } while (block.getInput('IF' + n));

    if (block.getInput('ELSE') || embeddedGenerator.STATEMENT_SUFFIX) {
        let branchCode = embeddedGenerator.statementToCode(block, 'ELSE');
        if (embeddedGenerator.STATEMENT_SUFFIX) {
            branchCode = embeddedGenerator.prefixLines(
                    embeddedGenerator.injectId(embeddedGenerator.STATEMENT_SUFFIX, block),
                    embeddedGenerator.INDENT) +
                branchCode;
        }
        code += ' else {\n' + branchCode + '}';
    }
    return code + '\n';
};

// If else conditional statement
embeddedGenerator['controls_ifelse'] = embeddedGenerator['controls_if'];

// Logic compare
embeddedGenerator['logic_compare'] = function(block) {
    // Comparison operator.
    const OPERATORS =
        {'EQ': '==', 'NEQ': '!=', 'LT': '<', 'LTE': '<=', 'GT': '>', 'GTE': '>='};
    const operator = OPERATORS[block.getFieldValue('OP')];
    const order = (operator === '==' || operator === '!=') ?
        embeddedGenerator.ORDER_EQUALITY :
        embeddedGenerator.ORDER_RELATIONAL;
    const argument0 = embeddedGenerator.valueToCode(block, 'A', order) || '0';
    const argument1 = embeddedGenerator.valueToCode(block, 'B', order) || '0';
    const code = argument0 + ' ' + operator + ' ' + argument1;
    return [code, order];
};

// Logic Operation
embeddedGenerator['logic_operation'] = function(block) {
    // Operations 'and', 'or'.
    const operator = (block.getFieldValue('OP') === 'AND') ? '&&' : '||';
    const order = (operator === '&&') ? embeddedGenerator.ORDER_LOGICAL_AND :
        embeddedGenerator.ORDER_LOGICAL_OR;
    let argument0 = embeddedGenerator.valueToCode(block, 'A', order);
    let argument1 = embeddedGenerator.valueToCode(block, 'B', order);
    if (!argument0 && !argument1) {
        // If there are no arguments, then the return value is false.
        argument0 = 'false';
        argument1 = 'false';
    } else {
        // Single missing arguments have no effect on the return value.
        const defaultArgument = (operator === '&&') ? 'true' : 'false';
        if (!argument0) {
            argument0 = defaultArgument;
        }
        if (!argument1) {
            argument1 = defaultArgument;
        }
    }
    const code = argument0 + ' ' + operator + ' ' + argument1;
    return [code, order];
};

// Not operator
embeddedGenerator['logic_negate'] = function(block) {
    // Negation.
    const order = embeddedGenerator.ORDER_LOGICAL_NOT;
    const argument0 = embeddedGenerator.valueToCode(block, 'BOOL', order) || 'true';
    const code = '!' + argument0;
    return [code, order];
};
// True or False
embeddedGenerator['logic_boolean'] = function(block) {
    // Boolean values true and false.
    const code = (block.getFieldValue('BOOL') === 'TRUE') ? '1' : '0';
    return [code, embeddedGenerator.ORDER_ATOMIC];
};
// No input
embeddedGenerator['logic_null'] = function(block) {
    // Null data type.
    return ['null', embeddedGenerator.ORDER_ATOMIC];
};

// Loop Code Generators

// While loop
embeddedGenerator['controls_whileUntil'] = function(block) {
    // Do while/until loop.
    const until = block.getFieldValue('MODE') === 'UNTIL';
    let argument0 =
        embeddedGenerator.valueToCode(
            block, 'BOOL',
            until ? embeddedGenerator.ORDER_LOGICAL_NOT : embeddedGenerator.ORDER_NONE) ||
        'false';
    let branch = embeddedGenerator.statementToCode(block, 'DO');
    branch = embeddedGenerator.addLoopTrap(branch, block);
    if (until) {
        argument0 = '!' + argument0;
    }
    return 'while (' + argument0 + ') {\n' + branch + '}\n';
};

// Repeat var times loop
embeddedGenerator['controls_repeat_ext'] = function(block) {
    // Repeat n times.
    let repeats;
    if (block.getField('TIMES')) {
        // Internal number.
        repeats = String(Number(block.getFieldValue('TIMES')));
    } else {
        // External number.
        repeats =
            embeddedGenerator.valueToCode(block, 'TIMES', embeddedGenerator.ORDER_ASSIGNMENT) ||
            '0';
    }
    let branch = embeddedGenerator.statementToCode(block, 'DO');
    branch = embeddedGenerator.addLoopTrap(branch, block);
    let code = '';
    const loopVar =
        embeddedGenerator.nameDB_.getDistinctName('count', Blockly.Names.NameType.VARIABLE);
    let endVar = repeats;
    if (!repeats.match(/^\w+$/) && !stringUtils.isNumber(repeats)) {
        endVar =
            embeddedGenerator.nameDB_.getDistinctName('repeat_end', Blockly.Names.NameType.VARIABLE);
        code += 'int ' + endVar + ' = ' + repeats + ';\n';
    }
    code += 'for (int ' + loopVar + ' = 0; ' + loopVar + ' < ' + endVar + '; ' +
        loopVar + '++) {\n' + branch + '}\n';
    return code;
};

// Repeat x times loop
embeddedGenerator['controls_repeat'] = embeddedGenerator['controls_repeat_ext'];

// Math Blocks
// Math number
embeddedGenerator['math_number'] = function(block) {
    // Numeric value.
    const code = Number(block.getFieldValue('NUM'));
    const order = code >= 0 ? embeddedGenerator.ORDER_ATOMIC :
        embeddedGenerator.ORDER_UNARY_NEGATION;
    return [code, order];
};

// Math operator
embeddedGenerator['math_arithmetic'] = function(block) {
    // Basic arithmetic operators, and power.
    const OPERATORS = {
        'ADD': [' + ', embeddedGenerator.ORDER_ADDITIVE],
        'MINUS': [' - ', embeddedGenerator.ORDER_ADDITIVE],
        'MULTIPLY': [' * ', embeddedGenerator.ORDER_MULTIPLICATIVE],
        'DIVIDE': [' / ', embeddedGenerator.ORDER_MULTIPLICATIVE],
        'POWER': [null, embeddedGenerator.ORDER_NONE],  // Handle power separately.
    };
    const tuple = OPERATORS[block.getFieldValue('OP')];
    const operator = tuple[0];
    const order = tuple[1];
    const argument0 = embeddedGenerator.valueToCode(block, 'A', order) || '0';
    const argument1 = embeddedGenerator.valueToCode(block, 'B', order) || '0';
    let code;
    // Power in Embedded requires a special case since it has no operator.
    if (!operator) {
        code = 'Math.pow(' + argument0 + ', ' + argument1 + ')';
        return [code, embeddedGenerator.ORDER_NONE];
    }
    code = argument0 + operator + argument1;
    return [code, order];
};

// BITWISE BLOCKS
// Bitwise Operators
embeddedGenerator['bitwise_arithmetic'] = function(block) {
    // Basic arithmetic operators, and power.
    const OPERATORS = {
        'AND': [' & ', embeddedGenerator.ORDER_BITWISE_AND],
        'OR': [' | ', embeddedGenerator.ORDER_BITWISE_OR],
        'XOR': [' ^ ', embeddedGenerator.ORDER_BITWISE_OR],
        'COMPLEMENT': [' ~ ', embeddedGenerator.ORDER_COMPLEMENT],
        'RIGHT': [' >> ', embeddedGenerator.ORDER_SHIFT],  // Handle power separately.
        'LEFT': [' << ', embeddedGenerator.ORDER_SHIFT],  // Handle power separately.
    };
    const tuple = OPERATORS[block.getFieldValue('OP')];
    const operator = tuple[0];
    const order = tuple[1];
    const argument0 = embeddedGenerator.valueToCode(block, 'A', order) || '0';
    const argument1 = embeddedGenerator.valueToCode(block, 'B', order) || '0';
    let code;
    code = argument0 + operator + argument1;
    return [code, order];
};

// CLK BLOCKS
// Clk Config
embeddedGenerator['clk_config'] = function (block) {
    const CLK = {
        'A': '0x01',
        'B': '0x02',
        'C': '0x04',
        'D': '0x08',
        'E': '0x10',
        'F': '0x20',
    };
    let dropdown_clk = CLK[block.getFieldValue('CLK')];
    let code;
    code = `SYSCTL->RCGCGPIO |= ${dropdown_clk};\n`;
    return code;
};

// LED BLOCKS
// ENABLE BLUE LED
embeddedGenerator['led_blue'] = function(block) {

    const STATE = {
        'HIGH': ' |= ',
        'LOW': ' &= ',
    };
    let dropdown_state = STATE[block.getFieldValue('STATE')];
    let code = `GPIOF->DATA${dropdown_state}0x04;\n`;
    return code;
};

// ENABLE RED LED
embeddedGenerator['led_red'] = function(block) {

    const STATE = {
        'HIGH': ' |= ',
        'LOW': ' &= ',
    };
    let dropdown_state = STATE[block.getFieldValue('STATE')];
    let code = `GPIOF->DATA${dropdown_state}0x02;\n`;
    return code;
};

// ENABLE GREEN LED
embeddedGenerator['led_green'] = function(block) {

    const STATE = {
        'HIGH': ' |= ',
        'LOW': ' &= ',
    };
    let dropdown_state = STATE[block.getFieldValue('STATE')];
    let code = `GPIOF->DATA${dropdown_state}0x08;\n`;
    return code;
};

// RESET ALL LEDs
embeddedGenerator['led_reset'] = function(block) {
    let code = `GPIOF->DATA = 0x00;\n`;
    return code;
};

// INPUT/OUTPUT BLOCKS
// SET DIRECTION
embeddedGenerator['dir_config'] = function (block) {
    const PORT = {
        'A': 'A',
        'B': 'B',
        'C': 'C',
        'D': 'D',
        'E': 'E',
        'F': 'F',
    };
    const PIN = {
        '0': '0x01',
        '1': '0x02',
        '2': '0x04',
        '3': '0x08',
        '4': '0x10',
        '5': '0x20',
        '6': '0x40',
        '7': '0x80',
    };
    const DIR = {
        'INPUT': ' |= ',
        'OUTPUT': ' &= ~',
    };
    let dropdown_port = PORT[block.getFieldValue('PORT')];
    let dropdown_pin = PIN[block.getFieldValue('PIN')];
    let dropdown_direction = DIR[block.getFieldValue('DIR')];
    let code;
    code = `GPIO${dropdown_port}->DIR${dropdown_direction}${dropdown_pin};\n`;
    return code;
};

// ENABLE DATA REGISTER
embeddedGenerator['data_config'] = function (block) {
    const PORT = {
        'A': 'A',
        'B': 'B',
        'C': 'C',
        'D': 'D',
        'E': 'E',
        'F': 'F',
    };
    const PIN = {
        '0': '0x01',
        '1': '0x02',
        '2': '0x04',
        '3': '0x08',
        '4': '0x10',
        '5': '0x20',
        '6': '0x40',
        '7': '0x80',
    };
    const DIR = {
        'ON': ' |= ',
        'OFF': ' &= ',
    };
    let dropdown_port = PORT[block.getFieldValue('PORT')];
    let dropdown_pin = PIN[block.getFieldValue('PIN')];
    let dropdown_direction = DIR[block.getFieldValue('DIR')];
    let code;
    code = `GPIO${dropdown_port}->DATA${dropdown_direction}${dropdown_pin};\n`;
    return code;
};

// SET DRIVE STRENGTH BLOCK
embeddedGenerator['str_config'] = function (block) {
    const PORT = {
        'A': 'A',
        'B': 'B',
        'C': 'C',
        'D': 'D',
        'E': 'E',
        'F': 'F',
    };
    const PIN = {
        '0': '0x01',
        '1': '0x02',
        '2': '0x04',
        '3': '0x08',
        '4': '0x10',
        '5': '0x20',
        '6': '0x40',
        '7': '0x80',
    };
    const STRENGTH = {
        '2': '2',
        '4': '4',
        '8': '8',
    };
    let INVERT;
    if (block.getFieldValue('INVERT') === 'TRUE'){
        INVERT = ' &= ~';
    } else {
        INVERT = ' |= ';
    };
    let dropdown_port = PORT[block.getFieldValue('PORT')];
    let dropdown_pin = PIN[block.getFieldValue('PIN')];
    let dropdown_strength = STRENGTH[block.getFieldValue('STRENGTH')];

    let code;
    code = `GPIO${dropdown_port}->DR${dropdown_strength}R${INVERT}${dropdown_pin};\n`;
    return code;
};

// SET DIGITAL INPUT/OUTPUT
embeddedGenerator['dig_config'] = function (block) {
    const PORT = {
        'A': 'A',
        'B': 'B',
        'C': 'C',
        'D': 'D',
        'E': 'E',
        'F': 'F',
    };
    const PIN = {
        '0': '0x01',
        '1': '0x02',
        '2': '0x04',
        '3': '0x08',
        '4': '0x10',
        '5': '0x20',
        '6': '0x40',
        '7': '0x80',
    };
    const DIR = {
        'INPUT': ' |= ',
        'OUTPUT': ' &= ~',
    };
    let dropdown_port = PORT[block.getFieldValue('PORT')];
    let dropdown_pin = PIN[block.getFieldValue('PIN')];
    let dropdown_direction = DIR[block.getFieldValue('DIR')];
    let code;
    code = `GPIO${dropdown_port}->DEN${dropdown_direction}${dropdown_pin};\n`;
    return code;
};

// CONFIGURE GPIO RESISTORS
embeddedGenerator['resistor_config'] = function (block) {
    const PORT = {
        'A': 'A',
        'B': 'B',
        'C': 'C',
        'D': 'D',
        'E': 'E',
        'F': 'F',
    };
    const PIN = {
        '0': '0x01',
        '1': '0x02',
        '2': '0x04',
        '3': '0x08',
        '4': '0x10',
        '5': '0x20',
        '6': '0x40',
        '7': '0x80',
    };
    const RESISTOR = {
        'PUR': 'PUR',
        'PDR': 'PDR',
        'ODR': 'ODR',
    };
    let INVERT;
    if (block.getFieldValue('INVERT') === 'TRUE'){
        INVERT = ' &= ~';
    } else {
        INVERT = ' |= ';
    };
    let dropdown_port = PORT[block.getFieldValue('PORT')];
    let dropdown_pin = PIN[block.getFieldValue('PIN')];
    let dropdown_resistor = RESISTOR[block.getFieldValue('RESISTOR')];
    let code;
    code = `GPIO${dropdown_port}->${dropdown_resistor}${INVERT}${dropdown_pin};\n`;
    return code;
};

// Time Blocks
// Delay Function call
embeddedGenerator['delay_ms'] = function(block) {
    return `delay(${block.getFieldValue('MS')});\n`
};

// Function Blocks
embeddedGenerator['procedures_main'] = function(block) {

    // Define a procedure with a return value.
    const funcName = 'main'
    let xfix1 = '';
    if (embeddedGenerator.STATEMENT_PREFIX) {
        xfix1 += embeddedGenerator.injectId(embeddedGenerator.STATEMENT_PREFIX, block);
    }
    if (embeddedGenerator.STATEMENT_SUFFIX) {
        xfix1 += embeddedGenerator.injectId(embeddedGenerator.STATEMENT_SUFFIX, block);
    }
    if (xfix1) {
        xfix1 = embeddedGenerator.prefixLines(xfix1, embeddedGenerator.INDENT);
    }
    let loopTrap = '';
    if (embeddedGenerator.INFINITE_LOOP_TRAP) {
        loopTrap = embeddedGenerator.prefixLines(
            embeddedGenerator.injectId(embeddedGenerator.INFINITE_LOOP_TRAP, block),
            embeddedGenerator.INDENT);
    }
    const branch = embeddedGenerator.statementToCode(block, 'STACK');
    let returnValue =
        embeddedGenerator.valueToCode(block, 'RETURN', embeddedGenerator.ORDER_NONE) || '';
    let xfix2 = '';
    if (branch && returnValue) {
        // After executing the function body, revisit this block for the return.
        xfix2 = xfix1;
    }
    if (returnValue) {
        returnValue = embeddedGenerator.INDENT + 'return ' + returnValue + ';\n';
    }
    const args = [];
    const variables = block.getVars();
    for (let i = 0; i < variables.length; i++) {
        args[i] = embeddedGenerator.nameDB_.getName(variables[i], Blockly.Names.NameType.VARIABLE);
    }

    let code = 'int main' + '(void) {\n' + xfix1 +
        loopTrap + branch + xfix2 + returnValue + '}';
    code = embeddedGenerator.scrub_(block, code);
    // Add % so as not to collide with helper functions in definitions list.
    embeddedGenerator.definitions_['%' + funcName] = code;
    return null;
};

embeddedGenerator['procedures_defreturn'] = function(block) {

    const RETURN = {
        'INT': 'int',
        'VOID': 'void',
    };
    /*
    const DATA = {
        'SIGNED': '',
        'UNSIGNED': 'unsigned',
    };
     */

    //let dropdown_data = DATA[block.getFieldValue('DATA')];

    let dropdown_return = RETURN[block.getFieldValue('RETURN')];
    // Define a procedure with a return value.
    const funcName = embeddedGenerator.nameDB_.getName(
        block.getFieldValue('NAME'), Blockly.Names.NameType.PROCEDURE);
    let xfix1 = '';
    if (embeddedGenerator.STATEMENT_PREFIX) {
        xfix1 += embeddedGenerator.injectId(embeddedGenerator.STATEMENT_PREFIX, block);
    }
    if (embeddedGenerator.STATEMENT_SUFFIX) {
        xfix1 += embeddedGenerator.injectId(embeddedGenerator.STATEMENT_SUFFIX, block);
    }
    if (xfix1) {
        xfix1 = embeddedGenerator.prefixLines(xfix1, embeddedGenerator.INDENT);
    }
    let loopTrap = '';
    if (embeddedGenerator.INFINITE_LOOP_TRAP) {
        loopTrap = embeddedGenerator.prefixLines(
            embeddedGenerator.injectId(embeddedGenerator.INFINITE_LOOP_TRAP, block),
            embeddedGenerator.INDENT);
    }
    const branch = embeddedGenerator.statementToCode(block, 'STACK');
    let returnValue =
        embeddedGenerator.valueToCode(block, 'RETURN', embeddedGenerator.ORDER_NONE) || '';
    let xfix2 = '';
    if (branch && returnValue) {
        // After executing the function body, revisit this block for the return.
        xfix2 = xfix1;
    }
    if (returnValue) {
        returnValue = embeddedGenerator.INDENT + 'return ' + returnValue + ';\n';
    }

    const TYPE = {

        'INT': 'int',
        'SHORT': 'short int',
        'LONG': 'long int',
        'LLONG': 'long long int',
        'CHAR': 'char',
    };

    let dropdown_type = [TYPE[block.getFieldValue('TYPE')]];
    //const ddType = block.getType();
    const variables = block.getVars();
    const args = [];
    const type = [];
    const argType = [];

    if (variables.length !== 0) {
        for (let i = 0; i < variables.length; i++) {
            args[i] = embeddedGenerator.nameDB_.getName(variables[i], Blockly.Names.NameType.VARIABLE);
            type[i] = dropdown_type[i];
            argType[i] = type[i] + ' ' + args[i];
        }
    } else {
        argType.push("void");
    }

    let code = dropdown_return + ' ' + funcName + '(' + argType.join(', ') + ');\n'
        + dropdown_return + ' '  + funcName + '(' + argType.join(', ') + ') {\n' + xfix1 +
        loopTrap + branch + xfix2 + returnValue + '}';

    code = embeddedGenerator.scrub_(block, code);
    // Add % so as not to collide with helper functions in definitions list.
    embeddedGenerator.definitions_['%' + funcName] = code;
    return null;
};

// Defining a procedure without a return value uses the same generator as
// a procedure with a return value.
embeddedGenerator['procedures_defnoreturn'] = embeddedGenerator['procedures_defreturn'];


embeddedGenerator['procedures_callreturn'] = function(block) {
    // Call a procedure with a return value.
    const funcName = embeddedGenerator.nameDB_.getName(
        block.getFieldValue('NAME'), Blockly.Names.NameType.PROCEDURE);
    const args = [];
    const variables = block.getVars();
    for (let i = 0; i < variables.length; i++) {
        args[i] = embeddedGenerator.valueToCode(block, 'ARG' + i, embeddedGenerator.ORDER_NONE) ||
            'null';
    }
    const code = funcName + '(' + args.join(', ') + ')';
    return [code, embeddedGenerator.ORDER_NONE];
};

embeddedGenerator['procedures_callnoreturn'] = function(block) {
    // Call a procedure with no return value.
    // Generated code is for a function call as a statement is the same as a
    // function call as a value, with the addition of line ending.
    const tuple = embeddedGenerator['procedures_callreturn'](block);
    return tuple[0] + ';\n';
};

embeddedGenerator['procedures_ifreturn'] = function(block) {
    // Conditionally return value from a procedure.
    const condition =
        embeddedGenerator.valueToCode(block, 'CONDITION', embeddedGenerator.ORDER_NONE) ||
        'false';
    let code = 'if (' + condition + ') {\n';
    if (embeddedGenerator.STATEMENT_SUFFIX) {
        // Inject any statement suffix here since the regular one at the end
        // will not get executed if the return is triggered.
        code += embeddedGenerator.prefixLines(
            embeddedGenerator.injectId(embeddedGenerator.STATEMENT_SUFFIX, block),
            embeddedGenerator.INDENT);
    }
    if (block.hasReturnValue_) {
        const value =
            embeddedGenerator.valueToCode(block, 'VALUE', embeddedGenerator.ORDER_NONE) || 'null';
        code += embeddedGenerator.INDENT + 'return ' + value + ';\n';
    } else {
        code += embeddedGenerator.INDENT + 'return;\n';
    }
    code += '}\n';
    return code;
};

embeddedGenerator['variables_set'] = function(block) {

    const DATA = {
        'SIGNED': '',
        'UNSIGNED': 'unsigned',
    };

    const TYPE = {
        'INT': 'int',
        'SHORT': 'short int',
        'LONG': 'long int',
        'LLONG': 'long long int',
        'CHAR': 'char',
    }
    let dropdown_type = TYPE[block.getFieldValue('TYPE')];
    let dropdown_data = DATA[block.getFieldValue('DATA')];
    // Variable setter.
    const argument0 = embeddedGenerator.valueToCode(
        block, 'VALUE', embeddedGenerator.ORDER_ASSIGNMENT) || '0';
    const varName = embeddedGenerator.nameDB_.getName(
        block.getFieldValue('VAR'), Blockly.Names.NameType.VARIABLE);
    return `${dropdown_data} ${dropdown_type} ${varName} = ${argument0};\n`
};

embeddedGenerator['variables_get'] = function(block) {
    // Variable getter.
    const code = embeddedGenerator.nameDB_.getName(block.getFieldValue('VAR'),
        Blockly.Names.NameType.VARIABLE);
    return [code, embeddedGenerator.ORDER_ATOMIC];
};
