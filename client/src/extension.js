const path = require('path');
const vscode = require('vscode');
const {
  LanguageClient,
  TransportKind
} = require('vscode-languageclient/node');

let client;

function activate(context) {
  // Register the command
  let disposable = vscode.commands.registerCommand('extension.command1', () => {
    // Command implementation here
    vscode.window.showInformationMessage('GPC Command 1 executed!');
  });

  context.subscriptions.push(disposable);

  // The server is implemented in node
  const serverModule = context.asAbsolutePath(
    path.join('server', 'src', 'server.js')
  );

  // The debug options for the server
  const debugOptions = {
    execArgv: ['--nolazy', '--inspect=6009']
  };

  // Server options
  const serverOptions = {
    run: { 
      module: serverModule, 
      transport: TransportKind.ipc 
    },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: debugOptions
    }
  };

  // Client options
  const clientOptions = {
    documentSelector: [{ scheme: 'file', language: 'gpc' }],
    synchronize: {
      fileEvents: vscode.workspace.createFileSystemWatcher('**/*.gpc')
    }
  };

  // Create the language client
  client = new LanguageClient(
    'gpcLanguageServer',
    'GPC Language Server',
    serverOptions,
    clientOptions
  );

  // Start the client
  console.log("Started Client");
  client.start();
}

function deactivate() {
  if (!client) {
    console.log("Deactivated");
    return undefined;
  }
  console.log("Stopped.");
  return client.stop();
}

module.exports = {
  activate,
  deactivate
};