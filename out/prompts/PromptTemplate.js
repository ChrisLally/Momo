"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeRefactoringPrompt = exports.CodeEditingPrompt = exports.CodeGenerationPrompt = exports.PromptTemplate = void 0;
class PromptTemplate {
}
exports.PromptTemplate = PromptTemplate;
class CodeGenerationPrompt extends PromptTemplate {
    generatePrompt(context) {
        const fileContextString = context.fileContext.map(file => `File: ${file.filePath}\nLanguage: ${file.language}\nContent:\n${file.content}\n`).join('\n');
        return `Generate code based on the following input:
User Input: ${context.userInput}
File Context:
${fileContextString}
Please provide a code implementation that addresses the user's request.`;
    }
}
exports.CodeGenerationPrompt = CodeGenerationPrompt;
class CodeEditingPrompt extends PromptTemplate {
    generatePrompt(context) {
        const fileToEdit = context.fileContext[0]; // Assuming we're editing the first file in the context
        return `Edit the following code based on the user's input:
File: ${fileToEdit.filePath}
Language: ${fileToEdit.language}
Existing Code:
${fileToEdit.content}
User Input: ${context.userInput}
Please provide the updated code with explanations for the changes.`;
    }
}
exports.CodeEditingPrompt = CodeEditingPrompt;
class CodeRefactoringPrompt extends PromptTemplate {
    generatePrompt(context) {
        const fileToRefactor = context.fileContext[0]; // Assuming we're refactoring the first file in the context
        return `Refactor the following code:
File: ${fileToRefactor.filePath}
Language: ${fileToRefactor.language}
Existing Code:
${fileToRefactor.content}
User Input: ${context.userInput}
Please provide the refactored code with explanations for the improvements.`;
    }
}
exports.CodeRefactoringPrompt = CodeRefactoringPrompt;
//# sourceMappingURL=PromptTemplate.js.map