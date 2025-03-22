const { CompletionItemKind } = require("vscode-languageserver");

class GPC {
    static Regex = {
        NON_ARRAY:
            /\b(define|int)\b\s+(\w+)\s*(?:=\s*([^;]+)|(\[\s*\d*\s*\]))?/g,
        ARRAY_1D:
            /const\s+\b(int|int8|int16|int32|string|uint8|uint16|uint32)\b\s+(\w+)\s*\[\s*\w*\s*\]\s*=\s*\{\s*((?:[^,\[\]]|\/\*[\s\S]*?\*\/|\/\/[^\n]*|\n|\s)*?)\s*\};/g,
        ARRAY_2D:
            /const\s+\b(int|int8|int16|int32|string|uint8|uint16|uint32)\b\s+(\w+)\s*\[\s*\w*\s*\]\s*\[\s*\w*\s*\]\s*=\s*\{\s*((?:\{(?:[^{}]|\{[^{}]*\}|\/\*[\s\S]*?\*\/|\/\/[^\n]*|\n|\s)*\}\s*,?\s*)+)\s*\};/g,
        ENUM: /enum\s*(?:\/\*[\s\S]*?\*\/|\s*\/\/[^\n]*\n)?\s*\{[\s\S]*?\}/g,
        FUNCTION: /\bfunction\s+(\w+)\s*\(([^)]*)\)\s*\{?/g,
        FUNCTION_CALL: /(\w+)\s*\((.*?)\)/g,
        COMBO: /\bcombo\s+(\w+)\s*\{/g,
        INCLUDE: /@include\s*\"([^"]+)\"/g,
        DECIMAL: /(?<![a-zA-Z0-9_])(?<!")\d+\.\d+(?![a-zA-Z0-9_])(?<!")/g,
        UNKNOWN: /(#|@)+(?!include)/g,
        SINGLE_QUOTE_STRING: /'[^']*'/g,
    };

    static Constants = Object.freeze(
        new Map([
            ["ASCII_SPACE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_EXCLAMATION", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_DOUBLE_QUOTE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_QUOTE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_POUND", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_DOLLAR", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_PERCENT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_AMPERSAND", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_AND", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_SINGLE_QUOTE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_APOSTROPHE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_LEFT_PARENTHESIS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_OPEN_PARENTHESIS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_RIGHT_PARENTHESIS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_CLOSE_PARENTHESIS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_ASTERISK", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_PLUS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_COMMA", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_MINUS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_PERIOD", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_SLASH", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_DIGIT0", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_DIGIT1", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_DIGIT2", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_DIGIT3", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_DIGIT4", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_DIGIT5", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_DIGIT6", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_DIGIT7", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_DIGIT8", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_DIGIT9", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_COLON", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_SEMICOLON", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_LESS_THAN", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_EQUAL", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_GREATER_THAN", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_QUESTION", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_AT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_UPPER_A", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_UPPER_B", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_UPPER_C", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_UPPER_D", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_UPPER_E", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_UPPER_F", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_UPPER_G", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_UPPER_H", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_UPPER_I", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_UPPER_J", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_UPPER_K", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_UPPER_L", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_UPPER_M", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_UPPER_N", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_UPPER_O", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_UPPER_P", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_UPPER_Q", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_UPPER_R", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_UPPER_S", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_UPPER_T", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_UPPER_U", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_UPPER_V", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_UPPER_W", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_UPPER_X", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_UPPER_Y", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_UPPER_Z", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_LEFT_BRACKET", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_LEFT_SQUARE_BRACKET", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_OPEN_SQUARE_BRACKET", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_OPEN_BRACKET", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_BACKSLASH", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_RIGHT_BRACKET", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_RIGHT_SQUARE_BRACKET", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_CLOSE_BRACKET", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_CARAT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_UNDERSCORE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_GRAVE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_BACK_QUOTE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_LOWER_A", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_LOWER_B", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_LOWER_C", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_LOWER_D", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_LOWER_E", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_LOWER_F", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_LOWER_G", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_LOWER_H", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_LOWER_I", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_LOWER_J", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_LOWER_K", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_LOWER_L", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_LOWER_M", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_LOWER_N", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_LOWER_O", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_LOWER_P", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_LOWER_Q", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_LOWER_R", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_LOWER_S", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_LOWER_T", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_LOWER_U", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_LOWER_V", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_LOWER_W", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_LOWER_X", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_LOWER_Y", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_LOWER_Z", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_LEFT_BRACE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_OPEN_BRACE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_LEFT_CURLY_BRACE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_OPEN_CURLY_BRACE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_LEFT_CURLY_BRACKET", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_VERTICAL_BAR", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_BAR", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_PIPE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_RIGHT_BRACE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_CLOSE_BRACE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_RIGHT_CURLY_BRACE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_CLOSE_CURLY_BRACE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_RIGHT_CURLY_BRACKET", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_TILDE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_PS_CROSS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_PS_CIRCLE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_PS_SQUARE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_PS_TRIANGLE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_DPAD_UP", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_DPAD_DOWN", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_DPAD_LEFT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_DPAD_RIGHT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_XB_VIEW", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ASCII_XB_MENU", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["POLAR_RS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["POLAR_LS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["POLAR_GHOST", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["POLAR_RX", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["POLAR_RY", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["POLAR_LX", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["POLAR_LY", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ANALOG_RX", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ANALOG_RY", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ANALOG_LX", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ANALOG_LY", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ANALOG_GHOSTX", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ANALOG_GHOSTY", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["POLAR_RADIUS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["POLAR_ANGLE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["MK_GENERAL", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["MK_ADS_MAP", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["MK_ADS_GAIN_RATIO", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["MK_SENSITIVITY", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["MK_SMOOTHNESS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["MK_ACCELERATION", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["MK_DEPRECATED", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["MK_STICKIZE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["MK_DEADZONE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["MK_DZSHAPE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["MK_WALK_MAP", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["MK_AXIS_X", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["MK_AXIS_Y", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS3_PS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS3_SELECT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS3_START", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS3_R1", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS3_R2", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS3_R3", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS3_L1", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS3_L2", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS3_L3", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS3_RX", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS3_RY", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS3_LX", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS3_LY", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS3_UP", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS3_DOWN", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS3_LEFT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS3_RIGHT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS3_TRIANGLE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS3_CIRCLE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS3_CROSS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS3_SQUARE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS3_ACCX", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS3_ACCY", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS3_ACCZ", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS3_GYRO", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS4_PS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS4_SHARE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS4_OPTIONS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS4_R1", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS4_R2", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS4_R3", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS4_L1", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS4_L2", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS4_L3", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS4_RX", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS4_RY", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS4_LX", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS4_LY", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS4_UP", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS4_DOWN", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS4_LEFT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS4_RIGHT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS4_TRIANGLE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS4_CIRCLE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS4_CROSS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS4_SQUARE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS4_ACCX", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS4_ACCY", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS4_ACCZ", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS4_GYROX", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS4_GYROY", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS4_GYROZ", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS4_TOUCH", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS4_FINGER1X", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS4_FINGER1Y", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS4_FINGER1", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS4_FINGER2X", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS4_FINGER2Y", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS4_FINGER2", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_PS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_SHARE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_OPTIONS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_R1", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_R2", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_R3", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_L1", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_L2", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_L3", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_RX", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_RY", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_LX", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_LY", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_UP", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_DOWN", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_LEFT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_RIGHT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_TRIANGLE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_CIRCLE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_CROSS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_SQUARE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_ACCX", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_ACCY", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_ACCZ", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_GYROX", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_GYROY", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_GYROZ", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_TOUCH", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_FINGER1X", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_FINGER1Y", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_FINGER1", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_FINGER2X", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_FINGER2Y", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_FINGER2", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_MUTE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["WII_HOME", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["WII_MINUS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["WII_PLUS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["WII_RT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["WII_ZR", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["WII_ONE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["WII_C", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["WII_LT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["WII_Z", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["WII_ZL", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["WII_TWO", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["WII_RX", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["WII_RY", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["WII_LX", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["WII_LY", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["WII_NX", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["WII_NY", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["WII_UP", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["WII_DOWN", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["WII_LEFT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["WII_RIGHT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["WII_X", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["WII_B", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["WII_A", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["WII_Y", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["WII_ACCX", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["WII_ACCY", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["WII_ACCZ", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["WII_ACCNX", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["WII_ACCNY", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["WII_ACCNZ", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["WII_IRX", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["WII_IRY", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SWI_HOME", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SWI_MINUS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SWI_PLUS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SWI_R", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SWI_ZR", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SWI_R3", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SWI_L", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SWI_ZL", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SWI_L3", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SWI_RX", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SWI_LX", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SWI_RY", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SWI_LY", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SWI_UP", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SWI_DOWN", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SWI_LEFT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SWI_RIGHT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SWI_X", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SWI_A", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SWI_B", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SWI_Y", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SWI_ACCX", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SWI_ACCY", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SWI_ACCZ", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SWI_GYROX", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SWI_GYROY", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SWI_GYROZ", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SWI_CAPTURE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB1_XBOX", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB1_GUIDE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB1_VIEW", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB1_MENU", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB1_RB", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB1_RT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB1_RS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB1_LB", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB1_LT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB1_LS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB1_RX", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB1_RY", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB1_LX", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB1_LY", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB1_UP", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB1_DOWN", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB1_LEFT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB1_RIGHT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB1_Y", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB1_B", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB1_A", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB1_X", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB1_SHARE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB1_SYNC", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB1_PR1", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB1_PR2", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB1_PL1", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB1_PL2", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB360_XBOX", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB360_BACK", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB360_START", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB360_RB", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB360_RT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB360_RS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB360_LB", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB360_LT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB360_LS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB360_RX", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB360_RY", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB360_LX", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB360_LY", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB360_UP", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB360_DOWN", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB360_LEFT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB360_RIGHT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB360_Y", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB360_B", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB360_A", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["XB360_X", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DF_PS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DF_SELECT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DF_START", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DF_RPADDLE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DF_R2", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DF_R3", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DF_LPADDLE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DF_L2", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DF_L3", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DF_GAS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DF_STEERING", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DF_BRAKE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DF_UP", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DF_DOWN", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DF_LEFT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DF_RIGHT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DF_TRIANGLE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DF_CIRCLE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DF_CROSS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DF_SQUARE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DFGT_PS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DFGT_SELECT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DFGT_START", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DFGT_RPADDLE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DFGT_R2", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DFGT_R3", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DFGT_LPADDLE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DFGT_L2", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DFGT_L3", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DFGT_GAS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DFGT_STEERING", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DFGT_BRAKE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DFGT_UP", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DFGT_DOWN", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DFGT_LEFT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DFGT_RIGHT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DFGT_TRIANGLE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DFGT_CIRCLE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DFGT_CROSS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DFGT_SQUARE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DFGT_UP_ARROW", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DFGT_DOWN_ARROW", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DFGT_DIAL_CCW", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DFGT_DIAL_CW", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DFGT_DIAL", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DFPRO_PS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DFPRO_SELECT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DFPRO_START", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DFPRO_RPADDLE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DFPRO_R2", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DFPRO_R3", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DFPRO_LPADDLE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DFPRO_L2", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DFPRO_L3", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DFPRO_GAS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DFPRO_STEERING", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DFPRO_BRAKE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DFPRO_UP", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DFPRO_DOWN", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DFPRO_LEFT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DFPRO_RIGHT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DFPRO_TRIANGLE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DFPRO_CIRCLE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DFPRO_CROSS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DFPRO_SQUARE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G25_PS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G25_SELECT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G25_START", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G25_RPADDLE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G25_R2", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G25_R3", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G25_LPADDLE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G25_L2", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G25_L3", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G25_GAS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G25_CLUTCH", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G25_STEERING", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G25_BRAKE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G25_UP", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G25_DOWN", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G25_LEFT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G25_RIGHT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G25_TRIANGLE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G25_CIRCLE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G25_CROSS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G25_SQUARE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G25_SHIFT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G27_PS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G27_SELECT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G27_START", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G27_RPADDLE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G27_R2", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G27_R3", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G27_LPADDLE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G27_L2", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G27_L3", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G27_GAS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G27_CLUTCH", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G27_STEERING", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G27_BRAKE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G27_UP", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G27_DOWN", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G27_LEFT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G27_RIGHT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G27_TRIANGLE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G27_CIRCLE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G27_CROSS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G27_SQUARE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G27_SHIFT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G27_L4", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G27_L5", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G27_R4", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G27_R5", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G29_PS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G29_SELECT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G29_START", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G29_RPADDLE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G29_R2", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G29_R3", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G29_LPADDLE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G29_L2", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G29_L3", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G29_GAS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G29_CLUTCH", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G29_STEERING", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G29_BRAKE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G29_UP", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G29_DOWN", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G29_LEFT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G29_RIGHT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G29_TRIANGLE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G29_CIRCLE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G29_CROSS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G29_SQUARE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G29_SHIFT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G29_UP_ARROW", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G29_DOWN_ARROW", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G29_DIAL_CCW", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G29_DIAL_CW", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["G29_DIAL", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_A", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_B", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_C", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_D", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_E", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_F", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_G", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_H", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_I", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_J", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_K", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_L", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_M", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_N", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_O", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_P", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_Q", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_R", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_S", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_T", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_U", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_V", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_W", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_X", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_Y", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_Z", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_1", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_2", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_3", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_4", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_5", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_6", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_7", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_8", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_9", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_0", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_ENTER", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_ESC", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_BACKSPACE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_TAB", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_SPACE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_MINUS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_EQUAL", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_LEFTBRACE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_RIGHTBRACE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_BACKSLASH", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_HASHTILDE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_SEMICOLON", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_APOSTROPHE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_GRAVE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_COMMA", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_DOT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_SLASH", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_CAPSLOCK", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_F1", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_F2", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_F3", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_F4", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_F5", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_F6", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_F7", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_F8", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_F9", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_F10", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_F11", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_F12", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_SYSRQ", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_SCROLLLOCK", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_PAUSE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_INSERT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_HOME", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_PAGEUP", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_DELETE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_END", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_PAGEDOWN", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_RIGHT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_LEFT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_DOWN", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_UP", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_NUMLOCK", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_KPSLASH", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_KPASTERISK", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_KPMINUS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_KPPLUS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_KPENTER", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_KP1", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_KP2", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_KP3", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_KP4", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_KP5", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_KP6", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_KP7", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_KP8", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_KP9", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_KP0", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_NUM1", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_NUM2", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_NUM3", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_NUM4", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_NUM5", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_NUM6", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_NUM7", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_NUM8", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_NUM9", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_NUM0", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_KPDOT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_102ND", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_COMPOSE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_POWER", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_KPEQUAL", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_F13", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_F14", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_F15", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_F16", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_F17", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_F18", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_F19", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_F20", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_F21", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_F22", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_F23", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_F24", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_OPEN", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_HELP", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_PROPS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_FRONT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_STOP", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_AGAIN", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_UNDO", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_CUT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_COPY", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_PASTE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_FIND", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_MUTE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_VOLUMEUP", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_VOLUMEDOWN", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_KPCOMMA", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_RO", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_KATAKANAHIRAGANA", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_YEN", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_HENKAN", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_MUHENKAN", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_KPJPCOMMA", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_HANGEUL", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_HANJA", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_KATAKANA", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_HIRAGANA", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_ZENKAKUHANKAKU", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_KPLEFTPAREN", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_KPRIGHTPAREN", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_LEFTCTRL", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_LEFTSHIFT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_LEFTALT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_LEFTMETA", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_RIGHTCTRL", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_RIGHTSHIFT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_RIGHTALT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_RIGHTMETA", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_MEDIA_PLAYPAUSE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_MEDIA_STOPCD", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_MEDIA_PREVIOUSSONG", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_MEDIA_NEXTSONG", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_MEDIA_EJECTCD", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_MEDIA_VOLUMEUP", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_MEDIA_VOLUMEDOWN", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_MEDIA_MUTE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_MEDIA_WWW", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_MEDIA_BACK", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_MEDIA_FORWARD", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_MEDIA_STOP", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_MEDIA_FIND", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_MEDIA_SCROLLUP", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_MEDIA_SCROLLDOWN", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_MEDIA_EDIT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_MEDIA_SLEEP", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_MEDIA_COFFEE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_MEDIA_REFRESH", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["KEY_MEDIA_CALC", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["MOD_LCTRL", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["MOD_LSHIFT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["MOD_LALT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["MOD_LGUI", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["MOD_RCTRL", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["MOD_RSHIFT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["MOD_RALT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["MOD_RGUI", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["TRACE_1", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["TRACE_2", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["TRACE_3", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["TRACE_4", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["TRACE_5", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["TRACE_6", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["LED_NONE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["LED_1", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["LED_2", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["LED_3", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["LED_4", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["LED_5", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["LED_6", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["LEDMASK_OFF", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["LEDMASK_L1", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["LEDMASK_L2", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["LEDMASK_L3", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["LEDMASK_L4", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["LEDMASK_R1", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["LEDMASK_R2", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["LEDMASK_R3", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["LEDMASK_R4", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["LEDMASKD_L1", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["LEDMASKD_L2", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["LEDMASKD_L3", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["LEDMASKD_L4", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["LEDMASKD_R1", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["LEDMASKD_R2", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["LEDMASKD_R3", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["LEDMASKD_R4", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS4_GREEN", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS4_RED", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS4_BLUE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DS4_GREEN", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DS4_RED", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DS4_BLUE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PLAYER_1", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PLAYER_2", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PLAYER_3", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PLAYER_4", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["RED_1", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["GREEN_1", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["BLUE_1", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["RED_2", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["GREEN_2", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["BLUE_2", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["RGB1", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["RGB2", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["RGB3", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["RGB4", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["RGB5", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["RGB6", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["RGB7", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["RGB8", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["OLED_WHITE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["OLED_BLACK", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["OLED_WIDTH", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["OLED_HEIGHT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["OLED_FONT_SMALL", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["OLED_FONT_MEDIUM", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["OLED_FONT_LARGE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["OLED_FONT_SMALL_WIDTH", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["OLED_FONT_MEDIUM_WIDTH", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["OLED_FONT_LARGE_WIDTH", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["OLED_FONT_SMALL_HEIGHT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["OLED_FONT_MEDIUM_HEIGHT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["OLED_FONT_LARGE_HEIGHT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["OLED_CROSS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["OLED_CIRCLE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["OLED_SQUARE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["OLED_TRIANGLE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["OLED_UP", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["OLED_DOWN", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["OLED_LEFT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["OLED_RIGHT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["OLED_VIEW", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["OLED_MENU", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ALL_REMAPS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["NOT_USE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["MK_UNUSED", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["DZ_CIRCLE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["BITMASK_1", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["BITMASK_2", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["BITMASK_3", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["BITMASK_4", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["BITMASK_5", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["BITMASK_6", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["BITMASK_7", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["BITMASK_8", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["BITMASK_9", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["BITMASK_10", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["BITMASK_11", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["BITMASK_12", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["BITMASK_13", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["BITMASK_14", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["BITMASK_15", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["BITMASK_16", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["BITMASK_17", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["BITMASK_18", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["BITMASK_19", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["BITMASK_20", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["BITMASK_21", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["BITMASK_22", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["BITMASK_23", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["BITMASK_24", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["BITMASK_25", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["BITMASK_26", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["BITMASK_27", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["BITMASK_28", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["BITMASK_29", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["BITMASK_30", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["BITMASK_31", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["BITMASK_32", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PIO_NONE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PIO_AUTO", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PIO_PS3", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PIO_XB360", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PIO_WII", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PIO_PS4", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PIO_XB1", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PIO_SWITCH", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PIO_PS5", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS4T_P1", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS4T_P1X", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS4T_P1Y", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS4T_P2", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS4T_P2X", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS4T_P2Y", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PRODUCTID", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ISSWAPPED", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["CPU_USAGE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PENDING_CONFIG", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["ACTIVE_CONFIG", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["UNSUPPORTED", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["STRIKEPACK_XB1", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["STRIKEPACK_XB1FPS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["STRIKEPACK_XB1ELI", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["STRIKEPACK_PS4FPS", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SWITCH_UP", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["MODPOD", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["CRONUS_ZEN", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_ADT_MODE", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_ADT_START", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_ADT_FORCE1", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_ADT_FORCE2", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_ADT_STRENGTH_LOW", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_ADT_STRENGTH_MID", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_ADT_STRENGTH_HIGH", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_ADT_UNK1", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_ADT_UNK2", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_ADT_FREQ", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_ADT_UNK3", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_ADT_NR", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_ADT_CR", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_ADT_SR", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_ADT_EF1", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_ADT_EF2", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_ADT_OFF", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_ADT_NO_RES1", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_ADT_NO_RES2", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_ADT_HAS_RES1", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_ADT_HAS_RES2", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_HAPTICS_L", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PS5_HAPTICS_R", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PVAR_1", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PVAR_2", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PVAR_3", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PVAR_4", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PVAR_5", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PVAR_6", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PVAR_7", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PVAR_8", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PVAR_9", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PVAR_10", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PVAR_11", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PVAR_12", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PVAR_13", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PVAR_14", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PVAR_15", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["PVAR_16", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_1", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_2", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_3", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_4", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_5", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_6", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_7", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_8", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_9", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_10", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_11", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_12", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_13", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_14", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_15", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_16", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_17", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_18", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_19", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_20", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_21", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_22", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_23", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_24", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_25", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_26", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_27", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_28", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_29", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_30", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_31", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_32", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_33", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_34", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_35", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_36", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_37", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_38", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_39", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_40", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_41", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_42", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_43", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_44", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_45", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_46", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_47", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_48", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_49", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_50", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_51", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_52", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_53", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_54", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_55", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_56", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_57", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_58", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_59", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_60", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_61", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_62", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_63", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["SPVAR_64", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["RUMBLE_A", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["RUMBLE_B", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["RUMBLE_RT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
            ["RUMBLE_LT", {
                kind: CompletionItemKind.Constant,
                detail: "",
                documentation: "",
            }],
        ]),
    );

    static DataTypes = Object.freeze(
        new Map([
            ["int", {
                kind: CompletionItemKind.Keyword,
                detail:
                    "Signed 32-bit integer. \n(-2,147,483,648 to 2,147,483,647)",
                documentation: "",
            }],
            ["int8", {
                kind: CompletionItemKind.Keyword,
                detail: "Signed 8-bit integer. \n(-128 to 127)",
                documentation: "",
            }],
            ["int16", {
                kind: CompletionItemKind.Keyword,
                detail: "Signed 16-bit integer.\n(-32,768 to 32,767)",
                documentation: "",
            }],
            ["int32", {
                kind: CompletionItemKind.Keyword,
                detail:
                    "Signed 32-bit integer.\n(-2,147,483,648 to 2,147,483,647)",
                documentation: "",
            }],
            ["string", {
                kind: CompletionItemKind.Keyword,
                detail: "String of text.",
                documentation: "",
            }],
            ["uint8", {
                kind: CompletionItemKind.Keyword,
                detail: "Unsigned 8-bit integer.\n(0 to 255)",
                documentation: "",
            }],
            ["uint16", {
                kind: CompletionItemKind.Keyword,
                detail: "Unsigned 16-bit integer.\n(0 to 65,535)",
                documentation: "",
            }],
            ["uint32", {
                kind: CompletionItemKind.Keyword,
                detail: "Unsigned 32-bit integer.\n(0 to 4,294,967,295)",
                documentation: "",
            }],
            ["data", {
                kind: CompletionItemKind.Keyword,
                detail: "",
                documentation: "",
            }],
            ["image", {
                kind: CompletionItemKind.Keyword,
                detail: "",
                documentation: "",
            }],
        ]),
    );

    static Keywords = Object.freeze(
        new Map([
            ["if", {
                kind: CompletionItemKind.Keyword,
                detail: "",
                documentation: "",
            }],
            ["while", {
                kind: CompletionItemKind.Keyword,
                detail: "",
                documentation: "",
            }],
            ["function", {
                kind: CompletionItemKind.Keyword,
                detail: "",
                documentation: "",
            }],
            ["else", {
                kind: CompletionItemKind.Keyword,
                detail: "",
                documentation: "",
            }],
            ["switch", {
                kind: CompletionItemKind.Keyword,
                detail: "",
                documentation: "",
            }],
            ["case", {
                kind: CompletionItemKind.Keyword,
                detail: "",
                documentation: "",
            }],
            ["init", {
                kind: CompletionItemKind.Keyword,
                detail: "",
                documentation: "",
            }],
            ["main", {
                kind: CompletionItemKind.Keyword,
                detail: "",
                documentation: "",
            }],
            ["for", {
                kind: CompletionItemKind.Keyword,
                detail: "",
                documentation: "",
            }],
            ["return", {
                kind: CompletionItemKind.Keyword,
                detail: "",
                documentation: "",
            }],
            ["default", {
                kind: CompletionItemKind.Keyword,
                detail: "",
                documentation: "",
            }],
            ["break", {
                kind: CompletionItemKind.Keyword,
                detail: "",
                documentation: "",
            }],
            ["enum", {
                kind: CompletionItemKind.Keyword,
                detail: "",
                documentation: "",
            }],
            ["define", {
                kind: CompletionItemKind.Keyword,
                detail: "",
                documentation: "",
            }],
            ["const", {
                kind: CompletionItemKind.Keyword,
                detail: "",
                documentation: "",
            }],
        ]),
    );

    static BuiltInFunctions = Object.freeze(
        new Map([
            ["duint8", {
                params: 1,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["duint16", {
                params: 1,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["dint32", {
                params: 1,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["dint8", {
                params: 1,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["dint16", {
                params: 1,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["get_val", {
                params: 1,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["get_lval", {
                params: 1,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["get_ptime", {
                params: 1,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["get_controller", {
                params: 0,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["get_battery", {
                params: 0,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["event_press", {
                params: 1,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["event_release", {
                params: 1,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["get_ival", {
                params: 1,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["get_brtime", {
                params: 1,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["swap", {
                params: 2,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["block", {
                params: 2,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["sensitivity", {
                params: 3,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["deadzone", {
                params: 4,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["stickize", {
                params: 3,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["ps4_touchpad", {
                params: 1,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["ps4_set_touchpad", {
                params: 2,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["turn_off", {
                params: 0,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["wii_offscreen", {
                params: 0,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["get_adt", {
                params: 2,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["set_adt", {
                params: 3,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["adt_off", {
                params: 0,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["adt_cmp", {
                params: 2,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["addr", {
                params: 1,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["get_rumble", {
                params: 1,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["set_rumble", {
                params: 2,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["block_rumble", {
                params: 0,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["reset_rumble", {
                params: 0,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["set_led", {
                params: 2,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["get_led", {
                params: 1,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["set_ledx", {
                params: 2,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["get_ledx", {
                params: 0,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["reset_leds", {
                params: 0,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["get_ps4_lbar", {
                params: 1,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["set_ps4_lbar", {
                params: 3,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["get_keyboard", {
                params: 1,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["get_modifiers", {
                params: 1,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["get_rtime", {
                params: 0,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["get_slot", {
                params: 0,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["load_slot", {
                params: 1,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["get_ctrlbutton", {
                params: 0,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["vm_tctrl", {
                params: 1,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["set_polar", {
                params: 3,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["set_rgb", {
                params: 3,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["set_hsb", {
                params: 3,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["clamp", {
                params: 3,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["get_polar", {
                params: 2,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["get_ipolar", {
                params: 2,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["remap", {
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["unmap", {
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["combo_run", {
                params: 1,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["combo_running", {
                params: 1,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["combo_stop", {
                params: 1,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["combo_restart", {
                params: 1,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["combo_suspend", {
                params: 1,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["combo_suspended", {
                params: 1,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["combo_current_step", {
                params: 1,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["combo_step_time_left", {
                params: 1,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["combo_stop_all", {
                params: 0,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["combo_suspend_all", {
                params: 0,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["combo_resume", {
                params: 0,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["combo_resume_all", {
                params: 0,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["wait", {
                params: 1,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["call", {
                params: 1,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["set_bit", {
                params: 2,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["clear_bit", {
                params: 2,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["test_bit", {
                params: 2,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["set_bits", {
                params: 4,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["get_bits", {
                params: 3,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["abs", {
                params: 1,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["inv", {
                params: 1,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["pow", {
                params: 2,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["isqrt", {
                params: 1,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["random", {
                params: 2,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["min", {
                params: 2,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["max", {
                params: 2,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["pixel_oled", {
                params: 3,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["line_oled", {
                params: 6,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["rect_oled", {
                params: 6,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["circle_oled", {
                params: 5,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["putc_oled", {
                params: 2,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["puts_oled", {
                params: 5,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["print", {
                params: 5,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["cls_oled", {
                params: 1,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["get_console", {
                params: 0,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["set_val", {
                params: 2,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["block_all_inputs", {
                params: 0,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["get_info", {
                params: 1,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
            ["set_polar2", {
                params: 3,
                kind: CompletionItemKind.Function,
                detail: "",
                documentation: "",
            }],
        ]),
    );
}

module.exports = { GPC };
