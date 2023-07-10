interface Data<obj> {
  [propName: string]: obj;
}

interface Init {
  url: string;
  onOpen: () => void;
  onResponse: (res: any) => void;
  onError: () => void;
  onClose: () => void;
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
}: Init) {
  if (connected) return;
  connected = true;

  const ws = new WebSocket(url);

  send = (data) => {
    ws!.send(JSON.stringify(data));
  };

  closeWS = () => {
    console.log("WS CLOSE");
    onClose();
    ws.close();
    connected = false;
  };

  ws.onopen = () => {
    onOpen();
  };

  ws.onmessage = async (msg) => {
    const res = JSON.parse(await new Response(msg.data).text());
    if (res) onResponse(res);
  };

  ws.onerror = (error) => {
    console.log("ERROR: ", error);
    connected = false;
    ws.close();
    onError();
  };

  ws.onclose = () => {
    console.log("CLOSE");
  };
}

export { initWebSocket, send, closeWS };
