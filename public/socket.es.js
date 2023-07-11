let g = () => {
}, u = () => {
}, n = !1;
function d({
  url: c,
  onOpen: s = function() {
  },
  onResponse: l = function() {
  },
  onError: i = function() {
  },
  onClose: a = function() {
  },
  retry: f = 0
}) {
  if (n)
    return;
  n = !0;
  const t = new WebSocket(c);
  let o = 0;
  g = (e) => {
    t.send(JSON.stringify(e));
  }, u = () => {
    console.log("WS CLOSE"), t.close(), n = !1;
  }, t.onopen = () => {
    o = 0, s();
  }, t.onmessage = async (e) => {
    const S = JSON.parse(await new Response(e.data).text());
    S && l(S);
  }, t.onerror = (e) => {
    console.log("ERROR: ", e), n = !1, i(e), t.close();
  }, t.onclose = (e) => {
    e.code !== 1e3 && o < f ? (o++, console.log(
      `WS connection lost, attempting to reconnect... (attempt ${o})`
    ), d({
      url: c,
      onOpen: s,
      onResponse: l,
      onError: i,
      onClose: a,
      retry: f
    })) : (console.log("CLOSE"), a(e), n = !1);
  };
}
export {
  u as closeWS,
  d as initWebSocket,
  g as send
};
