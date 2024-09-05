import * as vscode from 'vscode';
import { AIResponseHandler } from '../ai/AIResponseHandler';
import { PromptGenerator } from '../prompts/PromptGenerator';
import { CodeGenerationPrompt, CodeEditingPrompt, CodeRefactoringPrompt } from '../prompts/PromptTemplate';

export enum InteractionState {
  InitialPrompt,
  FollowUpQuestions,
  ApplyingChanges
}

export class UserInteractionManager {
  private currentState: InteractionState = InteractionState.InitialPrompt;
  private aiResponseHandler: AIResponseHandler;
  private promptGenerator: PromptGenerator;

  constructor(private context: vscode.ExtensionContext) {
    this.aiResponseHandler = new AIResponseHandler();
    this.promptGenerator = new PromptGenerator(vscode.workspace.rootPath || '');
  }

  async handleUserInput(input: string): Promise<void> {
    switch (this.currentState) {
      case InteractionState.InitialPrompt:
        await this.handleInitialPrompt(input);
        break;
      case InteractionState.FollowUpQuestions:
        await this.handleFollowUpQuestions(input);
        break;
      case InteractionState.ApplyingChanges:
        await this.handleApplyingChanges(input);
        break;
    }
  }

  private async handleInitialPrompt(input: string): Promise<void> {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage('No active text editor');
      return;
    }

    const fileContext = [{
      filePath: editor.document.fileName,
      content: editor.document.getText(),
      language: editor.document.languageId
    }];

    let prompt: string;
    if (input.startsWith('generate')) {
      prompt = await this.promptGenerator.generatePrompt(new CodeGenerationPrompt(), input, fileContext);
    } else if (input.startsWith('edit')) {
      prompt = await this.promptGenerator.generatePrompt(new CodeEditingPrompt(), input, fileContext);
    } else if (input.startsWith('refactor')) {
      prompt = await this.promptGenerator.generatePrompt(new CodeRefactoringPrompt(), input, fileContext);
    } else {
      vscode.window.showErrorMessage('Unknown command. Please start with "generate", "edit", or "refactor".');
      return;
    }

    // TODO: Send prompt to AI service and get response
    const aiResponse = 'AI response placeholder';
    
    const response = this.aiResponseHandler.parseResponse(aiResponse);
    this.aiResponseHandler.presentSuggestions(response.suggestions);

    if (response.followUpQuestions.length > 0) {
      this.transitionState(InteractionState.FollowUpQuestions);
    } else {
      this.transitionState(InteractionState.ApplyingChanges);
    }
  }

  private async handleFollowUpQuestions(input: string): Promise<void> {
    // TODO: Process follow-up questions and update AI response
    console.log("Handling follow-up:", input);
    this.transitionState(InteractionState.ApplyingChanges);
  }

  private async handleApplyingChanges(input: string): Promise<void> {
    if (input.toLowerCase() === 'yes') {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        // TODO: Apply changes to the document
        await editor.edit(editBuilder => {
          // Apply changes here
        });
        vscode.window.showInformationMessage('Changes applied successfully');
      }
    } else {
      vscode.window.showInformationMessage('Changes discarded');
    }
    this.transitionState(InteractionState.InitialPrompt);
  }

  private transitionState(newState: InteractionState): void {
    this.currentState = newState;
  }

  getCurrentState(): InteractionState {
    return this.currentState;
  }
}