import {FormEvent, useEffect, useMemo, useRef, useState} from "react";
import {StringParam, useQueryParams} from "use-query-params";

import {useSocketStore} from "@/stores/socket-store";

interface Message {
    room: string;
    message: string;
    user_name: string;
    color: string;
    user_id: string;
}

export function Room() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState("");

    const [queryParams, setQueryParams] = useQueryParams({
        room: StringParam,
    });

    const socket = useSocketStore((state) => state.socket);
    const room = useSocketStore((state) => state.room);
    const userName = useSocketStore((state) => state.user_name);

    const popRef = useRef<HTMLAudioElement>(null);
    const lastMessageRef = useRef<HTMLUListElement>(null);

    const randomColor = useMemo(() => {
        const min = 1;
        const max = 5;
        const random = Math.floor(Math.random() * (max - min + 1)) + min;

        const colors = ["#24CD62", "#E26AB6", "#53A6F6", "#FC976E", "#E35C6D"];

        return colors[random - 1];
    }, []);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (inputMessage.length > 0) {
            socket.emit("messages", {
                room: queryParams.room,
                message: inputMessage,
                user_name: userName,
                color: randomColor,
                user_id: socket.id,
            });
            setInputMessage("");
        }
    };

    useEffect(() => {
        if (room) {
            setQueryParams({
                room: room.toLocaleLowerCase().trim(),
            });
            socket.emit("joinRoom", room);
        } else {
            socket.emit("joinRoom", queryParams.room?.toLocaleLowerCase().trim());
        }
  }, []); //eslint-disable-line

    useEffect(() => {
        socket.on("messagesHistory", (messages) => {
            setMessages(messages);
        });
  }, []); //eslint-disable-line

    useEffect(() => {
        socket.on("messages", (message) => {
            setMessages(message);
            popRef.current && popRef.current.play();
        });
  }, []); //eslint-disable-line

    useEffect(() => {
        if (lastMessageRef.current) lastMessageRef.current.scrollTop = lastMessageRef.current.scrollHeight;
    }, [messages]);

    useEffect(() => {
        document.title = `Socket Chat / ${room}`;
  }, []); //eslint-disable-line

    return (
        <div className="h-screen w-screen bg-[#0C1317] text-[#e9edef]">
            <div className="container flex flex-col h-screen p-4">
                <div className="bg-[#202C33] p-3 flex gap-2">
                    <span className="font-bold">{queryParams.room}</span>
                </div>
                <audio ref={popRef} src="/pop.mp3" />
                <ul
                    ref={lastMessageRef}
                    className="relative flex flex-col h-full px-16 overflow-auto gap-2 bg-[#121B20]"
                >
                    {messages.map((message, index) => {
                        return (
                            <li
                                key={index}
                                className={`${
                                    socket.id === message.user_id ? "justify-end" : "justify-start"
                                } flex w-full`}
                            >
                                <div className="flex p-2 break-words rounded-lg w-fit flex-col max-w-[80%] bg-[#1F2C33]">
                                    <span style={{color: message.color}}>{message.user_name}</span>
                                    <span>{message.message}</span>
                                </div>
                            </li>
                        );
                    })}
                </ul>
                <form action="" className="w-full bg-[#202C33] px-6 py-2" onSubmit={handleSubmit}>
                    <input
                        autoFocus
                        className="bg-[#2A3942] rounded-lg py-2 px-4 outline-none w-full"
                        placeholder="Type a message"
                        type="text"
                        value={inputMessage}
                        onChange={(event) => setInputMessage(event.currentTarget.value)}
                    />
                </form>
            </div>
        </div>
    );
}
