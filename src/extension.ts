/// <reference types="vscode" />

import * as vscode from 'vscode';
import { UserInteractionManager } from './interaction/UserInteractionManager';
import { CodebaseIndexer } from './CodebaseIndexer';

let codebaseIndexer: CodebaseIndexer | undefined;

export function activate(context: vscode.ExtensionContext) {
  console.log('Momo extension is now active!');

  const userInteractionManager = new UserInteractionManager(context);

  const workspaceRoot = vscode.workspace.rootPath;
  if (workspaceRoot) {
    codebaseIndexer = new CodebaseIndexer(workspaceRoot);
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
      } else {
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

export function deactivate() {}