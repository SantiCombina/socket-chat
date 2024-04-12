import * as z from "zod";

export const homeSchema = z.object({
    user_name: z.string().min(1, "You must log in with your name").max(20, "Maximum 20 characters"),
    room: z.string().min(1, "The room is required"),
});

export type HomeValues = z.infer<typeof homeSchema>;
