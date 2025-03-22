const { InsertTextFormat, CompletionItemKind, MarkupKind } = require(
    "vscode-languageserver",
);

class Snippets {
    static Snippets = Object.freeze(
        new Map([
            ["for", {
                label: "For~",
                kind: CompletionItemKind.Snippet,
                detail: "For Loop",
                documentation: {
                    kind: MarkupKind.Markdown,
                    value: "Creates a for loop",
                },
                insertText:
                    "for (${1:int i = 0}; ${2:i < length}; ${3:i++}) {\n\t${0}\n}",
                insertTextFormat: InsertTextFormat.Snippet,
            }],
            ["while", {
                label: "While~",
                kind: CompletionItemKind.Snippet,
                detail: "While Loop",
                documentation: {
                    kind: MarkupKind.Markdown,
                    value: "Creates a while loop",
                },
                insertText: "while (${1:condition}) {\n\t${0}\n}",
                insertTextFormat: InsertTextFormat.Snippet,
            }],
            ["if", {
                label: "If~",
                kind: CompletionItemKind.Snippet,
                detail: "If Statement",
                documentation: {
                    kind: MarkupKind.Markdown,
                    value: "Creates an if statement",
                },
                insertText: "if (${1:condition}) {\n\t${0}\n}",
                insertTextFormat: InsertTextFormat.Snippet,
            }],
            ["ifelse", {
                label: "Ifelse~",
                kind: CompletionItemKind.Snippet,
                detail: "If-Else Statement",
                documentation: {
                    kind: MarkupKind.Markdown,
                    value: "Creates an if-else statement",
                },
                insertText:
                    "if (${1:condition}) {\n\t${2}\n} else {\n\t${0}\n}",
                insertTextFormat: InsertTextFormat.Snippet,
            }],
            ["function", {
                label: "Function~",
                kind: CompletionItemKind.Snippet,
                detail: "Function Definition",
                documentation: {
                    kind: MarkupKind.Markdown,
                    value: "Create a Function",
                },
                insertText: "function ${1:name}() {\n\t${2:body}\n}",
                insertTextFormat: InsertTextFormat.Snippet,
            }],
        ]),
    );
}

module.exports = Snippets;
