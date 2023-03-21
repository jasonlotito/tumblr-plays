const YAML = require('yaml')
const WebSocket = require('ws')
// const fetch = require('node-fetch')
const Table = require('cli-table3');
const { exec } = require('child_process')
const fs = require("fs");

const configFile = fs.readFileSync('./config.yaml', 'utf8')
const config = YAML.parse(configFile)
const viewers = []
const messageQueue = []
const ws = new WebSocket("wss://video-live.gateway.tumblr-live.com/")

console.log(config)
const chatName = process.argv[2] || config.ChatId;
const appName = process.argv[3] || config.AppName;
const networkId = process.argv[4] || config.NetworkId;
const sessionToken = process.argv[5] || config.SessionToken;

ws.on('open', async function open() {
  console.log('Connected...');
  console.log("ChatName: ", chatName)
  console.log("AppName: ", appName)
  console.log("NetworkId: ", networkId)
  console.log("SessionToken: ", sessionToken)

  const d = { "op": "connect", "applicationId": "sns-video" }
  ws.send(JSON.stringify(d))
  const subChatters = {
    "op": "subscribe",
    "requestId": 5,
    "query": { "className": "SNSChatParticipant", "where": { "chatName": chatName } },
    "sessionToken": sessionToken
  }
  ws.send(JSON.stringify(subChatters))

  const subMessages = {
    "op": "subscribe",
    "requestId": 4,
    "query": { "className": "SNSChatMessage", "where": { "chatName": chatName } },
    "sessionToken": sessionToken
  };
  ws.send(JSON.stringify(subMessages))
})

function handleMessage(object) {
  console.log("Command: ", object, object.text)
  /*
A: D
B: S
L: Q
R: E
Select: Right Shift
Start: Return
Up: Up Arrow
Down: Down Arrow
Left: Left Arrow
Right: Right Arrow
   */
  const keyCommand = {
    a: "d",
    b: "s",
    l: "q",
    r: "e",
    select: "rightshift",
    start: "return",
    up: "up",
    down: "down",
    left: "left",
    right: "right"
  }

  if (object.object.senderNetworkUserId === networkId && object.object.text.toLowerCase() === "quit") {
    process.exit(0)
  }
  const ltr = object.object.text.toLowerCase();
  let cmd = ""
  if (ltr in keyCommand) {
    cmd = keyCommand[ltr]
  } else {
    // cmd = "NOTCMD" + ltr
  }

  exec(`sendkeys --application-name "${appName}" --characters "${cmd}"`)
}


ws.on('message', function message(data) {
  const ob = JSON.parse(data.toString())
  if (ob.object && ob.object.className) {
    switch (ob.object.className) {
      case 'SNSChatMessage':
        handleMessage(ob);
        break;
    }
  }
})

ws.on('close', function close() {
  console.log('closing...')
})
