const path = require('path');
const vscode = require('vscode');
const BUILD = require('./build');

const {
  LanguageClient,
  TransportKind
} = require('vscode-languageclient/node');

let client;

function activate(context) {
  let build = vscode.commands.registerCommand('gpc.build', async () => {
    BUILD.build_project(context);
  });

  context.subscriptions.push(build);

  const serverModule = context.asAbsolutePath(
    path.join('server', 'src', 'server.js')
  );

  const debugOptions = {
    execArgv: ['--nolazy', '--inspect=6009']
  };

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

  const clientOptions = {
    documentSelector: [{ scheme: 'file', language: 'gpc' }],
    synchronize: {
      fileEvents: vscode.workspace.createFileSystemWatcher('**/*.gpc')
    }
  };

  client = new LanguageClient(
    'gpcLanguageServer',
    'GPC Language Server',
    serverOptions,
    clientOptions
  );

  vscode.workspace.getConfiguration("workbench").update(
    "iconTheme",
    "gpc-icons",
    vscode.ConfigurationTarget.Global
  );

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