// server/src/server.js
const {
    createConnection,
    TextDocuments,
    ProposedFeatures,
    CompletionItem,
    CompletionItemKind,
    TextDocumentSyncKind,
    MarkupKind
} = require('vscode-languageserver/node');

const { TextDocument } = require('vscode-languageserver-textdocument');

const connection = createConnection(ProposedFeatures.all);

const documents = new TextDocuments(TextDocument);

const Keywords = new Map([
    ['if', { kind: CompletionItemKind.Keyword, detail: 'Control flow statement', documentation: 'Conditional execution of a code block based on a condition.' }],
    ['while', { kind: CompletionItemKind.Keyword, detail: 'Loop statement', documentation: 'Executes a block of code while the given condition is true.'}],
    ['function', { kind: CompletionItemKind.Keyword, detail: 'Function declaration', documentation: 'Declares a new function to encapsulate logic for reuse.' }],
    ['else', { kind: CompletionItemKind.Keyword, detail: 'Control flow statement', documentation: 'Conditional execution if an "if" statement returns a different value.' }],
    ['switch', { kind: CompletionItemKind.Keyword, detail: 'Control flow statement', documentation: 'Evaluates an expression and matches it against multiple possible cases.' }],
    ['case', { kind: CompletionItemKind.Keyword, detail: 'Switch case', documentation: 'Specifies a branch in a switch statement based on the matched value.' }],
    ['init', { kind: CompletionItemKind.Keyword, detail: 'Initialization function', documentation: 'Typically used to initialize variables or load data when a script is first loaded.' }],
    ['main', { kind: CompletionItemKind.Keyword, detail: 'Main entry point', documentation: 'Defines the main function that is the entry point of execution.' }],
    ['for', { kind: CompletionItemKind.Keyword, detail: 'Loop statement', documentation: 'Executes a block of code a specified number of times.' }],
    ['return', { kind: CompletionItemKind.Keyword, detail: 'Function return', documentation: 'Exits a function and optionally returns a value.' }],
    ['default', { kind: CompletionItemKind.Keyword, detail: 'Switch default case', documentation: 'Specifies the code to execute in a switch statement when no case matches the value.' }],
    ['break', { kind: CompletionItemKind.Keyword, detail: 'Loop/Control flow exit', documentation: 'Exits from the nearest enclosing loop or switch statement.' }],
    ['enum', { kind: CompletionItemKind.Keyword, detail: 'Enum declaration', documentation: 'Defines a set of named constants for better code organization.' }],
    ['define', { kind: CompletionItemKind.Keyword, detail: 'Macro definition', documentation: 'Defines a macro for use in code.' }],
    ['const', { kind: CompletionItemKind.Keyword, detail: 'define a constant variable that cannot be changed.', documentation: ''}]
]);

const DataTypes = new Map([
    ['int', { kind: CompletionItemKind.Enum, detail: 'Signed 16-bit integer. (-32768, 32767)', documentation: ''}],
    ['int8', { kind: CompletionItemKind.Enum, detail: 'Signed 8-bit integer. (-128, 127)', documentation: ''}],
    ['int16', { kind: CompletionItemKind.Enum, detail: 'Signed 16-bit integer. (-32768, 32767)', documentation: ''}],
    ['int32', { kind: CompletionItemKind.Enum, detail: 'Signed 32-bit integer. (-2147483648, 2147483647)', documentation: ''}],
    ['string', { kind: CompletionItemKind.Enum, detail: 'String of text.', documentation: ''}],
    ['duint8', { kind: CompletionItemKind.Enum, detail: 'Unsigned 8-bit integer. (0, 255)', documentation: ''}],
    ['duint16', { kind: CompletionItemKind.Enum, detail: 'Unsigned 16-bit integer. (0, 65535)', documentation: ''}],
    ['dint32', { kind: CompletionItemKind.Enum, detail: 'Signed 32-bit integer. (-214673648, 2147483647)', documentation: ''}],
    ['dint8', { kind: CompletionItemKind.Enum, detail: 'Signed 8-bit integer. (-128, 127)', documentation: ''}],
    ['dint16', { kind: CompletionItemKind.Enum, detail: 'Signed 16-bit integer. (-32768, 32767)', documentation: ''}],
    ['data', { kind: CompletionItemKind.Enum, detail: '', documentation:''}]
]);

