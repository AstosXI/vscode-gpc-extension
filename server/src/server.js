const {
    createConnection,
    TextDocuments,
    ProposedFeatures,
    CompletionItem,
    CompletionItemKind,
    TextDocumentSyncKind,
    InsertTextFormat,
    MarkupKind,
    DiagnosticSeverity,
} = require("vscode-languageserver/node");

const { TextDocument } = require("vscode-languageserver-textdocument");
const { GPC } = require("./GPC");
const Snippets = require("./Snippets");
const connection = createConnection(ProposedFeatures.all);
const documents = new TextDocuments(TextDocument);

const variableDeclarations = new Map();
const functionDeclarations = new Map();
const comboDeclarations = new Map();

connection.onInitialize(() => {
    return {
        capabilities: {
            textDocumentSync: TextDocumentSyncKind.Incremental,
            completionProvider: {
                resolveProvider: true,
                triggerCharacters:
                    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
                        .split(""),
            },
            hoverProvider: true,
            definitionProvider: true,
            documentSymbolProvider: true,
            renameProvider: true,
            referencesProvider: true,
        },
    };
});

documents.onDidChangeContent((change) => {
    const document = change.document;
    parseVariables(document);
    parseFunctions(document);
    parseCombos(document);
    validateDocument(document);
});

