Momo - VS Code Extension
Project Goal:
Develop a VS Code extension named "Momo" that incorporates AI (starting with Google's Gemini AI) to assist in multi-file code generation and editing. The extension should streamline development by managing multiple files at once, offering clear context selection, and providing intuitive tracking for edits across files.

Main Functionality:

AI-assisted code generation and editing: Utilize Gemini AI to generate, edit, and refactor code based on user input through prompts.
Multi-file editing support: Seamlessly handle multiple files, allowing users to select or remove files for context and AI assistance.
Context-aware code generation: Ensure the AI uses selected files for context, improving code suggestions across files and projects.
Progress tracking:
Real-time updates for individual files and multi-file operations.
Visual status for ongoing edits and AI actions, ensuring users have a clear understanding of which files are in progress.

Smart Context Selection:
Implement an "@" symbol system for quick reference to specific code elements:
@Files: Reference entire files in AI input boxes and command palette.
@Folders: Reference entire folders, especially useful for providing extensive context in chat interfaces.
@Code: Quick search and reference for specific code snippets.

Codebase Indexing:
Develop a system to index the entire codebase for more accurate and context-aware AI responses.
Compute embeddings for each file to improve the relevance of AI suggestions.
Provide a status indicator for indexing progress in the extension settings.
Allow users to configure automatic indexing for new repositories.

Ignore Functionality:
Implement a .momoignore file system, similar to .gitignore, allowing users to exclude specific files or folders from AI analysis.
Respect existing .gitignore files by default.
Provide clear documentation on how to use .momoignore for optimal results.

Rules for AI:
Allow users to set custom instructions for the AI through a "Rules for AI" section in the extension settings.
Implement support for a .momorules file in the project root for project-specific AI instructions.
Apply these custom rules to features like the chat interface and command palette.

User Interface Components:

Sidebar with Chat Interface:
A conversational chat panel allows users to interact with the AI, input prompts, and receive code suggestions.
Users can submit high-level instructions to initiate code generation for one or more files.
File Context Management:
Intuitive UI enables users to easily select, add, or deselect files for contextual editing.
Allows users to modify the list of files included in AI-assisted actions, increasing control over the development process.
Progress Indicators:
Visual indicators in the sidebar for tracking real-time status updates on each file being edited or generated.
Provide transparent feedback during multi-file editing or generation, showing file loading, processing, and completion.
Theme Adaptation:
The UI integrates smoothly with existing VS Code themes, automatically adapting to light or dark mode.
Diff View:
A dedicated UI section to show code changes and diffs before applying modifications.
Enables users to review AI-generated changes per file, making it easier to accept or reject specific edits.

File Structure:

src/
|-- extension.ts          # Entry point for the extension
|-- composer.ts           # Core logic for AI code generation and editing
|-- aiService.ts          # Handles communication with Gemini AI API
|-- sidebarProvider.ts    # Manages the sidebar UI
|-- diffViewProvider.ts   # Provides the UI for diffs and change tracking
|-- contextManager.ts     # Manages @ symbol references and context selection
|-- codebaseIndexer.ts    # Handles codebase indexing and embedding computation
|-- ignoreHandler.ts      # Processes .momoignore and .gitignore files
|-- rulesManager.ts       # Manages custom AI rules from settings and .momorules
webview/
|-- sidebar.html          # HTML for the sidebar webview
|-- sidebar.css           # Styles for the sidebar
|-- sidebar.js            # Client-side JavaScript for the sidebar
docs/
|-- context/
|   |-- @-symbols/
|   |   |-- @-files.mdx   # Documentation for @Files functionality
|   |   |-- @-folders.mdx # Documentation for @Folders functionality
|   |-- rules-for-ai.mdx  # Documentation for Rules for AI feature
|   |-- codebase-indexing.mdx # Documentation for codebase indexing
|   |-- ignore-files.mdx  # Documentation for .momoignore functionality
package.json
tsconfig.json
webpack.config.js
README.md

Configuration and Setup:

API Key:
Gemini AI API key is required and can be configured through the extension settings.

VS Code Compatibility:
Ensure compatibility with modern VS Code versions by setting engines.vscode to ^1.91.0 in package.json.

Error Handling and Notifications:

Error Handling:
Comprehensive error handling for interactions with the AI service, file context management, and file edits.

Progress Updates:
Ensure real-time progress updates for individual files and multi-file operations. These updates should be visible within the sidebar interface.

Notifications:
Notify users when key actions occur, such as the completion of file edits or errors during multi-file processing.

Project Setup:

TypeScript: Use TypeScript for type-safe development.
Webpack: Use Webpack for bundling and managing dependencies.
Best Practices: Follow best practices for VS Code extension development to ensure high performance, a smooth user experience, and compliance with Marketplace guidelines.

License:
The project is licensed under the MIT License.

Author:
Christopher Lally
GitHub: ChrisLally


----

Here is a detailed explanation of how a developer would use Momo Composer specifically for interacting with code suggestions and changes:

Opening the Extension:
Developers Momo Composer directly within their IDE (like VS Code or Momo's native environment). Composer integrates into the workspace.
Initial Code Loading:
Composer scans the current codebase to analyze the structure, syntax, and logic. This helps it make contextual suggestions.
Side-by-Side Comparison:
If Composer suggests significant changes, the developer can view a side-by-side comparison of the original code and the AI-generated version in a diff view.
Apply or Reject Buttons:
Composer displays "Apply All" and "Reject All" buttons at the top of the interface for batch-accepting or rejecting all AI suggestions at once. This is useful after reviewing multiple changes.
Partial Code Acceptance:
Developers can accept or reject specific blocks of code within the file. This is done by hovering over individual changes and selecting Accept or Reject for that specific portion.
Contextual Suggestions:
Composer provides context-aware suggestions. If the developer highlights a function or a piece of code, Composer suggests improvements or optimizations based on best practices.
Refinement of Suggestions:
After the initial suggestion, developers can refine the AI's recommendation by providing additional prompts in the chat window, such as "Optimize for performance."
Reviewing Diffs:
The diff panel allows developers to see detailed changes Composer wants to make. This panel is visible alongside the editor.
Multi-File Support:
Composer can provide suggestions across multiple files. Developers can switch between files and see suggestions relevant to each.
Live Updates:
As the developer makes changes to the code, Composer continuously updates its suggestions in real-time, ensuring they are relevant to the latest context.
Revert Button:
If the developer applies a suggestion but later changes their mind, they can click the Revert button to undo the Composer changes.
Comment Annotations:
Composer may annotate its suggestions with comments explaining why a particular change is recommended. This helps developers understand the reasoning behind the change.
Code Generation:
In cases where developers need new code from scratch (e.g., a new function or module), Composer can generate entire code blocks based on prompts provided in a chat interface.
Context-Specific Queries:
Developers can ask Composer context-specific queries, such as "What does this function do?" or "How can this be optimized?", and receive code suggestions based on the query.
Version Control:
Composer integrates with version control systems (like Git). Developers can review changes Composer made before committing them to the repository.
AI Annotations in Git:
Composer provides a feature where it annotates git diffs or pull requests with its AI analysis, pointing out potential issues in the code before merging.
Interactive Chat:
Developers interact with Composer via an integrated chat window where they can request more information or ask Composer to modify its suggestions.
Customizable Settings:
Developers can customize Composer's behavior (e.g., how aggressive the suggestions should be) through the settings menu, adjusting preferences for automatic or manual application.
Feedback Loop:
If a developer rejects a suggestion, they can provide feedback in the Composer interface, helping improve future recommendations.
Linting Support:
Composer can run linting checks after applying its changes, ensuring that the suggestions adhere to coding standards and best practices.
Code Review Mode:
In code review mode, Composer scans the codebase for issues (e.g., performance bottlenecks or deprecated functions) and suggests changes across the entire project.
Syntax and Error Highlighting:
Composer highlights potential syntax errors or bugs as part of its suggestions, helping the developer avoid introducing errors when applying changes.
Batch Processing:
Developers working on large codebases can batch-process Composer's suggestions across multiple files at once, streamlining code reviews.
History View:
Composer maintains a history log of all applied and rejected suggestions. Developers can review these changes in a dedicated history pane.

--

AI Model Integration:
While using Google's Gemini AI is a great choice, it's important to specify how it will be integrated within the VS Code extension. This includes the following details:

API Integration: Define the specific API endpoints or Gemini AI SDKs you plan to use for interacting with the AI.
Handling API Keys: The API key will be securely stored using the VS Code settings API. This ensures that sensitive data like the API key is encrypted and saved locally.
Error Handling: Implement fallback mechanisms in case of API failures, such as retries or user notifications, ensuring a smooth user experience.
For now, we will utilize Gemini AI's core features and securely manage the API key through the extension's settings.

User Interface Implementation:
Your current overview of the UI components is promising, but let's clarify how these will be built:

Sidebar Integration: We will use the VS Code Webview API to create a custom sidebar panel that seamlessly integrates into VS Code's existing UI structure. This panel will serve as the primary interface for users to interact with the AI, track progress, and manage files.
UI Customization: The sidebar will dynamically update based on the context (e.g., selected files, AI processing status) and will adapt to VS Code's themes for a consistent look and feel in both light and dark modes.
File Handling and VS Code Integration:
It's crucial to specify how the extension interacts with VS Code's workspace and file system. Here's how we'll approach it:

File System API: By leveraging the VS Code Workspace and FileSystem APIs, the extension can read and write files, allowing multi-file support. Users will be able to easily select or remove files for context, and we'll track edits made by the AI across all open files.
Context Awareness: We will utilize VS Code's TextDocument and Workspace APIs to access open editor instances and keep track of changes, ensuring that the AI remains aware of the context for each file.
Extension Settings Configuration:
We will allow users to configure various settings that influence how the extension operates:

Settings Management: All settings, including API keys, preferred AI behavior (e.g., code style, verbosity), and selected programming languages, will be managed via VS Code's Settings API. These settings will be stored persistently but can be updated or cleared by the user at any time.
Settings Customization: Users can adjust how the AI interacts with their code, such as enabling or disabling specific suggestions (e.g., linting, optimization) through a user-friendly settings UI.
Performance Optimization for Large Codebases:
Handling large projects requires careful consideration:

Efficient Indexing: We will leverage VS Code's built-in APIs for workspace indexing to efficiently scan and provide context to the AI. This will ensure that suggestions remain relevant even in large codebases with thousands of lines of code.
Optimized Context Management: To reduce memory and processing overhead, we will limit the context size sent to the AI by only processing the relevant parts of code files that the user is actively working on.
Security and Data Privacy:
It's essential to detail how we'll ensure user data is protected:

Data Handling: Only necessary parts of the user's code and prompts will be sent to Gemini AI. All data transmission will be securely handled using encryption. No sensitive or unnecessary data will be shared without explicit user consent.
Local Storage: We will use VS Code's secure storage API to handle user code and prompt history, ensuring data is safely stored locally and not exposed to external systems unless required.

Marketplace Compliance:
Finally, ensuring compliance with the VS Code Marketplace is crucial for successful publication:

Documentation and Compliance: We will follow all VS Code Marketplace guidelines for documentation, ensuring clear descriptions, proper categorization, and adherence to performance standards.
Performance Monitoring: The extension will be continuously monitored for performance issues or crashes to ensure it meets the marketplace's standards for quality

---

Composer can pretty much write a full app for you (within reason). It has progressed AI code assistance from just editing single lines of code and individual pages, to editing and creating multiple pages at once.

Provide it with instructions, and away it goes.