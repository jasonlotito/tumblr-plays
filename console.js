const sessionToken = TMGLiveVideo.Session.getSessionToken()
const ws = new WebSocket("wss://video-live.meetme.com/")
ws.addEventListener('open', function open() {
  const d = { "op": "connect", "applicationId": "sns-video" }
  ws.send(JSON.stringify(d))
  alert("OPENED")
  const subChatters = {
    "op": "subscribe",
    "requestId": 5,
    "query": { "className": "SNSChatParticipant", "where": { "chatName": "OrYw9JDUNN" } },
    "sessionToken": sessionToken
  }
  ws.send(JSON.stringify(subChatters))

  const subMessages = {
    "op": "subscribe",
    "requestId": 4,
    "query": { "className": "SNSChatMessage", "where": { "chatName": "OrYw9JDUNN" } },
    "sessionToken": sessionToken
  };
  ws.send(JSON.stringify(subMessages))
})
ws.addEventListener('message', function message(m) {
  ws.send(JSON.stringify(m))
});
