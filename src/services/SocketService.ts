import io from "socket.io-client";
function SocketService() {
    const socket = io("" + process.env.REACT_APP_API_URL);

    return {
        on: (eventName: string, callback: (data: any) => void) => {
            socket.on(eventName, callback);
        },
        emit: (eventName: string, data: any) => {
            socket.emit(eventName, data);
        },
    };
}

export default SocketService
