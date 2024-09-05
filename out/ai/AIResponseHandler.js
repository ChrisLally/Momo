"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIResponseHandler = void 0;
const vscode = require("vscode");
class AIResponseHandler {
    parseResponse(aiResponse) {
        // TODO: Implement actual parsing logic based on the AI service response format
        // This is a placeholder implementation
        const suggestions = [
            {
                code: "function greet(name: string): string {\n  return `Hello, ${name}!`;\n}",
                explanation: "This function takes a name as input and returns a greeting string."
            }
        ];
        const followUpQuestions = [
            "Would you like to add input validation to the function?",
            "Should we implement this as an arrow function instead?"
        ];
        return { suggestions, followUpQuestions };
    }
    async presentSuggestions(suggestions) {
        for (const [index, suggestion] of suggestions.entries()) {
            const document = await vscode.workspace.openTextDocument({
                content: suggestion.code,
                language: 'typescript'
            });
            await vscode.window.showTextDocument(document, vscode.ViewColumn.Beside);
            await vscode.window.showInformationMessage(`Suggestion ${index + 1}:\n${suggestion.explanation}`, 'Apply', 'Next', 'Cancel').then(selection => {
                if (selection === 'Apply') {
                    this.applySuggestion(suggestion);
                }
                else if (selection === 'Cancel') {
                    return;
                }
            });
        }
    }
    async applySuggestion(suggestion) {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            await editor.edit(editBuilder => {
                const position = editor.selection.active;
                editBuilder.insert(position, suggestion.code);
            });
            vscode.window.showInformationMessage('Suggestion applied successfully');
        }
    }
}
exports.AIResponseHandler = AIResponseHandler;
//# sourceMappingURL=AIResponseHandler.js.map