function parseVariables(document) {
    const text = document.getText();

    variableDeclarations.clear();

    let match;

    while ((match = GPC.Regex.NON_ARRAY.exec(text)) !== null) {
        const type = match[1];
        const VarName = match[2];

        const lineStart = text.lastIndexOf("\n", match.index) + 1;
        const lineEnd = text.indexOf("\n", match.index);
        const fullDefinition = text.substring(
            lineStart,
            lineEnd !== -1 ? lineEnd : text.length,
        );

        variableDeclarations.set(VarName, {
            type: type,
            detail: `${type} Variable`,
            documentation: `${match[0]}`,
            fullDefinition: fullDefinition.trim(),
            insertText: `${VarName}`,
            insertTextFormat: InsertTextFormat.PlainText,
        });
    }

    while ((match = GPC.Regex.ARRAY_1D.exec(text)) !== null) {
        const type = match[1];
        const arrayName = match[2].trim();
        const content = match[3] || "";

        const values = content
            .replace(/\/\*[\s\S]*?\*\//g, "")
            .replace(/\/\/[^\n]*/g, "")
            .split(",")
            .map((item) => item.trim());

        variableDeclarations.set(arrayName, {
            type: "array",
            detail: `1D ${type} Array | Size: ${values.length}`,
            documentation: match[0],
            insertText: `${arrayName}` + "[${1:index}]",
            insertTextFormat: InsertTextFormat.Snippet,
        });
    }

    while ((match = GPC.Regex.ARRAY_2D.exec(text)) !== null) {
        const type = match[1];
        const arrayName = match[2];
        const content = match[3];

        const rows = content.match(/\{[^}]*\}/g) || [];
        const cleanRows = rows.map((row) => {
            const values = row
                .slice(1, -1)
                .replace(/\/\*[\s\S]*?\*\//g, "")
                .replace(/\/\/[^\n]*/g, "")
                .split(",")
                .map((v) => v.trim())
                .filter(Boolean);

            return `{${values.join(", ")}}`;
        });

        variableDeclarations.set(arrayName, {
            type: "array",
            detail: `2D ${type} Array | Size: ${cleanRows.length}`,
            documentation: match[0],
            insertText: `${arrayName}` + "[${1:row}][${2:column}]",
            insertTextFormat: InsertTextFormat.Snippet,
        });
    }

    while ((match = GPC.Regex.ENUM.exec(text)) !== null) {
        const enumContent = match[0]
            .slice(match[0].indexOf("{") + 1, match[0].lastIndexOf("}"))
            .replace(/\/\*[\s\S]*?\*\//g, "")
            .replace(/\/\/[^\n]*/g, "");

        const variables = enumContent
            .split(",")
            .map((variable) => variable.trim())
            .map((variable) => variable.split("=")[0].trim())
            .filter((variable) => variable);

        variables.forEach((variable) => {
            variableDeclarations.set(variable, {
                type: "enum",
                detail: "enum variable member",
                documentation: `Declaration:\nenum {\n ${enumContent}\n}`,
                insertText: variable,
                insertTextFormat: InsertTextFormat.PlainText,
            });
        });
    }
}

function parseFunctions(document) {
    const text = document.getText();

    functionDeclarations.clear();

    let match;

    while ((match = GPC.Regex.FUNCTION.exec(text)) !== null) {
        const functionName = match[1];
        const paramsStr = match[2] || "";
        const params = paramsStr.trim().split(/\s*,\s*/).filter((p) =>
            p !== ""
        );

        let openBraces = 0;
        let closeBraces = 0;
        let startIndex = match.index;
        let endIndex = match.index;

        for (let i = match.index; i < text.length; i++) {
            if (text[i] === "{") {
                openBraces++;
            } else if (text[i] === "}") {
                closeBraces++;
                if (openBraces === closeBraces) {
                    endIndex = i + 1;
                    break;
                }
            }
        }

        const fullFunction = text.substring(startIndex, endIndex);

        functionDeclarations.set(functionName, {
            type: "function",
            detail: "Declared Function",
            documentation: `Declaration:\nfunction ${functionName} (${
                params.join(", ")
            })`,
            parameters: params.map((param) => ({
                name: param,
                type: "parameter",
                detail: "Function parameter",
                documentation: `Parameter of function ${functionName}`,
            })),
            fullDefinition: fullFunction.trim(),
        });
    }
}

function parseCombos(document) {
    const text = document.getText();

    comboDeclarations.clear();

    let match;
    while ((match = GPC.Regex.COMBO.exec(text)) !== null) {
        const comboName = match[1];

        let openBraces = 0;
        let closeBraces = 0;
        let startIndex = match.index;
        let endIndex = match.index;

        for (let i = match.index; i < text.length; i++) {
            if (text[i] === "{") {
                openBraces++;
            } else if (text[i] === "}") {
                closeBraces++;
                if (openBraces === closeBraces) {
                    endIndex = i + 1;
                    break;
                }
            }
        }

        const fullCombo = text.substring(startIndex, endIndex);

        comboDeclarations.set(comboName, {
            type: "combo",
            detail: "Declared Combo",
            documentation: `Declaration:\ncombo ${comboName}`,
            fullDefinition: fullCombo.trim(),
        });
    }
}

async function validateDocument(document) {
    const text = document.getText();
    const diagnostics = [];
    const folders = await connection.workspace.getWorkspaceFolders();
    const hasWorkspace = folders && folders.length > 0;

    let decimalMatch;
    while ((decimalMatch = GPC.Regex.DECIMAL.exec(text)) !== null) {
        const startPos = getPositionFromOffset(document, decimalMatch.index);
        const endPos = getPositionFromOffset(
            document,
            decimalMatch.index + decimalMatch[0].length,
        );

        diagnostics.push({
            severity: DiagnosticSeverity.Warning,
            range: {
                start: startPos,
                end: endPos,
            },
            message:
                `Decimal numbers are not allowed in GPC and will be rounded up.`,
            source: "GPC Language Server",
        });
    }

    let includeMatch;
    while ((includeMatch = GPC.Regex.INCLUDE.exec(text)) !== null) {
        const startPos = getPositionFromOffset(document, includeMatch.index);
        const endPos = getPositionFromOffset(
            document,
            includeMatch.index + includeMatch[0].length,
        );

        if (!hasWorkspace) {
            diagnostics.push({
                severity: DiagnosticSeverity.Error,
                range: {
                    start: startPos,
                    end: endPos,
                },
                message:
                    "Include statements must be used in a Toriel based project.",
                source: "GPC Language Server",
                relatedInformation: [
                    {
                        location: {
                            uri: "https://github.com/zkiwiko/vscode-gpc-extension/#Projects",
                            range: {
                                start: { line: 0, character: 0 },
                                end: { line: 0, character: 0 },
                            },
                        },
                        message: "Learn more about Toriel GPC projects",
                    },
                ],
            });
        }
    }

    let singleQuoteMatch;
    while (
        (singleQuoteMatch = GPC.Regex.SINGLE_QUOTE_STRING.exec(text)) !== null
    ) {
        const startPos = getPositionFromOffset(
            document,
            singleQuoteMatch.index,
        );
        const endPos = getPositionFromOffset(
            document,
            singleQuoteMatch.index + singleQuoteMatch[0].length,
        );

        diagnostics.push({
            severity: DiagnosticSeverity.Error,
            range: {
                start: startPos,
                end: endPos,
            },
            message: `Strings must be enclosed in double quotes (").`,
            source: "GPC Language Server",
        });
    }

    let unknownCharMatch;
    while ((unknownCharMatch = GPC.Regex.UNKNOWN.exec(text)) !== null) {
        const startPos = getPositionFromOffset(
            document,
            unknownCharMatch.index,
        );
        const endPos = getPositionFromOffset(
            document,
            unknownCharMatch.index + unknownCharMatch[0].length,
        );
        diagnostics.push({
            severity: DiagnosticSeverity.Warning,
            range: {
                start: startPos,
                end: endPos,
            },
            message:
                "Unknown Character, when compiled it will be seen as whitespace.",
            source: "GPC Language Server",
        });
    }

    connection.sendDiagnostics({ uri: document.uri, diagnostics });
}

function getPositionFromOffset(document, offset) {
    const text = document.getText();
    let line = 0;
    let character = 0;

    for (let i = 0; i < offset; i++) {
        if (text[i] === "\n") {
            line++;
            character = 0;
        } else {
            character++;
        }
    }

    return { line, character };
}

connection.onCompletion((textDocumentPosition) => {
    const document = documents.get(textDocumentPosition.textDocument.uri);
    const position = textDocumentPosition.position;

    const lineText = document.getText({
        start: { line: position.line, character: 0 },
        end: position,
    });

    const completions = [];

    const wordMatch = lineText.match(/@?\w*$/);
    const lastWord = wordMatch ? wordMatch[0].toLowerCase() : "";

    for (const [keyword, info] of GPC.Keywords) {
        if (keyword.toLowerCase().startsWith(lastWord)) {
            completions.push({
                label: keyword,
                kind: info.kind,
                detail: info.detail,
                documentation: {
                    kind: MarkupKind.Markdown,
                    value: `\`\`\`gpc\n${info.documentation}\n\`\`\``,
                },
                data: { type: "keyword", keyword },
            });
        }
    }

    for (const [constant, info] of GPC.Constants) {
        if (constant.toLowerCase().startsWith(lastWord)) {
            completions.push({
                label: constant,
                kind: info.kind,
                detail: info.detail,
                documentation: {
                    kind: MarkupKind.Markdown,
                    value: `\`\`\`gpc\n${info.documentation}\n\`\`\``,
                },
                data: { type: "constant", constant },
            });
        }
    }

    for (const [type, info] of GPC.DataTypes) {
        if (type.toLowerCase().startsWith(lastWord)) {
            completions.push({
                label: type,
                kind: info.kind,
                detail: info.detail,
                documentation: {
                    kind: MarkupKind.Markdown,
                    value: `\`\`\`gpc\n${info.documentation}\n\`\`\``,
                },
                data: { type: "type", type },
            });
        }
    }

    for (const [funcName, info] of GPC.BuiltInFunctions) {
        if (funcName.toLowerCase().startsWith(lastWord)) {
            completions.push({
                label: funcName,
                kind: info.kind,
                detail: info.detail,
                documentation: {
                    kind: MarkupKind.Markdown,
                    value: `\`\`\`gpc\n${info.documentation}\n\`\`\``,
                },
                insertText: `${funcName}($0)`,
                insertTextFormat: InsertTextFormat.Snippet,
                data: { type: "builtinFunc", funcName },
            });
        }
    }

    for (const [varName, info] of variableDeclarations) {
        if (varName.toLowerCase().startsWith(lastWord)) {
            completions.push({
                label: varName,
                kind: CompletionItemKind.Variable,
                detail: info.detail,
                documentation: {
                    kind: MarkupKind.Markdown,
                    value: `\`\`\`gpc\n${info.documentation}\n\`\`\``,
                },
                data: { type: "variable", varName },
                insertText: info.insertText,
                insertTextFormat: info.insertTextFormat,
            });
        }
    }

    for (const [funcName, info] of functionDeclarations) {
        if (funcName.toLowerCase().startsWith(lastWord)) {
            completions.push({
                label: funcName,
                kind: CompletionItemKind.Function,
                detail: info.detail,
                documentation: {
                    kind: MarkupKind.Markdown,
                    value: `\`\`\`gpc\n${info.documentation}\n\`\`\``,
                },
                insertText: `${funcName}($0)`,
                insertTextFormat: InsertTextFormat.Snippet,
                data: { type: "function", funcName },
            });
        }
    }

    for (const [comboName, info] of comboDeclarations) {
        if (comboName.toLowerCase().startsWith(lastWord)) {
            completions.push({
                label: comboName,
                kind: CompletionItemKind.Method,
                detail: info.detail,
                documentation: {
                    kind: MarkupKind.Markdown,
                    value: `\`\`\`gpc\n${info.documentation}\n\`\`\``,
                },
                data: { type: "combo", comboName },
            });
        }
    }

    for (const [snippetName, snippet] of Snippets.Snippets) {
        if (snippetName.toLowerCase().startsWith(lastWord)) {
            completions.push({
                label: snippet.label,
                kind: snippet.kind,
                detail: snippet.detail,
                documentation: snippet.documentation,
                insertText: snippet.insertText,
                insertTextFormat: snippet.insertTextFormat,
            });
        }
    }

    return completions;
});

connection.onCompletionResolve((item) => {
    const data = item.data;
    if (data?.type === "keyword") {
        const keyword = GPC.Keywords.get(data.keyword);
        if (keyword) {
            item.detail = keyword.detail;
            item.documentation = {
                kind: MarkupKind.Markdown,
                value: `\`\`\`gpc\n${keyword.documentation}\n\`\`\``,
            };
        }
    }

    if (data?.type === "constant") {
        const constant = GPC.Constants.get(data.constant);
        if (constant) {
            item.detail = constant.detail;
            item.documentation = {
                kind: MarkupKind.Markdown,
                value: `\`\`\`gpc\n${constant.documentation}\n\`\`\``,
            };
        }
    }

    if (data?.type === "variable") {
        const variable = variableDeclarations.get(data.varName);
        if (variable) {
            item.detail = variable.detail;
            item.documentation = {
                kind: MarkupKind.Markdown,
                value: `\`\`\`gpc\n${variable.documentation}\n\`\`\``,
            };
        }
    }

    if (data?.type === "builtinFunc") {
        const builtinFunc = GPC.BuiltInFunctions.get(data.funcName);
        if (builtinFunc) {
            item.detail = builtinFunc.detail;
            item.documentation = {
                kind: MarkupKind.Markdown,
                value: `\`\`\`gpc\n${builtinFunc.documentation}\n\`\`\``,
            };
        }
    }

    if (data?.type === "combo") {
        const combo = comboDeclarations.get(data.comboName);
        if (combo) {
            item.detail = combo.detail;
            item.documentation = {
                kind: MarkupKind.Markdown,
                value: `\`\`\`gpc\n${combo.documentation}\n\`\`\``,
            };
        }
    }

    if (data?.type === "type") {
        const type = GPC.DataTypes.get(data.type);
        if (type) {
            item.detail = type.detail;
            item.documentation = {
                kind: MarkupKind.Markdown,
                value: `\`\`\`gpc\n${type.documentation}\n\`\`\``,
            };
        }
    }

    if (data?.type === "function") {
        const func = functionDeclarations.get(data.funcName);
        if (func) {
            const params = func.parameters?.map((p) => p.name).join(", ") || "";
            item.detail = func.detail;
            item.documentation = {
                kind: MarkupKind.Markdown,
                value: `\`\`\`gpc\n${func.documentation}\n\`\`\``,
            };
        }
    }

    return item;
});

connection.onHover((params) => {
    const document = documents.get(params.textDocument.uri);
    if (!document) return null;

    const position = params.position;
    const word = getWordAtPosition(document, position);

    const hoverInfo = getHoverInfo(word);
    if (hoverInfo) {
        return {
            contents: {
                kind: MarkupKind.Markdown,
                value: `\n\n${hoverInfo.detail}`,
            },
        };
    }

    return null;
});

function getHoverInfo(word) {
    if (variableDeclarations.has(word)) {
        const variableInfo = variableDeclarations.get(word);
        return {
            type: variableInfo.detail,
            detail: `\`\`\`gpc\n${variableInfo.documentation}\n\`\`\``,
        };
    }

    if (functionDeclarations.has(word)) {
        const functionInfo = functionDeclarations.get(word);
        const params = functionInfo.parameters?.map((p) => p.name).join(", ") ||
            "";
        return {
            type: `${functionInfo.detail}: ${word}(${params})`,
            detail: `\`\`\`gpc\n${functionInfo.documentation}\n\`\`\``,
        };
    }

    if (comboDeclarations.has(word)) {
        const comboInfo = comboDeclarations.get(word);
        return {
            type: comboInfo.detail,
            detail: `\`\`\`gpc\n${comboInfo.documentation}\n\`\`\``,
        };
    }

    const keywordInfo = GPC.Keywords.get(word);
    if (keywordInfo) {
        return {
            type: keywordInfo.detail,
            detail: `\`\`\`gpc\n${keywordInfo.documentation}\n\`\`\``,
        };
    }

    const biFuncInfo = GPC.BuiltInFunctions.get(word);
    if (biFuncInfo) {
        return {
            type: biFuncInfo.detail,
            detail: `\`\`\`gpc\n${biFuncInfo.documentation}\n\`\`\``,
        };
    }

    const biDataType = GPC.DataTypes.get(word);
    if (biDataType) {
        return {
            type: biDataType.detail,
            detail: `\`\`\`gpc\n${biDataType.documentation}\n\`\`\``,
        };
    }

    return null;
}

function getWordAtPosition(document, position) {
    const line = document.getText({
        start: { line: position.line, character: 0 },
        end: { line: position.line + 1, character: 0 },
    });

    const wordPattern = /[a-zA-Z_]\w*/g;
    let match;
    while ((match = wordPattern.exec(line)) !== null) {
        const start = match.index;
        const end = start + match[0].length;
        if (start <= position.character && position.character <= end) {
            const exactWord = line.substring(start, end);
            for (const [key] of variableDeclarations) {
                if (key.toLowerCase() === exactWord.toLowerCase()) {
                    return key;
                }
            }
            return exactWord;
        }
    }
    return "";
}

connection.onDocumentSymbol((params) => {
    const document = documents.get(params.textDocument.uri);
    if (!document) return [];

    const symbols = [];

    for (const [varName, info] of variableDeclarations) {
        symbols.push({
            name: varName,
            kind: CompletionItemKind.Variable,
            location: {
                uri: params.textDocument.uri,
                range: {
                    start: getPositionFromOffset(
                        document,
                        document.getText().indexOf(varName),
                    ),
                    end: getPositionFromOffset(
                        document,
                        document.getText().indexOf(varName) + varName.length,
                    ),
                },
            },
            detail: info.detail,
        });
    }

    for (const [funcName, info] of functionDeclarations) {
        symbols.push({
            name: funcName,
            kind: CompletionItemKind.Function,
            location: {
                uri: params.textDocument.uri,
                range: {
                    start: getPositionFromOffset(
                        document,
                        document.getText().indexOf(funcName),
                    ),
                    end: getPositionFromOffset(
                        document,
                        document.getText().indexOf(funcName) + funcName.length,
                    ),
                },
            },
            detail: info.detail,
        });
    }

    for (const [comboName, info] of comboDeclarations) {
        symbols.push({
            name: comboName,
            kind: CompletionItemKind.Method,
            location: {
                uri: params.textDocument.uri,
                range: {
                    start: getPositionFromOffset(
                        document,
                        document.getText().indexOf(comboName),
                    ),
                    end: getPositionFromOffset(
                        document,
                        document.getText().indexOf(comboName) +
                            comboName.length,
                    ),
                },
            },
            detail: info.detail,
        });
    }

    return symbols;
});

connection.onRenameRequest((params) => {
    const document = documents.get(params.textDocument.uri);
    if (!document) return null;

    const position = params.position;
    const word = getWordAtPosition(document, position);
    const newName = params.newName;

    const text = document.getText();
    const edits = [];
    let match;
    const regex = new RegExp(`\\b${word}\\b`, "g");

    while ((match = regex.exec(text)) !== null) {
        edits.push({
            range: {
                start: getPositionFromOffset(document, match.index),
                end: getPositionFromOffset(document, match.index + word.length),
            },
            newText: newName,
        });
    }

    return {
        changes: {
            [params.textDocument.uri]: edits,
        },
    };
});

connection.onReferences((params) => {
    const document = documents.get(params.textDocument.uri);
    if (!document) return [];

    const position = params.position;
    const word = getWordAtPosition(document, position);

    const references = [];
    const text = document.getText();
    let match;
    const regex = new RegExp(`\\b${word}\\b`, "g");

    while ((match = regex.exec(text)) !== null) {
        references.push({
            uri: params.textDocument.uri,
            range: {
                start: getPositionFromOffset(document, match.index),
                end: getPositionFromOffset(document, match.index + word.length),
            },
        });
    }

    return references;
});

connection.onDefinition((params) => {
    const document = documents.get(params.textDocument.uri);
    if (!document) return null;

    const position = params.position;
    const word = getWordAtPosition(document, position);

    if (variableDeclarations.has(word)) {
        const variableInfo = variableDeclarations.get(word);
        const offset = document.getText().indexOf(word);
        return {
            uri: params.textDocument.uri,
            range: {
                start: getPositionFromOffset(document, offset),
                end: getPositionFromOffset(document, offset + word.length),
            },
        };
    }

    if (functionDeclarations.has(word)) {
        const functionInfo = functionDeclarations.get(word);
        const offset = document.getText().indexOf(word);
        return {
            uri: params.textDocument.uri,
            range: {
                start: getPositionFromOffset(document, offset),
                end: getPositionFromOffset(document, offset + word.length),
            },
        };
    }

    if (comboDeclarations.has(word)) {
        const comboInfo = comboDeclarations.get(word);
        const offset = document.getText().indexOf(word);
        return {
            uri: params.textDocument.uri,
            range: {
                start: getPositionFromOffset(document, offset),
                end: getPositionFromOffset(document, offset + word.length),
            },
        };
    }

    return null;
});

console.log("listening");
documents.listen(connection);
connection.listen();
