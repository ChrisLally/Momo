"use strict";
/// <reference types="vscode" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const UserInteractionManager_1 = require("./interaction/UserInteractionManager");
const CodebaseIndexer_1 = require("./CodebaseIndexer");
let codebaseIndexer;
function activate(context) {
    console.log('Momo extension is now active!');
    const userInteractionManager = new UserInteractionManager_1.UserInteractionManager(context);
    const workspaceRoot = vscode.workspace.rootPath;
    if (workspaceRoot) {
        codebaseIndexer = new CodebaseIndexer_1.CodebaseIndexer(workspaceRoot);
        context.subscriptions.push(codebaseIndexer);
        vscode.commands.registerCommand('momo.indexCodebase', async () => {
            await codebaseIndexer?.indexCodebase();
        });
        vscode.commands.registerCommand('momo.showIndexedFiles', () => {
            if (codebaseIndexer) {
                const summary = codebaseIndexer.getIndexedFilesSummary();
                vscode.workspace.openTextDocument({ content: summary }).then(doc => {
                    vscode.window.showTextDocument(doc);
                });
            }
            else {
                vscode.window.showErrorMessage('Codebase has not been indexed yet.');
            }
        });
        // Automatically index the codebase when the extension is activated
        codebaseIndexer.indexCodebase();
    }
    let disposable = vscode.commands.registerCommand('momo-vscode.start', () => {
        vscode.window.showInputBox({ prompt: 'Enter your AI request' }).then(input => {
            if (input) {
                userInteractionManager.handleUserInput(input);
            }
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map