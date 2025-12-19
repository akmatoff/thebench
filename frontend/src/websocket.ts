const WS_URL = "ws://".concat(window.location.host, "/bench");

const ws = new WebSocket(WS_URL);

ws.onopen = () => {
  console.log("Connected to the bench.");
};

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);

  switch (message.type) {
  }
};

ws.onclose = () => {
  console.log("Left the bench.");
};
