import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

import {HomeValues, homeSchema} from "@/schemas/home-schema";
import {useSocketStore} from "@/stores/socket-store";

export function Home() {
    const navigate = useNavigate();

    const methods = useForm<HomeValues>({
        resolver: zodResolver(homeSchema),
    });

    const setUserName = useSocketStore((state) => state.setUserName);
    const setRoom = useSocketStore((state) => state.setRoom);

    const handleSubmit = (values: HomeValues) => {
        setUserName(values.user_name);
        setRoom(values.room.toLowerCase().trim());
        navigate(`/chat?room=${values.room}`);
    };

    return (
        <div className="h-screen w-screen bg-[#0C1317] text-[#e9edef]">
            <div className="container flex flex-col h-screen p-4">
                <form
                    className="bg-[#121B20] h-full items-center flex flex-col justify-center gap-3"
                    onSubmit={methods.handleSubmit(handleSubmit)}
                >
                    <label className="flex flex-col" htmlFor="nickname">
                        <span>Nickname</span>
                        <div className="flex flex-col">
                            <input
                                {...methods.register("user_name")}
                                autoComplete="off"
                                className={`${
                                    methods.formState.errors.user_name
                                        ? "border border-red-400"
                                        : "border border-transparent"
                                } outline-none bg-[#2A3942] rounded-lg py-2 px-4`}
                                id="nickname"
                                placeholder="Your nickname"
                                type="text"
                            />
                            <h2 className="text-sm text-red-400">{methods.formState.errors.user_name?.message}</h2>
                        </div>
                    </label>
                    <label className="flex flex-col" htmlFor="room">
                        <span>Room</span>
                        <div className="flex flex-col">
                            <input
                                {...methods.register("room")}
                                autoComplete="off"
                                className={`${
                                    methods.formState.errors.room
                                        ? "border border-red-400"
                                        : "border border-transparent"
                                } outline-none bg-[#2A3942] rounded-lg py-2 px-4`}
                                id="room"
                                placeholder="Insert room"
                                type="text"
                            />
                            <h2 className="text-sm text-red-400">{methods.formState.errors.room?.message}</h2>
                        </div>
                    </label>
                    <button className="px-3 py-1 border border-red-500 rounded-lg">Join</button>
                </form>
            </div>
        </div>
    );
}
