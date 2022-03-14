import io from "socket.io-client";

const socketService = io("" + process.env.REACT_APP_API_URL);

export default socketService;

// function SocketService() {
//     const socket = io("" + process.env.REACT_APP_API_URL);

//     return {
//         on: (eventName: string, callback: (data: any) => void) => {
//             socket.on(eventName, callback);
//         },
//         emit: (eventName: string, data: any) => {
//             socket.emit(eventName, data);
//         },
//     };
// }

// export default SocketService


// import { io, Socket } from "socket.io-client";

// const url = "" + process.env.REACT_APP_API_URL;

// class SocketService {
//     public socket: Socket | null = null;

//     public connect(
//     ): Promise<Socket> {
//         return new Promise((rs, rj) => {
//             this.socket = io(url);

//             if (!this.socket) return rj();

//             this.socket.on("connect", () => {
//                 rs(this.socket as Socket);
//             });

//             this.socket.on("connect_error", (err) => {
//                 console.log("Connection error: ", err);
//                 rj(err);
//             });
//         });
//     }
// }

// export default new SocketService();