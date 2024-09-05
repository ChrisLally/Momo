import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export class CodebaseIndexer {
  private indexedFiles: Map<string, string> = new Map();
  private fileWatcher: vscode.FileSystemWatcher | undefined;

  constructor(private workspaceRoot: string) {
    this.setupFileWatcher();
  }

  async indexCodebase(): Promise<void> {
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

  private async scanDirectory(dir: string): Promise<void> {
    const files = await fs.promises.readdir(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stats = await fs.promises.stat(filePath);

      if (stats.isDirectory()) {
        if (!this.shouldIgnoreDirectory(filePath)) {
          await this.scanDirectory(filePath);
        }
      } else if (stats.isFile() && !this.shouldIgnoreFile(filePath)) {
        await this.indexFile(filePath);
      }
    }
  }

  private async indexFile(filePath: string): Promise<void> {
    try {
      const content = await fs.promises.readFile(filePath, 'utf-8');
      this.indexedFiles.set(filePath, content);
    } catch (error) {
      console.error(`Error indexing file ${filePath}:`, error);
    }
  }

  private shouldIgnoreFile(filePath: string): boolean {
    // TODO: Implement .momoignore functionality
    const ignoredExtensions = ['.git', '.DS_Store'];
    return ignoredExtensions.some(ext => filePath.endsWith(ext));
  }

  private shouldIgnoreDirectory(dirPath: string): boolean {
    // TODO: Implement .momoignore functionality
    const ignoredDirs = ['node_modules', '.git'];
    return ignoredDirs.some(dir => dirPath.includes(dir));
  }

  private setupFileWatcher(): void {
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

  getIndexedFilesSummary(): string {
    let summary = `Total files indexed: ${this.indexedFiles.size}\n\n`;
    summary += 'Indexed files:\n';
    for (const filePath of this.indexedFiles.keys()) {
      summary += `${filePath}\n`;
    }
    return summary;
  }

  getIndexedContent(filePath: string): string | undefined {
    return this.indexedFiles.get(filePath);
  }

  dispose(): void {
    if (this.fileWatcher) {
      this.fileWatcher.dispose();
    }
  }
}