const Constants = new Map([
    ['DEFAULT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_SPACE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_EXCLAMATION', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_DOUBLE_QUOTE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_QUOTE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_POUND', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_DOLLAR', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_PERCENT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_AMPERSAND', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_AND', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_SINGLE_QUOTE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_APOSTROPHE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_LEFT_PARENTHESIS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_OPEN_PARENTHESIS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_RIGHT_PARENTHESIS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_CLOSE_PARENTHESIS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_ASTERISK', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_PLUS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_COMMA', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_MINUS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_PERIOD', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_SLASH', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_DIGIT0', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_DIGIT1', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_DIGIT2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_DIGIT3', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_DIGIT4', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_DIGIT5', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_DIGIT6', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_DIGIT7', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_DIGIT8', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_DIGIT9', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_COLON', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_SEMICOLON', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_LESS_THAN', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_EQUAL', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_GREATER_THAN', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_QUESTION', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_AT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_UPPER_A', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_UPPER_B', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_UPPER_C', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_UPPER_D', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_UPPER_E', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_UPPER_F', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_UPPER_G', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_UPPER_H', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_UPPER_I', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_UPPER_J', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_UPPER_K', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_UPPER_L', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_UPPER_M', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_UPPER_N', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_UPPER_O', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_UPPER_P', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_UPPER_Q', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_UPPER_R', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_UPPER_S', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_UPPER_T', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_UPPER_U', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_UPPER_V', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_UPPER_W', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_UPPER_X', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_UPPER_Y', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_UPPER_Z', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_LEFT_BRACKET', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_LEFT_SQUARE_BRACKET', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_OPEN_SQUARE_BRACKET', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_OPEN_BRACKET', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_BACKSLASH', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_RIGHT_BRACKET', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_RIGHT_SQUARE_BRACKET', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_CLOSE_BRACKET', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_CARAT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_UNDERSCORE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_GRAVE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_BACK_QUOTE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_LOWER_A', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_LOWER_B', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_LOWER_C', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_LOWER_D', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_LOWER_E', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_LOWER_F', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_LOWER_G', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_LOWER_H', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_LOWER_I', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_LOWER_J', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_LOWER_K', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_LOWER_L', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_LOWER_M', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_LOWER_N', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_LOWER_O', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_LOWER_P', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_LOWER_Q', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_LOWER_R', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_LOWER_S', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_LOWER_T', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_LOWER_U', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_LOWER_V', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_LOWER_W', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_LOWER_X', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_LOWER_Y', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_LOWER_Z', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_LEFT_BRACE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_OPEN_BRACE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_LEFT_CURLY_BRACE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_OPEN_CURLY_BRACE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_LEFT_CURLY_BRACKET', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_VERTICAL_BAR', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_BAR', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_PIPE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_RIGHT_BRACE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_CLOSE_BRACE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_RIGHT_CURLY_BRACE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_CLOSE_CURLY_BRACE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_RIGHT_CURLY_BRACKET', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_TILDE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_PS_CROSS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_PS_CIRCLE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_PS_SQUARE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_PS_TRIANGLE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_DPAD_UP', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_DPAD_DOWN', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_DPAD_LEFT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_DPAD_RIGHT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_XB_VIEW', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ASCII_XB_MENU', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['POLAR_RS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['POLAR_LS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['POLAR_GHOST', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['POLAR_RX', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['POLAR_RY', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['POLAR_LX', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['POLAR_LY', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ANALOG_RX', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ANALOG_RY', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ANALOG_LX', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ANALOG_LY', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ANALOG_GHOSTX', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ANALOG_GHOSTY', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['POLAR_RADIUS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['POLAR_ANGLE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['MK_GENERAL', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['MK_ADS_MAP', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['MK_ADS_GAIN_RATIO', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['MK_SENSITIVITY', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['MK_SMOOTHNESS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['MK_ACCELERATION', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['MK_DEPRECATED', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['MK_STICKIZE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['MK_DEADZONE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['MK_DZSHAPE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['MK_WALK_MAP', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['MK_AXIS_X', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['MK_AXIS_Y', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS3_PS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS3_SELECT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS3_START', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS3_R1', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS3_R2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS3_R3', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS3_L1', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS3_L2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS3_L3', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS3_RX', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS3_RY', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS3_LX', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS3_LY', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS3_UP', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS3_DOWN', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS3_LEFT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS3_RIGHT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS3_TRIANGLE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS3_CIRCLE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS3_CROSS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS3_SQUARE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS3_ACCX', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS3_ACCY', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS3_ACCZ', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS3_GYRO', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS4_PS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS4_SHARE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS4_OPTIONS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS4_R1', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS4_R2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS4_R3', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS4_L1', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS4_L2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS4_L3', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS4_RX', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS4_RY', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS4_LX', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS4_LY', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS4_UP', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS4_DOWN', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS4_LEFT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS4_RIGHT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS4_TRIANGLE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS4_CIRCLE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS4_CROSS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS4_SQUARE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS4_ACCX', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS4_ACCY', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS4_ACCZ', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS4_GYROX', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS4_GYROY', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS4_GYROZ', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS4_TOUCH', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS4_FINGER1X', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS4_FINGER1Y', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS4_FINGER1', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS4_FINGER2X', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS4_FINGER2Y', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS4_FINGER2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['WII_HOME', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['WII_MINUS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['WII_PLUS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['WII_RT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['WII_ZR', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['WII_ONE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['WII_C', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['WII_LT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['WII_ZL', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['WII_Z', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['WII_TWO', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['WII_RX', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['WII_RY', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['WII_LX', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['WII_LY', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['WII_NX', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['WII_NY', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['WII_UP', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['WII_DOWN', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['WII_LEFT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['WII_RIGHT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['WII_X', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['WII_B', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['WII_Y', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['WII_ACCZ', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['WII_ACCY', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['WII_ACCX', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['WII_ACCNZ', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['WII_ACCNY', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['WII_ACCNX', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['WII_A', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['WII_IRX', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['WII_IRY', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SWI_HOME', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SWI_MINUS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SWI_PLUS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SWI_ZR', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SWI_ZL', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SWI_L3', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SWI_LY', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SWI_LX', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SWI_LEFT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SWI_L', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SWI_UP', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SWI_DOWN', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SWI_R3', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SWI_RY', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SWI_RX', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SWI_RIGHT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SWI_R', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SWI_X', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SWI_B', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SWI_Y', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SWI_ACCZ', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SWI_ACCY', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SWI_ACCX', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SWI_A', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SWI_GYROX', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SWI_GYROY', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SWI_GYROZ', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SWI_CAPTURE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB1_XBOX', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB1_GUIDE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB1_VIEW', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB1_MENU', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB1_RB', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB1_RT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB1_RS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB1_LB', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB1_LT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB1_LS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB1_RX', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB1_RY', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB1_LX', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB1_LY', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB1_UP', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB1_DOWN', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB1_LEFT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB1_RIGHT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB1_Y', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB1_B', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB1_A', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB1_X', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB1_SHARE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB1_SYNC', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB1_PR1', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB1_PR2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB1_PL1', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB1_PL2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB360_XBOX', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB360_BACK', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB360_START', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB360_RB', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB360_RT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB360_RS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB360_LB', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB360_LT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB360_LS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB360_RX', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB360_RY', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB360_LX', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB360_LY', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB360_UP', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB360_DOWN', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB360_LEFT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB360_RIGHT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB360_Y', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB360_B', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB360_A', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['XB360_X', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DF_PS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DF_SELECT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DF_START', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DF_RPADDLE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DF_R2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DF_R3', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DF_LPADDLE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DF_L2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DF_L3', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DF_GAS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DF_STEERING', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DF_BRAKE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DF_UP', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DF_DOWN', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DF_LEFT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DF_RIGHT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DF_TRIANGLE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DF_CIRCLE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DF_CROSS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DF_SQUARE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DFGT_PS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DFGT_SELECT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DFGT_START', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DFGT_RPADDLE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DFGT_R2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DFGT_R3', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DFGT_LPADDLE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DFGT_L2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DFGT_L3', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DFGT_GAS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DFGT_STEERING', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DFGT_BRAKE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DFGT_LEFT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DFGT_RIGHT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DFGT_TRIANGLE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DFGT_CIRCLE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DFGT_CROSS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DFGT_SQUARE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DFGT_UP_ARROW', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DFGT_UP', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DFGT_DOWN_ARROW', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DFGT_DOWN', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DFGT_DIAL_CCW', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DFGT_DIAL_CW', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DFGT_DIAL', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DFPRO_PS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DFPRO_SELECT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DFPRO_START', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DFPRO_RPADDLE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DFPRO_R2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DFPRO_R3', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DFPRO_LPADDLE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DFPRO_L2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DFPRO_L3', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DFPRO_GAS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DFPRO_STEERING', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DFPRO_BRAKE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DFPRO_UP', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DFPRO_DOWN', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DFPRO_LEFT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DFPRO_RIGHT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DFPRO_TRIANGLE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DFPRO_CIRCLE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DFPRO_CROSS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DFPRO_SQUARE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G25_PS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G25_SELECT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G25_START', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G25_RPADDLE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G25_R2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G25_R3', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G25_LPADDLE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G25_L2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G25_L3', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G25_GAS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G25_CLUTCH', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G25_STEERING', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G25_BRAKE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G25_UP', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G25_DOWN', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G25_LEFT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G25_RIGHT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G25_TRIANGLE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G25_CIRCLE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G25_CROSS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G25_SQUARE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G25_SHIFT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G27_PS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G27_SELECT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G27_START', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G27_RPADDLE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G27_R2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G27_R3', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G27_LPADDLE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G27_L2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G27_L3', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G27_GAS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G27_CLUTCH', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G27_STEERING', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G27_BRAKE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G27_UP', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G27_DOWN', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G27_LEFT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G27_RIGHT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G27_TRIANGLE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G27_CIRCLE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G27_CROSS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G27_SQUARE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G27_SHIFT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G27_L4', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G27_L5', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G27_R4', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G27_R5', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G29_PS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G29_SELECT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G29_START', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G29_RPADDLE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G29_R2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G29_R3', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G29_LPADDLE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G29_L2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G29_L3', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G29_GAS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G29_CLUTCH', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G29_STEERING', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G29_BRAKE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G29_LEFT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G29_RIGHT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G29_TRIANGLE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G29_CIRCLE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G29_CROSS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G29_SQUARE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G29_SHIFT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G29_UP_ARROW', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G29_UP', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G29_DOWN_ARROW', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G29_DOWN', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G29_DIAL_CCW', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G29_DIAL_CW', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['G29_DIAL', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_ENTER', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_ESC', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_BACKSPACE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_TAB', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_SPACE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_MINUS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_EQUAL', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_LEFTBRACE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_RIGHTBRACE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_BACKSLASH', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_HASHTILDE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_SEMICOLON', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_APOSTROPHE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_GRAVE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_COMMA', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_DOT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_SLASH', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_CAPSLOCK', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_F3', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_F4', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_F5', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_F6', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_F7', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_F8', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_F9', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_F10', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_F11', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_F12', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_F13', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_F14', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_F15', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_F16', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_F17', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_F18', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_F19', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_F20', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_F21', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_F22', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_F23', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_F24', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_F1', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_F2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_SYSRQ', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_SCROLLLOCK', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_PAUSE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_INSERT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_HOME', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_PAGEUP', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_DELETE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_END', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_PAGEDOWN', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_DOWN', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_UP', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_NUMLOCK', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_KPSLASH', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_KPASTERISK', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_KPMINUS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_KPPLUS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_KPENTER', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_KP1', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_KP2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_KP3', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_KP4', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_KP5', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_KP6', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_KP7', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_KP8', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_KP9', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_KP0', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_NUM1', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_NUM2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_NUM3', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_NUM4', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_NUM5', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_NUM6', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_NUM7', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_NUM8', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_NUM9', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_NUM0', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_KPDOT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_102ND', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_COMPOSE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_POWER', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_KPEQUAL', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_OPEN', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_HELP', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_PROPS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_FRONT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_STOP', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_AGAIN', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_UNDO', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_CUT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_COPY', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_PASTE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_FIND', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_MUTE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_VOLUMEUP', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_VOLUMEDOWN', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_KPCOMMA', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_RO', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_KATAKANAHIRAGANA', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_YEN', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_HENKAN', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_MUHENKAN', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_KPJPCOMMA', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_HANGEUL', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_HANJA', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_KATAKANA', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_HIRAGANA', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_ZENKAKUHANKAKU', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_KPLEFTPAREN', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_KPRIGHTPAREN', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_LEFTSHIFT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_LEFTMETA', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_LEFTCTRL', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_LEFTALT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_LEFT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_RIGHTSHIFT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_RIGHTMETA', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_RIGHTCTRL', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_RIGHTALT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_RIGHT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_MEDIA_PLAYPAUSE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_MEDIA_STOPCD', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_MEDIA_PREVIOUSSONG', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_MEDIA_NEXTSONG', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_MEDIA_EJECTCD', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_MEDIA_VOLUMEUP', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_MEDIA_VOLUMEDOWN', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_MEDIA_MUTE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_MEDIA_WWW', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_MEDIA_BACK', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_MEDIA_FORWARD', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_MEDIA_STOP', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_MEDIA_FIND', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_MEDIA_SCROLLUP', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_MEDIA_SCROLLDOWN', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_MEDIA_EDIT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_MEDIA_SLEEP', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_MEDIA_COFFEE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_MEDIA_REFRESH', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_MEDIA_CALC', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_A', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_B', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_C', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_D', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_E', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_F', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_G', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_H', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_I', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_J', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_K', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_L', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_M', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_N', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_O', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_P', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_Q', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_R', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_S', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_T', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_U', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_V', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_W', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_X', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_Y', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_Z', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_1', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_3', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_4', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_5', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_6', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_7', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_8', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_9', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['KEY_0', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['MOD_LCTRL', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['MOD_LSHIFT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['MOD_LALT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['MOD_LGUI', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['MOD_RCTRL', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['MOD_RSHIFT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['MOD_RALT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['MOD_RGUI', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['TRACE_1', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['TRACE_2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['TRACE_3', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['TRACE_4', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['TRACE_5', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['TRACE_6', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['LED_NONE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['LED_1', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['LED_2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['LED_3', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['LED_4', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['LED_5', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['LED_6', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['LEDMASK_OFF', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['LEDMASK_L1', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['LEDMASK_L2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['LEDMASK_L3', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['LEDMASK_L4', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['LEDMASK_R1', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['LEDMASK_R2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['LEDMASK_R3', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['LEDMASK_R4', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['LEDMASKD_L1', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['LEDMASKD_L2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['LEDMASKD_L3', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['LEDMASKD_L4', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['LEDMASKD_R1', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['LEDMASKD_R2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['LEDMASKD_R3', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['LEDMASKD_R4', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS4_GREEN', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS4_RED', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS4_BLUE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DS4_GREEN', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DS4_RED', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DS4_BLUE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PLAYER_1', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PLAYER_2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PLAYER_3', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PLAYER_4', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['RED_1', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['GREEN_1', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['BLUE_1', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['RED_2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['GREEN_2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['BLUE_2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['RGB1', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['RGB2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['RGB3', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['RGB4', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['RGB5', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['RGB6', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['RGB7', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['RGB8', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['OLED_WHITE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['OLED_BLACK', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['OLED_WIDTH', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['OLED_HEIGHT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['OLED_FONT_SMALL_WIDTH', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['OLED_FONT_SMALL_HEIGHT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['OLED_FONT_SMALL', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['OLED_FONT_MEDIUM_WIDTH', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['OLED_FONT_MEDIUM_HEIGHT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['OLED_FONT_MEDIUM', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['OLED_FONT_LARGE_WIDTH', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['OLED_FONT_LARGE_HEIGHT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['OLED_FONT_LARGE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['OLED_CROSS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['OLED_CIRCLE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['OLED_SQUARE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['OLED_TRIANGLE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['OLED_UP', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['OLED_DOWN', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['OLED_LEFT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['OLED_RIGHT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['OLED_VIEW', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['OLED_MENU', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ALL_REMAPS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['FALSE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['TRUE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['NOT_USE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['MK_UNUSED', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['DZ_CIRCLE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['BITMASK_4', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['BITMASK_5', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['BITMASK_6', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['BITMASK_7', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['BITMASK_8', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['BITMASK_9', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['BITMASK_10', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['BITMASK_11', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['BITMASK_12', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['BITMASK_13', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['BITMASK_14', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['BITMASK_15', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['BITMASK_16', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['BITMASK_17', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['BITMASK_18', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['BITMASK_19', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['BITMASK_1', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['BITMASK_20', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['BITMASK_21', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['BITMASK_22', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['BITMASK_23', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['BITMASK_24', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['BITMASK_25', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['BITMASK_26', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['BITMASK_27', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['BITMASK_28', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['BITMASK_29', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['BITMASK_2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['BITMASK_30', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['BITMASK_31', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['BITMASK_32', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['BITMASK_3', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PIO_NONE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PIO_AUTO', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PIO_PS3', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PIO_XB360', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PIO_WII', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PIO_PS4', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PIO_XB1', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PIO_SWITCH', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PIO_PS5', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS4T_P1Y', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS4T_P1X', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS4T_P1', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS4T_P2Y', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS4T_P2X', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS4T_P2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PRODUCTID', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ISSWAPPED', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['CPU_USAGE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PENDING_CONFIG', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['ACTIVE_CONFIG', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['UNSUPPORTED', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['STRIKEPACK_XB1FPS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['STRIKEPACK_XB1ELI', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['STRIKEPACK_XB1', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['STRIKEPACK_PS4FPS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SWITCH_UP', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['MODPOD', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['CRONUS_ZEN', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PVAR_2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PVAR_3', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PVAR_4', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PVAR_5', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PVAR_6', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PVAR_7', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PVAR_8', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PVAR_9', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PVAR_10', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PVAR_11', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PVAR_12', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PVAR_13', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PVAR_14', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PVAR_15', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PVAR_16', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PVAR_1', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_7', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_8', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_9', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_10', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_11', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_12', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_13', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_14', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_15', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_16', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_17', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_18', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_19', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_1', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_20', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_21', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_22', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_23', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_24', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_25', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_26', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_27', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_28', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_29', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_30', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_31', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_32', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_33', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_34', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_35', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_36', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_37', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_38', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_39', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_3', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_40', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_41', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_42', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_43', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_44', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_45', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_46', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_47', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_48', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_49', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_4', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_50', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_51', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_52', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_53', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_54', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_55', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_56', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_57', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_58', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_59', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_5', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_60', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_61', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_62', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_63', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_64', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['SPVAR_6', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['RUMBLE_A', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['RUMBLE_B', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['RUMBLE_RT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['RUMBLE_LT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_ADT_MODE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_ADT_MODE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_ADT_START', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_ADT_START', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_ADT_FORCE1', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_ADT_FORCE1', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_ADT_FORCE2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_ADT_FORCE2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_ADT_STRENGTH_LOW', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_ADT_STRENGTH_LOW', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_ADT_STRENGTH_MID', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_ADT_STRENGTH_MID', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_ADT_STRENGTH_HIGH', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_ADT_STRENGTH_HIGH', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_ADT_FREQ', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_ADT_FREQ', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_ADT_NR', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_ADT_NR', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_ADT_CR', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_ADT_CR', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_ADT_SR', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_ADT_SR', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_ADT_EF1', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_ADT_EF1', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_ADT_EF2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_ADT_EF2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_ADT_OFF', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_ADT_OFF', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_ADT_NO_RES1', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_ADT_NO_RES1', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_ADT_NO_RES2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_ADT_NO_RES2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_ADT_HAS_RES1', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_ADT_HAS_RES1', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_ADT_HAS_RES2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_ADT_HAS_RES2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_PS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_SHARE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_OPTIONS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_R1', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_R2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_R3', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_L1', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_L2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_L3', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_RX', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_RY', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_LX', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_LY', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_UP', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_DOWN', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_LEFT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_RIGHT', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_TRIANGLE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_CIRCLE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_CROSS', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_SQUARE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_ACCX', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_ACCY', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_ACCZ', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_GYROX', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_GYROY', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_GYROZ', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_MUTE', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_TOUCH', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_FINGER1X', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_FINGER1Y', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_FINGER1', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_FINGER2X', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_FINGER2Y', {kind: CompletionItemKind.Constant, details: '', documentation: ''}],
    ['PS5_FINGER2', {kind: CompletionItemKind.Constant, details: '', documentation: ''}]
]);

const BuiltInFunctions = new Map([
    ['get_val', { kind: CompletionItemKind.Function, detail: 'Returns the current value of a controller entry.', documentation: 'get_val returns the current value of a controller entry in the form of an int.  \nThis value represents a percentage %.  \nGPC supports treating an int as a boolean value.  \nThis means get_val can be used to test whether a controller button, trigger, or stick is being pressed or not. \n\nSyntax:\nget_val ( <identifier> );\n\nParameters:\n<identifier> : the identifier of a controller entry.\n\nReturns:\nThe current value of the specified identifier.  Can range from -100 to +100 depending on the entry type.'}],
    ['get_lval', { kind: CompletionItemKind.Function, detail: 'Returns the previous value of a controller entry.', documentation:'get_lval is similar to get_val with the exception that it returns the value of the specified identifier in the previous iteration (run) of the main loop. This value is also returned as an int and represents a percentage %. However, get_lval gets its data from the input report so, unlike get_val,  \nis not affected by any code before it.  \nFor example, if you were to use the set_val command to overwrite the output of an identifier, get_lval would still return the previous value of the identifier.\n\nSyntax:\nget_lval ( <identifier> );\n\nParameters:\n<identifier> : the identifier of a controller entry.\n\nReturns:\nThe previous value of the specified identifier. \nCan range from -100 to +100 depending on the entry type.'}],
    ['get_ptime', { kind: CompletionItemKind.Function, detail: 'Returns the elapsed time of a controller entries state change.', documentation: 'get_ptime returns the value in milliseconds of an identifiers state change in the form of an int.  \nWhat this means is when an identifiers value changes from FALSE to TRUE or vice versa, the counter for get_ptime on that identifier is reset to 0. Therefore the clock is always running for this function so it should be used with another command, such as get_val.\n\nSyntax:\nget_ptime ( <identifier> );\n\nParameters:\n<identifier> : the identifier of a controller entry.\n\nReturns:\nThe elapsed time of a controller entry state changes. The value returned is in milliseconds with a range of 0 to 32767'}],
    ['get_controller', { kind: CompletionItemKind.Function, detail: 'Returns the type of controller currently connected to the input port.', documentation: 'get_controller returns a value in the form of an int which represents the controller type currently connected to the input port of the Cronus.\n\nSyntax:\nget_controller();\n\nParameters:\nNone\n\nReturns:\nA value representing which type of controller is currently connected.'}],
    ['get_battery', { kind: CompletionItemKind.Function, detail: 'Returns the current status of the battery for a wireless controller.', documentation:'get_battery returns the battery level - if applicable - of the connected controller in the form of an int ranging from 0 to 11.  With 0 being discharged, 10 being fully charged and 11 being charging. If no battery is connected, for example, a wired controller is connected, then it returns 10.\n\nSyntax:\nget_batter();\n\nParameters:\nNone\n\nReturn:\nA value ranging from 0 (Discharged) to 10 (Fully Charged) or 11 if charging.'}],
    ['event_press', { kind: CompletionItemKind.Function, detail: 'Returns TRUE when a controller entry has been pressed.', documentation: 'event_press returns TRUE in the main iteration when a control changes from FALSE to TRUE.  Therefore, even if a button is pressed and held down, event_press would only return TRUE at the moment it is pressed and not while the button was held.  This makes it perfect for combos you only wish to run once when a button is pressed.\n\nSyntax:\nevent_press ( <identifier> );\n\nParameters:\n<identifier> : the identifier of a controller entry\n\nReturns:\nReturns TRUE in the main iteration when a control value changes from FALSE to TRUE.'}],
    ['event_release', { kind: CompletionItemKind.Function, detail: 'Returns TRUE when a controller entry has been released.', documentation: 'event_release is the opposite of event_press, it returns TRUE in the main iteration when a control changes from TRUE to FALSE.  This makes it ideally suited to run code that you only want to run once when a button is released.\n\nSyntax:\nevent_release ( <identifier> );\n\nParameters:\n<identifier> : the identifier of a controller entry\n\nReturns:\nReturns TRUE in the main iteration when a control value changes from TRUE to FALSE.'}],
    ['get_ival', { kind: CompletionItemKind.Function, detail: 'Gets the input value of a button to check if it has been modified by the script.', documentation: 'get_ival gets the input value of a button to check if it has been modified by the script. AKA returns the Input Value of the <Identifier>\n\nSyntax:\nget_ival( <identifier> );\n\nParameters:\n<identifier> : the identifier of a controller entry\n\nReturns:\nNon-Modified Value (Input Value) of the given identifier.'}],
    ['get_brtime', { kind: CompletionItemKind.Function, detail: 'Gets the time the input value has been 0.', documentation: 'Checks how long the given identifier has been released, since the last press.\n\nSyntax:\nget_brtime( <identifier> );\n\nParameters:\n<identifier> : the identifier of a controller entry\n\nReturns:\nThe amount of time since the last <identifier> press.'}],
    ['swap', { kind: CompletionItemKind.Function, detail: 'Swaps the input values to be sent to the console temporarily.', documentation: 'swap does as the name implies, it swaps the values of two controller entries. This makes it useful for remapping buttons on the fly.\n\nSyntax:\nswap ( <identifier1> , <identifier2> );\n\nParameters:\n<identifier1>   : the identifier of a controller entry\n<identifier2>   : the identifier of a controller entry\n\nReturns:\nNone'}],
    ['block', { kind: CompletionItemKind.Function, detail: 'locks the input from being sent to the console for the specified time.', documentation: 'block prevents the forwarding of a controller entry for a set period of time which is set in milliseconds.  This time can range from 20 to 4000 milliseconds.  It is extremely useful when you wish to get two uses from a single button.\n\nSyntax:\nblock ( <identifier> , <milliseconds> );\n\nParameters:\n<identifier>   : the identifier of a controller entry\n<milliseconds> : Length of time in milliseconds to block forwarding for.\nAllowed range 20 ~ 4000\n\nReturns:\nNone'}],
    ['sensitivity', { kind: CompletionItemKind.Function, detail: 'Changes the input sensitivity.', documentation: 'sensitivity adjusts the sensitivity of an analog controller entry, usually, this is an axis. The function takes three parameters, the control to be modified, the midpoint, and the sensitivity multiplier. Midpoint sets the midpoint value of the controller entry.  The default value is 50%.  By changing this value, you are setting two sensitivity ranges.  With a value lower than 50% a high sensitivity range is created closer to the rest position and a low sensitivity range when far from the rest position. A value above 50% creates the opposite effect. The Sensitivity multiplier is the amount the input value is multiplied by. The parameter is passed in percentage. So 40 would mean multiply by 0.40, 100 means multiply by 1.00, and 140 means multiply by 1.40.\n\nSyntax:\nsensitivity ( <identifier> , <midpoint> , <sensitivity> );\n\nParameters:\n<identifier> : the identifier of a controller entry\n<midpoint> : sets the midpoint value\n<sensitivity> : the ratio of the sensitivity adjustment\n\nReturns:\nNone'}],
    ['deadzone', { kind: CompletionItemKind.Function, detail: 'Modifies the inner "deadzone", and essentially pushes the starting value (when not 0) from the center by deadzone_x/deadzone_y or radius.', documentation: 'deadzone adjusts the values of the output to alter the deadzone of two axis. The default deadzone programmed into consoles is 20%, which means a console will ignore any signal from an analog stick that is below 20%. The CronusZEN can adjust the output signals relative to the input.\n\nSyntax:\ndeadzone ( <identifier_x> , <identifier_y> , <dzone_x> / DZ_CIRCLE , <dzone_y> / <radius> ); \n\nParameters:\n<identifier_x> : a controller entry which represents an X axis\n<identifier_y>  : a controller entry which represents a Y axis\n<dzone_x> / DZ_CIRCLE : X axis deadzone value / DZ_CIRCLE constant\n<dzone_y> / <radius>  : Y axis deadzone value / The radius value of the circle\n\nReturns:\nNone'}],
    ['stickize', { kind: CompletionItemKind.Function, detail: 'Modifies outer deadzone, essentially forces the stick to not be further out than the radius from the inner point.', documentation: 'stickize transforms the values of a Wiimote IR or mouse input to an analog stick. It does this by setting the radial output of the translation from their movements to the analogue stick.\n\nSyntax:\nstickize ( <identifier_x> , <identifier_y> ,  <radius> );\n\nParameters:\n<identifier_x> : a controller entry which represents an X axis\n<identifier_y> : a controller entry which represents a Y axis\n<radius> : The radius value of the circle.\n\nReturns:\nNone'}],
    ['ps4_touchpad', { kind: CompletionItemKind.Function, detail: 'Returns detailed information on the DualShock 4 touchpad state.', documentation: 'ps4_touchpad returns detailed information on the current state of the touchpad.  Like get_val, it returns an int.  ps4_touchpad can give you information on where two fingers are positioned on the touchpad and their X / Y coordinates.\n\nSyntax:\nps4_touchpad ( <PS4T_constant> );\n\nParameters:\n<PS4T_constant> : A constant from the table above\n\nReturns:\nAn int value related to the PS4T_* constant used'}],
    ['ps4_set_touchpad', { kind: CompletionItemKind.Function, detail: 'Touches the DualShock 4 touchpad in a specific (X, Y) position.', documentation: 'ps4_set_touchpad will touch the DualShock 4 touchpad in a specific (X, Y) position. \n\nSyntax:\nps4_set_touchpad ( <X Value>, <Y Value> );\n\nParameters:\n<X Value> : X position in the DualShock 4 touchpad, ranging from -100 to 100.\n<Y Value> : Y position in the DualShock 4 touchpad, ranging from -100 to 100.\n\nReturns:\nNone'}],
    ['turn_off', { kind: CompletionItemKind.Function, detail: 'Turns off a wireless controller connected to the input port.', documentation: 'turn_off will switch off a wireless controller connected to the CronusZEN input port. \n\nSyntax:\nturn_off();\n\nParameters:\nNone\n\nReturns:\nNone'}],
    ['wii_offscreen', { kind: CompletionItemKind.Function, detail: 'Returns TRUE if the IR sensor on a Wiimote is off screen.', documentation: 'wii_offscreen checks to see if the Wiimote controller is pointing off screen.\n\nSyntax:\nwii_offscreen();\n\nParameters:\nNone\n\nReturns:\nTRUE if the Wiimote IR is pointing off screen, FALSE if not.'}],
    ['get_adt', { kind: CompletionItemKind.Function, detail: 'Returns the current value of an adaptive trigger entry.', documentation: 'get_adt returns the current value of an adaptive trigger entry.  The raw values can also be viewed in Device Monitor by clicking Toggle PS5 ADT on the bottom right of the Device Monitor window in Cronus Zen Studio.\n\nSyntax:\nget_adt ( <trigger>, <identifier> );\n\nParameters:\n<trigger> : Adaptive trigger can be either PS5_L2 or PS5_R2.\n<identifier> : the identifier of an adaptive trigger.\n\nReturns:\nThe current value of the specified identifier. Can range from 0 to +255 depending on the entry type.'}],
    ['set_adt', { kind: CompletionItemKind.Function, detail: 'Sets the value of a adaptive trigger entry.', documentation: 'set_adt can set a value of 0 to 255 to any adaptive trigger identifier covered in get_adt.  Values to an Adaptive Trigger will override the rumble feeling felt from a game.\n\nSyntax:\nset_adt ( <trigger>, <identifier> );\n\nParameters:\n<trigger> : Adaptive trigger can be either PS5_L2 or PS5_R2.\n<identifier> : the identifier of a controller entry.\n\nReturns:\nNone'}],
    ['adt_off', { kind: CompletionItemKind.Function, detail: 'Turns off an adaptive trigger. This will also reset any modifications done using set_adt.', documentation: 'adt_off can be used to turn off the adaptive triggers. This will also reset both triggers to their default state.\n\nSyntax:\nadt_off();\n\nParameters:\nNone\n\nReturns:\nNone'}],
    ['adt_cmp', { kind: CompletionItemKind.Function, detail: 'Compares raw ADT data with an array that is used with addr.', documentation: ''}],
    ['addr', { kind: CompletionItemKind.Function, detail: 'Returns an offset rather than a value.', documentation: ''}],
    ['get_rumble', { kind: CompletionItemKind.Function, detail: 'Returns the current value of a Rumble Motor.', documentation: 'get_rumble returns the speed of the chosen rumble motor on the controller in the form of an int. The value returned can range from 0 to 100 which represents the speed as a percentage ( % ).\n\nSyntax:\nget_rumble ( <rumble_identifier> );\n\nParameters:\n<rumble_identifier> : the identifier of a rumble motor.\n\nReturns:\nAn int ranging from 0 to 100 which represents the current speed of the chosen motor.'}],
    ['set_rumble', { kind: CompletionItemKind.Function, detail: 'Sets the speed of a Rumble Motor.', documentation: 'set_rumble sets the speed of the chosen rumble motor on the controller.\n\nSyntax:\nset_rumble (<rumble_identifier>,<rumble_speed>);\n\nParameters:\n<rumble_identifier> : the identifier of a rumble motor.\n<rumble_speed> : Percentage value of the rumble motor ranging 0 - 100 represented as an int.\n\nReturns:\nNone'}],
    ['block_rumble', { kind: CompletionItemKind.Function, detail: 'Blocks any rumble signals from the console/pc.', documentation: 'block_rumble does as it implies and blocks any rumble signals to the controller.  Once this function is used, it remains active until such time as it is reset in the script or the script is unloaded. \n\nSyntax:\nblock_rumble();\n\nParameters:\nNone\n\nReturns:\nNone'}],
    ['reset_rumble', { kind: CompletionItemKind.Function, detail: 'Resets the rumble state and returns the condition of the motors to the console/pc.', documentation: 'reset_rumble returns control of the rumble motors to the console.  It also deactivates block_rumble if it is active.\n\nSyntax:\nreset_rumble();\n\nParameters:\nNone\n\nReturns:\nNone'}],

    ['set_led', { kind: CompletionItemKind.Function, detail: 'Sets the state of the LED on a controller.', documentation: 'set_led sets the state of an LED on the controller.\n\nSyntax:\nset_led( <led_identifier>,<led_state> );\n\nParameters:\n<led_identifier> : the LED identifier.\n<led_state> : the state identifier of the controller LED.\n\nReturns:\nNone'}],
    ['get_led', { kind: CompletionItemKind.Function, detail: 'Gets the state of the LED on a controller.', documentation: 'get_led returns a value in the form of an int which represents the current state of the chosen LED. The return value from this function informs you of the current state of the selected LED.  The function returns a value ranging from 0 ~ 3; \n\nSyntax:\nget_led ( <Led_Identifier> ); \n\nParameters:\n<LED_Identifier> : The identifier of an LED\n\nReturns:\nAn int ranging from 0 ~ 3, which represents the current state.'}],
    ['set_ledx', { kind: CompletionItemKind.Function, detail: 'Blinks a LED a certain number of times.', documentation: 'set_ledx is used to Blink and LED a set amount of times.  You can blink a led from 0 to 255 times.  0 sets the LED to on. \n\nSyntax:\nset_ledx ( <led_identifier> , <num_of_blinks> );\n\nParameters:\n<led_identifier> : the identifier of an LED\n<no_of_blinks>   : The number of times to blink the LED\n\nReturns:\nNone'}],
    ['get_ledx', { kind: CompletionItemKind.Function, detail: 'Checks if a LED is being blinked by the set_ledx function.', documentation: 'get_ledx checks to see if an LED is currently being blinked by the set_ledx function. \n\nSyntax:\nget_ledx();\n\nParameters:\nNone\n\nReturns:\nTRUE is the LEDs are being blinked by the set_ledx function, FALSE if they are not'}],
    ['reset_leds', { kind: CompletionItemKind.Function, detail: 'Reset the LEDs state to what was set by the console/pc.', documentation: 'reset_leds returns control of the LEDs to the console and disables any current LED states which are being set by the Virtual Machine.\n\nSyntax:\nreset_leds();\n\nParameters:\nNone\n\nReturns:\nNone'}],
    ['get_ps4_lbar', { kind: CompletionItemKind.Function, detail: 'Gets ps4 light bar color.', documentation: 'get_ps4_lbar gets the playstation 4 lightbar led state from the console. get_ps4_lbar(Color) There is 3 Colors: PS4_RED, PS4_GREEN, and PS4_BLUE. They have a range from 0 - 255 ( Lower the number equals less brightness, higher the number equals more brighter ).\n\nSyntax:\nget_ps4_lbar( <bool>, <value>, <Identifier> );\n\nParameters:\n<bool> : set to TRUE if it should check to see if the console is sending the <identifier>.\n<value> : the RGB Value of the <identifier>,s color.\n<indetifier> : Color identifier (PS4_GREEN, PS4_RED, PS4_BLUE)\n\nReturns:\n<Identifiers> RGB Value. 0 ~ 255'}],
    ['set_ps4_lbar', { kind: CompletionItemKind.Function, detail: 'Sets ps4 light bar color.', documentation: 'set_ps4_lbar sets the PlayStation 4 lightbar led state on the controller and sets the color that will be sent to the controller. There are 3 Colors: DS4_RED, DS4_GREEN, and DS4_BLUE. They have a range from 0 - 255 ( Lower the number equals less brightness, higher the number equals more brighter ).\n\nSyntax:\nset_ps4_lbar( <R>, <G>, <B> );\n\nParameters:\n<R> : Red RGB Value\n<G> : Green RGB Value\n<B> : Blue RGB Value.\n\nReturns:\nNone'}],

    ['get_keyboard', { kind: CompletionItemKind.Function, detail: 'Checks to see if a chosen keyboard key is held down.', documentation: 'Syntax\nget_keyboard( <key_constant> ); \n\nParameters:\n<key_constant> : any defined keyboard constant.\n\nReturns:\nTRUE if the key constant is being pressed and held, FALSE otherwise.'}],
    ['get_modifiers', { kind: CompletionItemKind.Function, detail: 'Checks to see if a keyboard modifier is held down. (ALT, SHIFT, CTRL, etc.)', documentation: 'Syntax:\nget_modifiers( <variable>, <bit_index> ); \n\nParameters:\n<variable> : any defined variable.\n<bit_index> : index point of the bit to IF held\nReturns:\nTRUE if a modifier is held, FALSE otherwise.'}],

    ['get_rtime', { kind: CompletionItemKind.Function, detail: 'Returns the elapsed time between main iteration in milliseconds.', documentation: 'get_rtime returns the elapsed time between the current and previous iteration of the main function.  The value returned is in milliseconds.\n\nSyntax:\nget_rtime();\n\nParameters:\nNone\n\nReturns:\nThe elapsed time - in milliseconds - between the main iteration.'}],
    ['get_slot', { kind: CompletionItemKind.Function, detail: 'Returns the active slot number.', documentation: 'get_slot returns an int value representing the current active slot of the Cronus Device.\n\nSyntax:\nget_slot();\n\nParameters:\nNone\n\nReturns:\nAn int value representing the current active slot of the Cronus Device.'}],
    ['load_slot', { kind: CompletionItemKind.Function, detail: 'Loads a specified slot.', documentation: 'load_slot will attempt to load the slot number specified within its parameter. If there is no script current stored in the specified slot, then it will unload the current slot and load slot 0 of the device.\n\nSyntax:\nload_slot ( <slot_number> );\n\nParameters:\n<slot_number> : A value which represents a slot number to load with a range of 0 - 9 on Cronus MAX Plus or 0 - 8 on Cronus ZEN.\n\nReturns:\bNone'}],
    ['get_ctrlbutton', { kind: CompletionItemKind.Function, detail: 'Returns the identifier of controller button.', documentation: 'get_ctrlbutton returns the current control button.  The control button is set in the Device tab within Cronus PROs Options window or the Device Tab of the Cronus Zen. The enable remote control switch on device dictates which button it is set too.\n\nSyntax:\nget_ctrlbutton();\n\nParameters:\nNone\n\nReturns:\nDepending on the remote slot settings the value can be 0, 1 or 8.'}],
    ['vm_tctrl', { kind: CompletionItemKind.Function, detail: 'Sets the vm timeout for the next interation.', documentation: 'opcode sets the virtual machine timeout for the next iteration. By default, the virtual machine runs the main loop every 10 milliseconds as it aids stability. You can however adjust how often each main iteration is run. Just be aware than changing this setting may cause instability within your script.\n\nSyntax:\nvm_tctrl( <variable> );\n\nParameters:\n<variable> : Numeric value to add to the Virtual Machine base time. Range -9 ~ 10\n\nReturns:\nNone'}],
    ['set_polar', { kind: CompletionItemKind.Function, detail: 'Set the stick output at a given angle and radius with a high resolution value.', documentation: 'Sets the stick output at a given angle and radius with a high resolution value.\n\nSyntax:\nset_polar( stick, angle, radius );\n\nParameters:\nstick: defined stick.\nangle: index point of the bit to be set with a range of 0 to 359.\nradius: index point of the bit to be set with a range of -32768 to 32767.\n\nReturns:\nNone'}],
    ['set_rgb', { kind: CompletionItemKind.Function, detail: 'Sets the LED On the ZEN to the supplied RGB color.', documentation: 'Sets the LED on the ZEN to the supplied RGB color (Red,Green,Blue).\n\nSyntax:\nset_rgb( red, green, blue );\n\nParameters:\nred : an value of 0 - 255. Will add more RED to the color.\ngreen : an value of 0 - 255. Will add more green to the color.\nblue : an value of 0 - 255. Will add more blue to the color.\n\nReturns:\nNone'}],
    ['set_hsb', { kind: CompletionItemKind.Function, detail: 'Sets the LED on the ZEN to the supplied HSB color.', documentation: 'set_hsb sets the LED colors on the Zen eyes or a Playstation controller based on the Hue, Saturation, and Brightness.\n\nSyntax:\nset_hsb( hue, Saturation, brightness );\n\nParameters:\nHue : Hue value of the color.\nSaturation : Saturation value of the color.\nBrightness : Brightness value of the color.\n\nReturns:\nNone'}],
    ['clamp', { kind: CompletionItemKind.Function, detail: 'The clamp() function clamps a value between an upper and lower bound. clamp() enables selecting a middle value within a range of values between a defined minimum and maximum. It takes three parameters: a minimum value, a preferred value, and a maximum allowed value.', documentation: 'The clamp function clamps x to the range [min, max].\n\nSyntax:\nclamp(x, min, max);\n\nParameters:\nx : number to clamp.\nmin : Lower bound of range to which x is clamped.\nmax : Upper bound of range the which x is clamped.\n\nReturns:\nReturns min if x is less than min, max if x is greater than max, and x otherwise.'}],

    ['get_polar', { kind: CompletionItemKind.Function, detail: 'Gets the stick output at a given angle or radius with a high resolution value.', documentation: 'Syntax:\nget_polar( stick, angle_or_radius );\n\nParameters:\n<stick> : defined stick (POLAR_LS or POLAR_RS).\n<angle_or_radius> : POLAR_ANGLE or POLAR_RADIUS - the parameter you wish to get\n\nReturns:\nCurrent angle or radius of an analog stick.'}],
    ['get_ipolar', { kind: CompletionItemKind.Function, detail: 'Gets the unmodified stick output at a given angle or radius with a high resolution value.', documentation: 'Syntax:\nget_ipolar( stick, angle_or_radius );\n\nParameters:\n<stick> : defined stick (POLAR_LS or POLAR_RS).\n<angle_or_radius> : POLAR_ANGLE or POLAR_RADIUS - the parameter you wish to get\n\nReturns:\nCurrent angle or radius of an analog stick.'}],

    ['remap', { kind: CompletionItemKind.Function, detail: 'Assigns the value of a controller input to the output.', documentation: 'remap assigns the value of the input identifier to the output identifier\n\nSyntax:\nremap <source> -> <target>;\n\nParameters:\n<source> : The source identifier meaning the input\n<target> : The target identifier meaning the output\n\nReturns:\nNone'}],
    ['unmap', { kind: CompletionItemKind.Function, detail: 'Disconnects an input from the output report.', documentation: 'unmap disconnects an input from the output report. This means that although the Virtual Machine can still see the value of the button/axis on the input report, it will not pass its value onto the console in the output report. You can therefore still use an unmapped button to run code or start combos in your GPC script without worrying about its original function being sent to the console. \n\nSyntax:\nunmap <target>;\n\nParameters:\n<target> : The target identifier meaning the output, if the constant ALL_REMAPS is used here it resets all remaps in the script back to their original setting.\n\nReturns:\nNone'}],

    ['combo_run', { kind: CompletionItemKind.Function, detail: 'Runs a combo.', documentation: 'combo_run does precisely what the name suggests and runs a combo. However, unlike the combo_restart command, it has no effect if the combo is currently running. It will only start a combo if it is not already running.\n\nSyntax:\ncombo_run( <combo_name> );\n\nParameters:\n<combo_name> : The name assigned to a combo\n\nReturns:\nNone'}],
    ['combo_running', { kind: CompletionItemKind.Function, detail: 'Checks if a combo is running.', documentation: 'combo_running is a function that can be used in your code to check is a combo is running is not. If the combo named in its parameter is running, then it will return TRUE. If not, it will return FALSE.\n\nSyntax:\ncombo_running( <combo_name> );\n\nParameters:\n<combo_name> : The name assigned to a combo\n\nReturns:\nTRUE if combo is running, FALSE if not.'}],
    ['combo_stop', { kind: CompletionItemKind.Function, detail: 'Stops a running combo.', documentation: 'combo_stop does precisely what the name suggests and will stop a combo if it is running. As with combo_run, it has no effect if the combo is currently not running.\n\nSyntax:\ncombo_stop( <combo_name> );\n\nParameters:\n<combo_name> : The name assigned to a combo\n\nReturns:\nNone'}],
    ['combo_restart', { kind: CompletionItemKind.Function, detail: 'Restarts a running combo.', documentation: 'combo_restart will restart a running combo. If the combo started within its parameters is currently running, it will be restarted from the beginning. If the combo is not currently running, it will be run.\n\nSyntax:\ncombo_restart( <combo_name> );\n\nParameters:\n<combo_name> : The name assigned to a combo\n\nReturns:\nNone'}],
    ['combo_suspend', { kind: CompletionItemKind.Function, detail: 'Suspends a combo.', documentation: 'combo_suspend command suspends (pauses) a combo from running.\n\nSyntax:\ncombo_suspend( <combo_name> );\n\nParameters:\n<combo_name> : The name assigned to a combo.\n\nReturns:\nNone'}],
    ['combo_suspended', { kind: CompletionItemKind.Function, detail: 'Checks if a combo is in the suspended state.', documentation: 'combo_suspended Check to see if a combo is suspended.\n\nSyntax:\ncombo_suspended( <combo_name> );\n\nParameters:\n<combo_name> : Checks the name assigned to a combo if suspended\n\nReturns:\nTrue if the combo is suspended, False if not.' }],
    ['combo_current_step', { kind: CompletionItemKind.Function, detail: 'keywords returning the current step.', documentation: 'combo_current_step  keywords returning the current step\n\nSyntax:\ncombo_current_step ( <combo_name> );\n\nParameters:\n<combo_name> : Checks the name assigned keywords returning the current step\n\nReturns:\nThe current step of the combo.' }],
    ['combo_step_time_left', { kind: CompletionItemKind.Function, detail: 'the time left in the currently executed step.', documentation: 'combo_step_time_left Checks the time left of the currently executed step\n\nSyntax:\ncombo_step_time_left( <combo_name> );\n\nParameters:\n<combo_name> : Checks the time left of the currently executed step\n\nReturns:\nNone' }],
    ['combo_stop_all', { kind: CompletionItemKind.Function, detail: 'Stops all combos.', documentation: 'combo_stop_all Stops all combos from running.\n\nSyntax:\ncombo_stop_all( <combo_name> );\n\nParameters:\n<combo_name> : Stops all combos from running.\n\nReturns:\nNone' }],
    ['combo_suspend_all', { kind: CompletionItemKind.Function, detail: 'suspends all combos.', documentation: 'combo_suspend_all Suspends all combos that is running.\n\nSyntax:\ncombo_suspend_all( <combo_name> );\n\nParameters:\n<combo_name> : Suspends all combos that is running.\n\nReturns:\nNone' }],
    ['combo_resume', { kind: CompletionItemKind.Function, detail: 'Resumes the suspended combo or the already running combo.', documentation: 'combo_resume Will resume a combo if it is suspended or a running combo.\n\nSyntax:\ncombo_resume ( <combo_name> );\n\nParameters:\n<combo_name> : resume a combo if it is suspended or a running combo.\n\nReturns:\nNone'}],
    ['combo_resume_all', { kind: CompletionItemKind.Function, detail: 'resumes all suspended combos.', documentation: 'combo_resume_all Will resume all combos if it is suspended or running combos.\n\nSyntax:\ncombo_resume_all ( <combo_name> );\n\nParameters:\n<combo_name> : resume all combos if it is suspended or a running combos.\n\nReturns:\nNone' }],
    
    ['wait', { kind: CompletionItemKind.Function, detail: 'wait command instructs the Virtual Machine within the Cronus on how long the last set of commands should be executed for.', documentation: 'wait command instructs the Virtual Machine within the Cronus on how long the last set of commands should be executed for. The length of time they instruct the VM to execute the commands is represented in milliseconds and can rand from 1ms to 32767ms (Thats 1 millisecond to just over 32 seconds).  The commands executed during the wait time are those placed between the current wait and the previous wait time, the current wait time and the previous call command, or the start of the combo, whichever comes first.\n\nSyntax:\nwait( <milliseconds> );\n\nParameters:\n<milliseconds> : The length of time the commands should be executed for.\n\nReturns:\nNone'}],
    ['call', { kind: CompletionItemKind.Function, detail: 'call command can only be used in combos and pauses the current combo to execute the combo called. ', documentation:'call command can only be used in combos and pauses the current combo to execute the combo called.   Once the combo has finished, the previous combo is resumed.\n\nSyntax:\ncall( <combo_name> );\n\nParameters:\n<combo_name> : The name assigned to a combo.\n\nReturns:\nNone'}],

    ['set_bit', { kind: CompletionItemKind.Function, detail: 'Sets one bit.', documentation: 'set_bit sets one bit of a variable based on its bit index.\n\nSyntax:\nset_bit( <variable>, <bit_index> )\n\nParameters:\n<variable> : the variable to modify\n<bit_index> : index of the bit to be set with a range of 0 to 15 (16-bit firmware) or 0 to 31 (32-bit firmware).\n\nReturns:\nNone'}],
    ['clear_bit', { kind: CompletionItemKind.Function, detail: 'Clears one bit.', documentation: 'clear_bit clears one bit of a variable based on its bit index.\n\nSyntax:\nclear_bit( <variable> , <bit_index> );\n\nParameters:\n<variable> : the variable to modify\n<bit_index> : index of the bit to be set with a range of 0 to 15 (16-bit firmware) or 0 to 31 (32-bit firmware).\n\nReturns:\nNone'}],
    ['test_bit', { kind: CompletionItemKind.Function, detail: 'Tests a bit.', documentation: 'test_bit tests a bit index point in a value to check if it is set or not.\n\nSyntax:\ntest_bit( <value>, <bit_index> );\n\nParameters:\n<value> : the value to check.\n<bit_index> : index of the bit to be set with a range of 0 - 15 (16-bit firmware) or 0 - 31 (32-bit firmware)\n\nReturns:\nTrue if the bit is set, False if not.'}],
    ['set_bits', { kind: CompletionItemKind.Function, detail: 'Stores a value into a bit index.', documentation: 'set_bits stores a value into a variable based on its bit index and bit mask.\n\nSyntax:\nset_bits( <variable> , <value>, <bit_index>, <bit_mask> );\n\nParameters:\n<variable> : the variable to modify\n<value> : the value to insert into the variable\n<bit_index> : the starting index of the bits to be set with a range of 0 to 15 (16-bit firmware) or 0 to 31 (32-bit firmware).\n<bit_mask> : bit mask to use when inserting the value\n\nReturns:\nNone'}],
    ['get_bits', { kind: CompletionItemKind.Function, detail: 'Gets a value from the bit index.', documentation: 'get_bits extracts a value from another value based on a bit index and bit mask\n\nSyntax:\nget_bits( <value> , <bit_index>, <bit_mask> );\n\nParameters:\n<value> : the value to extract the value from\n<bit_index> : the starting index of the bits to read with a range of 0 to 15 (16-bit firmware) or 0 to 31 (32-bit firmware).\n<bit_mask> : bit mask to use with the final value\n\nReturns:\nThe value shifted into the low bits from the variable used.'}],

    ['abs', { kind: CompletionItemKind.Function, detail: 'Returns an absolute value of a number.', documentation: 'abs command returns the absolute value of an expression. An absolute value is a number without regard for its sign, for example, the absolute value of 8 and -8 is 8. An absolute value can also be thought of as its distance from zero which is always a positive value.\n\nSyntax:\nabs ( <expression> );\n\nParameters:\n<expression> : any expression which has a int value\n\nReturns:\nThe absolute value of the expression (Positive integer).'}],
    ['inv', { kind: CompletionItemKind.Function, detail: 'Returns the inverse value of a number.', documentation: 'inv returns the inverted value of an expression or number. This means a positive value will be turned into a negative value and vice versa, which is the same as multiplying the value by -1.\n\nSyntax:\ninv( <expression> );\n\nParameters:\n<expression> : any expression which has a integer value.\n\nReturns:\nThe inverted value of an expression. (Integer)'}],
    ['pow', { kind: CompletionItemKind.Function, detail: 'Raise a value to the specified power.', documentation: 'This function must be used with caution as there is a risk of an integer overflow when using it. This would occur when the function attempts to return a value greater than 32767 which is the maximum value for a signed 16 bit integer.\n\nSyntax:\npow ( <base_value> , <power_value> );\n\nParameters:\n<base_value> : base number .\n<power_value> : power raised to the base value.\n\nReturns:\nthe base value raised to the power of the exponent.'}],
    ['isqrt', { kind: CompletionItemKind.Function, detail: 'Calculates an integer,s square root.', documentation: 'isqrt returns the square root of a given value. The square root of a value is the value that when multiplied by itself equals the given value. For example, the square root of 25 is 5 (5 * 5 = 25). The return value is an integer which means any fractions will be dropped.\n\nSyntax:\nisqrt ( <expression> );\n\nParameters:\n<expression> : any expression which has a value.\n\nReturns:\nThe square root of the given expression'}],
    ['random', { kind: CompletionItemKind.Function, detail: 'Generates a random value between the specified range.', documentation: 'random generates a random int between two numbers (minimum -32768 and maximum 32767)\n\nSyntax:\nrandom ( <min_value> , <max_value> );\n\nParameters:\n<min_value> : the minimum integer value to start your random number (minimum value -32768)\n<max_value> : the maximum integer value to start your random number (maximum value 32767)\n\nReturns:\na random int value between the <min_value> and the <max_value> parameters.'}],
    ['min', { kind: CompletionItemKind.Function, detail: 'The minimum of two values.', documentation: ''}],
    ['max', { kind: CompletionItemKind.Function, detail: 'The maximum of two values.', documentation: ''}],

    ['pixel_oled', { kind: CompletionItemKind.Function, detail: 'Draws a pixel on the OLED Display.', documentation: 'pixel_oled draws a pixel on the OLED display.\n\nSyntax:\npixel_oled( x, y, c );\n\nParameters:\nx - the x coordinate. (0 - 63)\ny - the y corrdinate. (0 - 127)\nc - the color of the pixel (0 for black, 1 for white).\n\nReturns:\nNone'}],
    ['line_oled', { kind: CompletionItemKind.Function, detail: 'Draws a line on the OLED Display.', documentation: 'line_oled draws a line of pixels\n\nSyntax:\nline_oled( <x> , <y> , <tox> , <toy> , <thickness> , <color> );\n\nParameters:\n<x> : The starting X coordinate\n<y> : The starting Y coordinate\n<tox> : The ending X coordinate\n<toy> : The ending Y coordinate\n<thickness>: The thickness of the line\n<color>: The color flag to set the pixels to 0 means Black and 1 means White\n\nReturns:\nNone'}],
    ['rect_oled', { kind: CompletionItemKind.Function, detail: 'Draws a rectangle on the OLED Display.', documentation: 'rect_oled draws a rectangle on the OLED screen of the Cronus Zen\n\nSyntax:\nrect_oled( <x> , <y>, <width>, <height>, <fill>, <color> );\n\nParameters:\n<x> : The X coordinate of the upper left corner of the rectangle\n<y> : The Y coordinate of the upper left corner of the rectangle\n<width> : The width of the rectangle to draw\n<height> : The height of the rectangle to draw\n<fill> : A flag saying if the rectangle should be filled or just outlined (1 means fill it, 0 means only draw the outline)\n<color> : The color flag to set the pixels to 0 means Black and 1 means White\n\nReturns:\nNone'}],
    ['circle_oled', { kind: CompletionItemKind.Function, detail: 'Draws a circle on the OLED Display.', documentation: 'circle_oled draws a circle on the Cronus Zen OLED screen.\n\nSyntax:\ncircle_oled( <x> , <y>, <radius>, <fill>, <color> );\n\nParameters:\n<x> : The X coordinate of the upper left corner of the rectangle\n<y> : The Y coordinate of the upper left corner of the rectangle\n<width> : The width of the rectangle to draw\n<height> : The height of the rectangle to draw\n<fill> : A flag saying if the rectangle should be filled or just outlined (1 means fill it, 0 means only draw the outline)\n<color> : The color flag to set the pixels to 0 means Black and 1 means White\n\nReturns:\nNone'}],
    ['putc_oled', { kind: CompletionItemKind.Function, detail: 'Puts a character into the string buffer for puts_oled.', documentation: 'putc_oled puts a character into the string buffer for puts_oled\n\nSyntax:\nputc_oled( <position> , <ascii> );\n\nParameters:\n<position> : The 1 based index where to put the character in the buffer\n<ascii> : The ASCII code value to put into the buffer\n\nReturns:\nNone'}],
    ['puts_oled', { kind: CompletionItemKind.Function, detail: 'Draws the characters supplied using putc_oled on the OLED Display.', documentation: 'puts_oled draws the characters supplied using putc_oled on the OLED display\n\nSyntax:\nputs_oled( <x> , <y> , <font> , <length> , <color> );\n\nParameters:\n<x> : The X coordinate of the upper left corner of where the text will be drawn\n<y> : The Y coordinate of the upper left corner of where the text will be drawn\n<font> : The font constant to use when drawing the text see table of supported fonts\n<length>\n<color> : The color flag to set the pixels to 0 means Black and 1 means White\n\nReturns:\nNone'}],
    ['print', { kind: CompletionItemKind.Function, detail: 'Draws a string the the OLED Display.', documentation: 'Syntax:\nprint( <x> , <y> , <font> , <color> , <stringaddr> );\n\nParameters:\n<x> : The X coordinate of the upper left corner of where the text will be drawn\n<y> : The Y coordinate of the upper left corner of where the text will be drawn\n<font> : The font constant to use when drawing the text see table of supported fonts here\n<color> : The color flag to set the pixels to 0 means Black and 1 means White\n<stringaddr> : The offset in the data section where the 0 terminated string is located, usually used with the string constant type\n\nReturns:\nNone'}],
    ['cls_oled', { kind: CompletionItemKind.Function, detail: 'cls_oled sets the entire OLED display to a single color', documentation: 'Syntax:\ncls_oled( <color> );\n\nParameters:\n<color> : The color flag to set the pixels to 0 means Black and 1 means White\n\nReturns:\nNone'}],

    ['get_console', { kind: CompletionItemKind.Function, detail: 'Gets which console is currently connected.', documentation: ''}],
    ['set_val', { kind: CompletionItemKind.Function, detail: 'Sets the output value to send to the console.', documentation: 'set_val overwrites the current value of a controller entry with the value that is specified in its second parameter.\n\nSyntax:\nset_val ( <identifier>, <value> ); \n\nParameters:\n<identifier> : the identifier of a controller entry\n<value> : will be set the identifiers output value. buttons use 0 - 100 (unpressed, pressed). Axis,s use 0 - 100 (Triggers), -100 - 100 (non-resolution axis like XB1_RX)\n\nReturns:\nNone'}],
    ['block_all_inputs', { kind: CompletionItemKind.Function, detail: 'Blocks all output from being sent to the console this cycle of main.', documentation: 'block_all_input Blocks all output from being sent to the console this cycle of main\n\nSyntax:\nblock_all_inputs();\n\nParameters:\nNone\n\nReturns:\nNone'}],

    ['get_info', { kind: CompletionItemKind.Function, detail: '', documentation: 'function that checks the active state of the MK Profile. An MK Profile has up to 6 different states as follows (0 = HIP, 1 = ADS, 2 = AUX1, 3 = AUX2, 4 = AUX3, 5 = AUX4). With this information, you are able to script for any specific state and take action accordingly.\n\nSyntax:\nget_info(PENDING_CONFIG); || get_info(ACTIVE_CONFIG);\n\nParameters:\n<PENDING_CONFIG> Shows usage for the pending config.\n<ACTIVE_CONFIG> Shows the usage for the active config.\n\nReturns:\n0 - HIP\n1 - ADS\n2 - AUX1\n3 - AUX2\n 4 - AUX3\n 5 - AUX4'}],
    ['set_polar2', { kind: CompletionItemKind.Function, detail: 'set_polar2is a virtual stick that you can use to quickly calculate values without the hassle of time-consuming trigonometry functions.', documentation: ''}],
]);


const variableDeclarations = new Map();
const functionDeclarations = new Map();
const comboDeclarations = new Map();

connection.onInitialize(() => {
    return {
        capabilities: {
            textDocumentSync: TextDocumentSyncKind.Incremental,
            completionProvider: {
                resolveProvider: true,
                triggerCharacters: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')  // Trigger on any letter
            },
            hoverProvider: true,
            definitionProvider: true
        }
    };
});

documents.onDidChangeContent((change) => {
    const document = change.document;
    parseVariables(document);
    parseFunctions(document);
    parseCombos(document);
});

function parseVariables(document) {
    const text = document.getText();

    const intPattern = /int\s+(\w+)\s*(?:=\s*([\w\d]+))?;/g;
    const stringPattern = /const\s+string\s+(\w+)\s*\[\]\s*=\s*\{([^\}]+)\};/g;
    const array1DPattern = /const\s+(int8|int16|int32|uint8|uint16|uint32)\s+(\w+)\s*\[\]\s*=\s*\{([^\}]+)\};/g;
    const array2DPattern = /const\s+(int8|int16|int32|uint8|uint16|uint32)\s+(\w+)\s*\[\]\[\]\s*=\s*\{(\s*\{[^}]*\}\s*(?:,\s*\{[^}]*\}\s*)*)\};/g;
    const enumPattern = /enum\s*\{\s*([^\}]+?)\s*\}/g;

    variableDeclarations.clear();

    let match;

    while ((match = intPattern.exec(text)) !== null) {
        const intName = match[1];
        const intValue = match[2] || 'undefined';
    
        variableDeclarations.set(intName, { 
            type: 'int', 
            detail: 'Integer variable', 
            documentation: `int ${intName} = ${intValue};`
        });
    }

    while ((match = stringPattern.exec(text)) !== null) {
        const stringName = match[1];
        const items = match[2].split(',').map(item => item.trim());  // Split items by commas and trim extra spaces
        const documentation = `const string ${stringName}[] = {${items.join(', ')}};`;
    
        variableDeclarations.set(stringName, {
            type: 'const string',
            detail: 'Constant string array',
            documentation: documentation
        });
    }
    
    while ((match = array1DPattern.exec(text)) !== null) {
        const type = match[1];
        const arrayName = match[2];
        const content = match[3].trim();
        
        const values = content.split(',').map(item => item.trim());
        const documentation = `const ${type} ${arrayName}[] = {${values.join(', ')}};`;
        
        variableDeclarations.set(arrayName, {
            type: 'array',
            detail: `1D Array of ${type}`,
            documentation: documentation
        });
    }

    while ((match = array2DPattern.exec(text)) !== null) {
        const type = match[1];
        const arrayName = match[2];
        const content = match[3];
        
        const rows = content.match(/\{[^}]*\}/g) || [];
        
        const formattedRows = rows.map(row => {
            const values = row.slice(1, -1).split(',').map(v => v.trim()).filter(Boolean);
            return `{${values.join(', ')}}`;
        });
        
        const documentation = `const ${type} ${arrayName}[][] = {\n  ${formattedRows.join(',\n  ')}\n};`;
        
        variableDeclarations.set(arrayName, {
            type: 'array',
            detail: `2D Array of ${type}`,
            documentation: documentation
        });
    }

    while ((match = enumPattern.exec(text)) !== null) {
        const enumContent = match[1];
        const variables = enumContent.split(',').map(variable => variable.trim()).filter(variable => variable);
        variables.forEach(variable => {
            variableDeclarations.set(variable, {
                type: 'enum',
                detail: 'enum variable member',
                documentation: `Declaration:\n\nenum\n ${enumContent}\n\nCall with: ${variable}`
            });
        });
    }
}

function parseFunctions(document) {
    const text = document.getText();
    const functionPattern = /function\s+(\w+)\s*\(([^)]*)\)/g;

    functionDeclarations.clear();

    let match;

    while ((match = functionPattern.exec(text)) !== null) {
        const functionName = match[1];
        const params = match[2].split(',').map(param => param.trim()).filter(param => param);

        functionDeclarations.set(functionName, {
            type: 'function',
            detail: 'Delcared Function',
            documentation: `Declaration:\n\nfunction ${functionName} (${params.join(', ')})`,
            parameters: params.map(param => ({
                name: param,
                type: 'parameter',
                detail: 'Function parameter',
                documentation: `Parameter of function ${functionName}`
            }))
        });
    }
}

function parseCombos(document) {
    const text = document.getText();
    const comboPattern = /combo\s+(\w+)\s*\{([\s\S]*?)\}/g;

    comboDeclarations.clear();

    while ((match = comboPattern.exec(text)) !== null) {
        const comboName = match[1];
        comboDeclarations.set(comboName, {
            type: 'combo',
            detail: 'Declared Combo',
            documentation: `Declaration:\n\ncombo ${comboName}`
        });
    }
}

connection.onCompletion((textDocumentPosition) => {
    const document = documents.get(textDocumentPosition.textDocument.uri);
    const position = textDocumentPosition.position;

    const lineText = document.getText({
        start: { line: position.line, character: 0 },
        end: position
    });

    const lastChar = lineText.slice(-1);

    if (!/[a-zA-Z]/.test(lastChar)) {
        return [];
    }

    const completions = [];

    for (const [keyword, info] of Keywords) {
        if (keyword.startsWith(lastChar)) {
            completions.push({
                label: keyword,
                kind: info.kind,
                detail: info.detail,
                documentation: info.documentation
            });
        }
    }

    for (const [constant, info] of Constants) {
        if (constant.startsWith(lastChar)) {
            completions.push({
                label: constant,
                kind: info.kind,
                detail: info.detail,
                documentation: info.documentation
            });
        }
    }

    for (const [type, info] of DataTypes) {
        if (type.startsWith(lastChar)) {
            completions.push({
                label: type,
                kind: info.kind,
                detail: info.detail,
                documentation: info.documentation
            });
        }
    }

    for (const [func, info] of BuiltInFunctions) {
        if (func.startsWith(lastChar)) {
            completions.push({
                label: func,
                kind: info.kind,
                detail: info.detail,
                documentation: info.documentation
            });
        }
    }

    for (const [var_, info] of variableDeclarations) {
        if (var_.startsWith(lastChar)) {
            completions.push({
                label: var_,
                kind: CompletionItemKind.Variable,
                detail: info.detail,
                documentation: info.documentation
            });
        }
    }

    for (const [func_, info] of functionDeclarations) {
        if (func_.startsWith(lastChar)) {
            completions.push({
                label: func_,
                kind: CompletionItemKind.Function,
                detail: info.detail,
                documentation: info.documentation,
            });
        }
    }

    for (const [combo_, info] of comboDeclarations) {
        if (combo_.startsWith(lastChar)) {
            completions.push({
                label: combo_,
                kind: CompletionItemKind.Method,
                detail: info.detail,
                documentation: info.documentation
            });
        }
    }

    return completions;
});

connection.onCompletionResolve((item) => {
    const data = item.data;
    if (data?.type === 'keyword') {
        const keyword = Keywords.get(data.keyword);
        if (keyword) {
            item.detail = keyword.detail;
            item.documentation = {
                kind: MarkupKind.Markdown,
                value: [
                    '```' + data.keyword,
                    keyword.documentation,
                    '```'
                ].join('\n')
            };
        }
    }

    if(data?.type === 'constant') {
        const constant = Constants.get(data.constant);
        if (constant) {
            item.detail = constant.detail;
            item.documentation = {
                kind: MarkupKind.Markdown,
                value: [
                    '```' + data.constant,
                    constant.documentation,
                    '```'
                ].join('\n')
            };
        }
    }

    if(data?.type === 'var_') {
        const var_ = variableDeclarations.get(data.var_);
        if (var_) {
            item.detail = var_.detail;
            item.documentation = {
                kind: MarkupKind.Markdown,
                value: [
                    '```' + data.var_,
                    var_.documentation,
                    '```'
                ].join('\n')
            };
        }
    }

    if(data?.type === 'func') {
        const func = BuiltInFunctions.get(data.func);
        if (func) {
            item.detail = func.detail;
            item.documentation = {
                kind: MarkupKind.Markdown,
                value: [
                    '```' + data.func,
                    func.documentation,
                    '```'
                ].join('\n')
            };
        }
    }

    if(data?.type === 'combo_') {
        const combo_ = comboDeclarations.get(data.combo_);
        if (combo_) {
            item.detail = combo_.detail;
            item.documentation = {
                kind: MarkupKind.Markdown,
                value: [
                    '```' + data.combo_,
                    combo_.documentation,
                    '```'
                ].join('\n')
            };
        }
    }

    if(data?.type === 'type') {
        const type = DataTypes.get(data.type);
        if (type) {
            item.detail = type.detail;
            item.documentation = {
                kind: MarkupKind.Markdown,
                value: [
                    '```' + data.type,
                    type.documentation,
                    '```'
                ].join('\n')
            };
        }
    }

    if(data?.type === 'func_') {
        const func_ = functionDeclarations.get(data.func_);
        if (func_) {
            item.detail = func_.detail;
            item.documentation = {
                kind: MarkupKind.Markdown,
                value: [
                    '```' + data.func_,
                    func_.documentation,
                    '```'
                ].join('\n')
            };
        }
    }

    return item;
});

// Provide hover information for keywords and variables
connection.onHover((params) => {
    const document = documents.get(params.textDocument.uri);
    if (!document) return null;

    const position = params.position;
    const word = getWordAtPosition(document, position);

    if (variableDeclarations.has(word)) {
        const variableInfo = variableDeclarations.get(word);
        return {
            contents: {
                kind: MarkupKind.Markdown,
                value: `**${variableInfo.type}**\n\n${variableInfo.detail}`
            }
        };
    }

    if (functionDeclarations.has(word)) {
        const functionInfo = functionDeclarations.get(word);
        return {
            contents: {
                kind: MarkupKind.Markdown,
                value: `**${functionInfo.type}**\n\n${functionInfo.detail}`
            }
        };
    }

    if (comboDeclarations.has(word)) {
        const comboInfo = comboDeclarations.get(word);
        return {
            contents: {
                kind: MarkupKind.Markdown,
                value: `**${comboInfo.type}**\n\n${comboInfo.detail}`
            }
        };
    }

    const keywordInfo = Keywords.get(word);
    if (keywordInfo) {
        return {
            contents: {
                kind: MarkupKind.Markdown,
                value: [
                    '```' + word,
                    keywordInfo.documentation,
                    '```'
                ].join('\n')
            }
        };
    }

    const biFuncInfo = BuiltInFunctions.get(word);
    if (biFuncInfo) {
        return {
            contents: {
                kind: MarkupKind.Markdown,
                value: [
                    '```' + word,
                    biFuncInfo.documentation,
                    '```'
                ].join('\n')
            }
        };
    }

    const biDataType = DataTypes.get(word);
    if (biDataType) {
        return {
            contents: {
                kind: MarkupKind.Markdown,
                value: [
                    '```' + word,
                    biDataType.documentation,
                    '```'
                ].join('\n')
            }
        }; 
    }

    return null;
});

function getWordAtPosition(document, position) {
    const line = document.getText({
        start: { line: position.line, character: 0 },
        end: { line: position.line + 1, character: 0 }
    });

    const wordPattern = /[a-zA-Z_]\w*/g;
    let match;
    while ((match = wordPattern.exec(line)) !== null) {
        const start = match.index;
        const end = start + match[0].length;
        if (start <= position.character && position.character <= end) {
            return match[0];
        }
    }
    return '';
}

console.log("listening");
documents.listen(connection);
connection.listen();