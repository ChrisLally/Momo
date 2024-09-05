"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInteractionManager = exports.InteractionState = void 0;
const vscode = require("vscode");
const AIResponseHandler_1 = require("../ai/AIResponseHandler");
const PromptGenerator_1 = require("../prompts/PromptGenerator");
const PromptTemplate_1 = require("../prompts/PromptTemplate");
var InteractionState;
(function (InteractionState) {
    InteractionState[InteractionState["InitialPrompt"] = 0] = "InitialPrompt";
    InteractionState[InteractionState["FollowUpQuestions"] = 1] = "FollowUpQuestions";
    InteractionState[InteractionState["ApplyingChanges"] = 2] = "ApplyingChanges";
})(InteractionState = exports.InteractionState || (exports.InteractionState = {}));
class UserInteractionManager {
    constructor(context) {
        this.context = context;
        this.currentState = InteractionState.InitialPrompt;
        this.aiResponseHandler = new AIResponseHandler_1.AIResponseHandler();
        this.promptGenerator = new PromptGenerator_1.PromptGenerator(vscode.workspace.rootPath || '');
    }
    async handleUserInput(input) {
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
    async handleInitialPrompt(input) {
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
        let prompt;
        if (input.startsWith('generate')) {
            prompt = await this.promptGenerator.generatePrompt(new PromptTemplate_1.CodeGenerationPrompt(), input, fileContext);
        }
        else if (input.startsWith('edit')) {
            prompt = await this.promptGenerator.generatePrompt(new PromptTemplate_1.CodeEditingPrompt(), input, fileContext);
        }
        else if (input.startsWith('refactor')) {
            prompt = await this.promptGenerator.generatePrompt(new PromptTemplate_1.CodeRefactoringPrompt(), input, fileContext);
        }
        else {
            vscode.window.showErrorMessage('Unknown command. Please start with "generate", "edit", or "refactor".');
            return;
        }
        // TODO: Send prompt to AI service and get response
        const aiResponse = 'AI response placeholder';
        const response = this.aiResponseHandler.parseResponse(aiResponse);
        this.aiResponseHandler.presentSuggestions(response.suggestions);
        if (response.followUpQuestions.length > 0) {
            this.transitionState(InteractionState.FollowUpQuestions);
        }
        else {
            this.transitionState(InteractionState.ApplyingChanges);
        }
    }
    async handleFollowUpQuestions(input) {
        // TODO: Process follow-up questions and update AI response
        console.log("Handling follow-up:", input);
        this.transitionState(InteractionState.ApplyingChanges);
    }
    async handleApplyingChanges(input) {
        if (input.toLowerCase() === 'yes') {
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                // TODO: Apply changes to the document
                await editor.edit(editBuilder => {
                    // Apply changes here
                });
                vscode.window.showInformationMessage('Changes applied successfully');
            }
        }
        else {
            vscode.window.showInformationMessage('Changes discarded');
        }
        this.transitionState(InteractionState.InitialPrompt);
    }
    transitionState(newState) {
        this.currentState = newState;
    }
    getCurrentState() {
        return this.currentState;
    }
}
exports.UserInteractionManager = UserInteractionManager;
//# sourceMappingURL=UserInteractionManager.js.map