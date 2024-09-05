import * as vscode from 'vscode';

interface AISuggestion {
  code: string;
  explanation: string;
}

interface AIResponse {
  suggestions: AISuggestion[];
  followUpQuestions: string[];
}

export class AIResponseHandler {
  parseResponse(aiResponse: string): AIResponse {
    // TODO: Implement actual parsing logic based on the AI service response format
    // This is a placeholder implementation
    const suggestions: AISuggestion[] = [
      {
        code: "function greet(name: string): string {\n  return `Hello, ${name}!`;\n}",
        explanation: "This function takes a name as input and returns a greeting string."
      }
    ];
    const followUpQuestions: string[] = [
      "Would you like to add input validation to the function?",
      "Should we implement this as an arrow function instead?"
    ];

    return { suggestions, followUpQuestions };
  }

  async presentSuggestions(suggestions: AISuggestion[]): Promise<void> {
    for (const [index, suggestion] of suggestions.entries()) {
      const document = await vscode.workspace.openTextDocument({
        content: suggestion.code,
        language: 'typescript'
      });
      await vscode.window.showTextDocument(document, vscode.ViewColumn.Beside);
      
      await vscode.window.showInformationMessage(
        `Suggestion ${index + 1}:\n${suggestion.explanation}`,
        'Apply', 'Next', 'Cancel'
      ).then(selection => {
        if (selection === 'Apply') {
          this.applySuggestion(suggestion);
        } else if (selection === 'Cancel') {
          return;
        }
      });
    }
  }

  private async applySuggestion(suggestion: AISuggestion): Promise<void> {
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