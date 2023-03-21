# tmg-chat-reader
For a Tumblr Let's Play!


## Config Setup

The configuration file is located at `config.yaml`.

### Required

```
ChatId: 908f3jopasdf
AppName: Window Name
NetworkId: tumblr:user:0123456789
SessionToken: r:9ddr109c93c405d9828e5d343918e592
```

#### ChatId
ChatId is the ID of the broadcast. You can find it in the URL of the broadcast.

In this URL, the ID is the last portion of the URL. https://www.tumblr.com/live/q2EZVGyBz7

#### AppName
The `AppName` is the exact name of the app you want to send the messages to.

#### NetworkId
NetworkId is the full network ID. You can find this in the Tumblr App. Go to Tools, More, My Live ID.

#### SessionToken
This is the most complicated to get. You need to go to [https://www.tumblr.com/live](https://www.tumblr.com/live) and then open the developer tools.

Go to the Network tab and then refresh the page. You should now see requests. Filter for the following request: `live.com/video-api/tumblr/functions/sns-video:getFollowingBroadcasts`.

Click on the request and then go to the Headers tab. You should see a `Headers` section. Scroll down until you see the `X-Parse-Session-Token` header. Copy the value of that header and paste it into the `SessionToken` field in the config.
