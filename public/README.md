# Base websocket

## API

```
import { initWebSocket, send, closeWS } from 'base-websocket';
```

### initWebSocket

type: function, params: { url, onOpen, onResponse, onError, onClose }

#### url

Websocket connect path

#### onOpen

When websocket connect use this function.

#### onResponse

Server response function, data is json.

#### onError, onClose

Error, close life cycle.
