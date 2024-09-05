import { PromptTemplate, PromptContext, FileContext } from './PromptTemplate';
import * as vscode from 'vscode';

export class PromptGenerator {
  constructor(private workspaceRoot: string) {}

  async generatePrompt(template: PromptTemplate, userInput: string, fileContexts: FileContext[]): Promise<string> {
    const context: PromptContext = {
      userInput: await this.parseSymbols(userInput),
      fileContext: fileContexts
    };

    return template.generatePrompt(context);
  }

  private async parseSymbols(input: string): Promise<string> {
    const symbolRegex = /@(file|folder|code):([^\s]+)/g;
    let match;
    let parsedInput = input;

    while ((match = symbolRegex.exec(input)) !== null) {
      const [fullMatch, type, path] = match;
      const content = await this.getContentForSymbol(type, path);
      parsedInput = parsedInput.replace(fullMatch, content);
    }

    return parsedInput;
  }

  private async getContentForSymbol(type: string, path: string): Promise<string> {
    const fullPath = vscode.Uri.file(this.workspaceRoot + '/' + path);

    switch (type) {
      case 'file':
        return await this.getFileContent(fullPath);
      case 'folder':
        return await this.getFolderContent(fullPath);
      case 'code':
        return await this.getCodeSnippet(fullPath);
      default:
        return `[Unknown symbol type: ${type}]`;
    }
  }

  private async getFileContent(uri: vscode.Uri): Promise<string> {
    try {
      const content = await vscode.workspace.fs.readFile(uri);
      return content.toString();
    } catch (error) {
      return `[Error reading file: ${uri.fsPath}]`;
    }
  }

  private async getFolderContent(uri: vscode.Uri): Promise<string> {
    try {
      const files = await vscode.workspace.fs.readDirectory(uri);
      return files.map(([name, type]) => `${name} (${type === vscode.FileType.Directory ? 'Folder' : 'File'})`).join('\n');
    } catch (error) {
      return `[Error reading folder: ${uri.fsPath}]`;
    }
  }

  private async getCodeSnippet(uri: vscode.Uri): Promise<string> {
    // This is a simplified implementation. You might want to add more logic to extract specific code snippets.
    return this.getFileContent(uri);
  }
}