export interface FileContext {
  filePath: string;
  content: string;
  language: string;
}

export interface PromptContext {
  userInput: string;
  fileContext: FileContext[];
}

export abstract class PromptTemplate {
  abstract generatePrompt(context: PromptContext): string;
}

export class CodeGenerationPrompt extends PromptTemplate {
  generatePrompt(context: PromptContext): string {
    const fileContextString = context.fileContext.map(file => 
      `File: ${file.filePath}\nLanguage: ${file.language}\nContent:\n${file.content}\n`
    ).join('\n');

    return `Generate code based on the following input:
User Input: ${context.userInput}
File Context:
${fileContextString}
Please provide a code implementation that addresses the user's request.`;
  }
}

export class CodeEditingPrompt extends PromptTemplate {
  generatePrompt(context: PromptContext): string {
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

export class CodeRefactoringPrompt extends PromptTemplate {
  generatePrompt(context: PromptContext): string {
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