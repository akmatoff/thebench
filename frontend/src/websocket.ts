const WS_URL = "ws://localhost:7000/bench";

const ws = new WebSocket(WS_URL);

ws.onopen = () => {
  console.log("Connected to the bench.");
};

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);

  console.log("message", message);
};

ws.onclose = () => {
  console.log("Left the bench.");
};
