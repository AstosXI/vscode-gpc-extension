const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const cp = require('child_process');

class BUILD {
    static async build_project(context) {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            vscode.window.showErrorMessage("No workspace folder is open.");
            return;
        }

        const projectJsonPath = path.join(workspaceFolder.uri.fsPath, 'project.json');
        if (!fs.existsSync(projectJsonPath)) {
            vscode.window.showErrorMessage("No project.json file found in the workspace.");
            return;
        }

        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Building project...",
            cancellable: true
        }, async (progress, token) => {
            const extensionPath = context.extensionPath;
            let exePath;

            if (process.platform === 'win32') {
                exePath = path.join(extensionPath, 'bin', 'windows', 'toriel-bt.exe');
            } else if (process.platform === 'darwin') {
                vscode.window.showErrorMessage("Building isnt available on MacOS.")
            } else {
                exePath = path.join(extensionPath, 'bin', 'linux', 'toriel-bt');
            }

            try {
                fs.accessSync(exePath, fs.constants.X_OK);
            } catch (err) {
                if (process.platform !== 'win32') {
                    try {
                        fs.chmodSync(exePath, 0o755);
                    } catch (chmodError) {
                        vscode.window.showErrorMessage(`Failed to set executable permissions: ${chmodError.message}`);
                    }
                } else {
                    vscode.window.showErrorMessage(`Executable not found or not accessible: ${exePath}`);
                    return;
                }
            }

            const buildDir = path.join(workspaceFolder.uri.fsPath, 'build');
            if (!fs.existsSync(buildDir)) {
                fs.mkdirSync(buildDir, { recursive: true });
            }

            try {
                progress.report({ message: 'Scanning Project Directory...' });

                const result = await BUILD.executeProcess(
                    exePath,
                    [
                        '--source', workspaceFolder.uri.fsPath,
                        '--output', buildDir
                    ]
                );
                if (result.exitCode === 0) {
                    vscode.window.showInformationMessage('Build completed successfully.');
                } else if (result.stderr.includes('quota exceeded')) {
                    vscode.window.showErrorMessage('Build failed: Quota exceeded. Please try again later.');
                } else {
                    vscode.window.showErrorMessage(`Build failed: ${result.stderr}`);
                }
            } catch (err) {
                vscode.window.showErrorMessage(`Error building project: ${err.message}`);
            }
        });
    }

    static async executeProcess(command, args) {
        return new Promise((resolve, reject) => {
            const process = cp.spawn(command, args);

            let stdout = '';
            let stderr = '';

            process.stdout.on('data', (data) => {
                const chunk = data.toString();
                stdout += chunk;
                console.log(chunk);
            });

            process.stderr.on('data', (data) => {
                const chunk = data.toString();
                stderr += chunk;
                console.error(chunk);
            });

            process.on('close', (code) => {
                resolve({
                    stdout,
                    stderr,
                    exitCode: code ?? -1
                });
            });

            process.on('error', (err) => {
                reject(err);
            });
        });
    }
}

module.exports = BUILD;
