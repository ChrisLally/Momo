"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodebaseIndexer = void 0;
const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
class CodebaseIndexer {
    constructor(workspaceRoot) {
        this.workspaceRoot = workspaceRoot;
        this.indexedFiles = new Map();
        this.setupFileWatcher();
    }
    async indexCodebase() {
        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Indexing codebase",
            cancellable: false
        }, async (progress) => {
            progress.report({ increment: 0 });
            await this.scanDirectory(this.workspaceRoot);
            progress.report({ increment: 100 });
        });
        vscode.window.showInformationMessage(`Codebase indexing completed. ${this.indexedFiles.size} files indexed.`);
    }
    async scanDirectory(dir) {
        const files = await fs.promises.readdir(dir);
        for (const file of files) {
            const filePath = path.join(dir, file);
            const stats = await fs.promises.stat(filePath);
            if (stats.isDirectory()) {
                if (!this.shouldIgnoreDirectory(filePath)) {
                    await this.scanDirectory(filePath);
                }
            }
            else if (stats.isFile() && !this.shouldIgnoreFile(filePath)) {
                await this.indexFile(filePath);
            }
        }
    }
    async indexFile(filePath) {
        try {
            const content = await fs.promises.readFile(filePath, 'utf-8');
            this.indexedFiles.set(filePath, content);
        }
        catch (error) {
            console.error(`Error indexing file ${filePath}:`, error);
        }
    }
    shouldIgnoreFile(filePath) {
        // TODO: Implement .momoignore functionality
        const ignoredExtensions = ['.git', '.DS_Store'];
        return ignoredExtensions.some(ext => filePath.endsWith(ext));
    }
    shouldIgnoreDirectory(dirPath) {
        // TODO: Implement .momoignore functionality
        const ignoredDirs = ['node_modules', '.git'];
        return ignoredDirs.some(dir => dirPath.includes(dir));
    }
    setupFileWatcher() {
        this.fileWatcher = vscode.workspace.createFileSystemWatcher('**/*');
        this.fileWatcher.onDidCreate(async (uri) => {
            await this.indexFile(uri.fsPath);
        });
        this.fileWatcher.onDidChange(async (uri) => {
            await this.indexFile(uri.fsPath);
        });
        this.fileWatcher.onDidDelete((uri) => {
            this.indexedFiles.delete(uri.fsPath);
        });
    }
    getIndexedFilesSummary() {
        let summary = `Total files indexed: ${this.indexedFiles.size}\n\n`;
        summary += 'Indexed files:\n';
        for (const filePath of this.indexedFiles.keys()) {
            summary += `${filePath}\n`;
        }
        return summary;
    }
    getIndexedContent(filePath) {
        return this.indexedFiles.get(filePath);
    }
    dispose() {
        if (this.fileWatcher) {
            this.fileWatcher.dispose();
        }
    }
}
exports.CodebaseIndexer = CodebaseIndexer;
//# sourceMappingURL=CodebaseIndexer.js.map