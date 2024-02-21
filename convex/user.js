import { mutation, query } from "./_generated/server.js";
import { v } from "convex/values";


export const createUser = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        password: v.string(),
    },
    handler: async (ctx, args) => {
        const userId = await ctx.db.insert("users", {
            name: args.name,
            email: args.email,
            password: args.password,
        });
        return userId;
    }
})

// provide a crud operations for user

export const getUserWithId = query({
    args: {
        id: v.id("users"),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.query("users").filter((q) => q.eq(q.field("_id"), args.id)).first();
        return user;
    }
})
