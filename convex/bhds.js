import { mutation, query } from "./_generated/server.js";


export const list = query({
    args: {},
    handler: async (ctx) => {
        const text = await ctx.db.query("bhds").collect();
        return text;
    }
})


