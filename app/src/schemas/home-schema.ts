import * as z from "zod";

export const homeSchema = z.object({
    user_name: z.string().min(1, "Debes acceder con un nombre").max(20, "Máximo 20 caracteres"),
    room: z.string().min(1, "La sala es requerida"),
});

export type HomeValues = z.infer<typeof homeSchema>;
