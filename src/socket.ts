interface Data<obj> {
  [propName: string]: obj;
}

interface Init {
  url: string;
  onOpen: () => void;
  onResponse: (res) => void;
  onError: (error: Event) => void;
  onClose: (e: CloseEvent) => void;
  retry?: number;
}

type Send = <obj>(data: Data<obj>) => void;

let send: Send = () => {};

let closeWS: () => void = () => {};

let connected = false;

function initWebSocket({
  url,
  onOpen = function () {},
  onResponse = function () {},
  onError = function () {},
  onClose = function () {},
  retry = 0
}: Init) {
  if (connected) return;
  connected = true;

  const ws = new WebSocket(url);
  let retries = 0;

  send = data => {
      ws!.send(JSON.stringify(data));
  };

  closeWS = () => {
      console.log("WS CLOSE");
      ws.close();
      connected = false;
  };

  ws.onopen = () => {
      retries = 0;
      onOpen();
  };

  ws.onmessage = async msg => {
      const res = JSON.parse(await new Response(msg.data).text());
      if (res) onResponse(res);
  };

  ws.onerror = error => {
      console.log("ERROR: ", error);
      connected = false;
      onError(error);
      ws.close();
  };

  ws.onclose = (e: CloseEvent) => {
      if (e.code !== 1000 && retries < retry) {
          retries++;
          console.log(`WS connection lost, attempting to reconnect... (attempt ${retries})`);
          setTimeout(() => {
              initWebSocket({
                  url,
                  onOpen,
                  onResponse,
                  onError,
                  onClose,
                  retry
              });
          }, retries * 1000);
      } else {
          console.log("CLOSE");
          onClose(e);
          connected = false;
      }
  };
}
export { initWebSocket, send, closeWS };
