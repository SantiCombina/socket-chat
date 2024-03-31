import {io, Socket} from "socket.io-client";
import {create} from "zustand";

export interface SocketStore {
    socket: Socket;
    room: string | null;
    user_name: string;
    setUserName: (name: string) => void;
    setRoom: (room: string) => void;
}

export const useSocketStore = create<SocketStore>()((set) => ({
    socket: io("/"),
    room: null,
    user_name: "Anonymous",
    setUserName: (name) => {
        set({
            user_name: name,
        });
    },
    setRoom: (room) => {
        set({
            room: room,
        });
    },
}));
