import io from "socket.io-client";

const socketService = io("" + process.env.REACT_APP_API_URL);

export default socketService;
