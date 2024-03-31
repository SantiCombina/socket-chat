import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [{find: /^@\/(.*)/, replacement: "/src/$1"}],
    },
    server: {
        proxy: {
            "/socket.io": {
                target: "http://localhost:3000",
                ws: true,
            },
        },
    },
});
