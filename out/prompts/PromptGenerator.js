"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptGenerator = void 0;
const vscode = require("vscode");
class PromptGenerator {
    constructor(workspaceRoot) {
        this.workspaceRoot = workspaceRoot;
    }
    async generatePrompt(template, userInput, fileContexts) {
        const context = {
            userInput: await this.parseSymbols(userInput),
            fileContext: fileContexts
        };
        return template.generatePrompt(context);
    }
    async parseSymbols(input) {
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
    async getContentForSymbol(type, path) {
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
    async getFileContent(uri) {
        try {
            const content = await vscode.workspace.fs.readFile(uri);
            return content.toString();
        }
        catch (error) {
            return `[Error reading file: ${uri.fsPath}]`;
        }
    }
    async getFolderContent(uri) {
        try {
            const files = await vscode.workspace.fs.readDirectory(uri);
            return files.map(([name, type]) => `${name} (${type === vscode.FileType.Directory ? 'Folder' : 'File'})`).join('\n');
        }
        catch (error) {
            return `[Error reading folder: ${uri.fsPath}]`;
        }
    }
    async getCodeSnippet(uri) {
        // This is a simplified implementation. You might want to add more logic to extract specific code snippets.
        return this.getFileContent(uri);
    }
}
exports.PromptGenerator = PromptGenerator;
//# sourceMappingURL=PromptGenerator.js.map