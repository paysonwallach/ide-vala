const {shell} = require("electron");
const {spawn} = require("child_process");
const {AutoLanguageClient} = require("atom-languageclient");

class ValaLanguageClient extends AutoLanguageClient {
  getGrammarScopes() {
    return [
      "source.vala",
      "source.vapi",
      "vala",
      "vapi"
    ];
  }

  getLanguageName() {
    return "Vala";
  }

  getServerName() {
    return "Vala Language Server";
  }

  startServerProcess() {
    const vls = spawn(atom.config.get("ide-vala.vlsPath"), {
      env: {
        // G_MESSAGES_DEBUG: "all",
        PATH: process.env.PATH
      }
    });

    vls.on("error", err =>
      atom.notifications.addError("Unable to start the Vala language server.", {
        dismissable: true,
        buttons: [
          {
            text: "Install Instructions",
            onDidClick: () =>
              atom.workspace.open("atom://config/packages/ide-vala")
          },
          {
            text: "Download Vala Language Server",
            onDidClick: () =>
              shell.openExternal(
                "https://github.com/benwaffle/vala-language-server"
              )
          }
        ],
        description:
          "This can occur if you do not have Vala language server installed or if it is not in your path."
      })
    );

    return vls;
  }
}

module.exports = new ValaLanguageClient();
