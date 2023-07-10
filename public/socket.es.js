let a = () => {
}, r = () => {
}, o = !1;
function S({
  url: t,
  onOpen: c = function() {
  },
  onResponse: l = function() {
  },
  onError: i = function() {
  },
  onClose: f = function() {
  }
}) {
  if (o)
    return;
  o = !0;
  const e = new WebSocket(t);
  a = (n) => {
    e.send(JSON.stringify(n));
  }, r = () => {
    console.log("WS CLOSE"), f(), e.close(), o = !1;
  }, e.onopen = () => {
    c();
  }, e.onmessage = async (n) => {
    const s = JSON.parse(await new Response(n.data).text());
    s && l(s);
  }, e.onerror = (n) => {
    console.log("ERROR: ", n), o = !1, e.close(), i();
  }, e.onclose = () => {
    console.log("CLOSE");
  };
}
export {
  r as closeWS,
  S as initWebSocket,
  a as send
};
