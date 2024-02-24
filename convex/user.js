import { mutation, query } from "./_generated/server.js";
import { v } from "convex/values";


export const createUser = mutation({
    args: {
        name: v.string(),
    },
    handler: async (ctx, args) => {
        const userId = await ctx.db.insert("users", {
            name: args.name,
        });
        return userId;
    }
})


/**
 * Retrieves a user with the specified ID.
 *
 * @param {string} id - The ID of the user.
 * @returns {Promise<Object>} - A promise that resolves to the user object.
 */
export const getUserWithId = query({
    args: {
        id: v.id("users"),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.query("users").filter((q) => q.eq(q.field("_id"), args.id)).first();
        return user;
    }
});

export const deleteUser = mutation({
    args: {
        id: v.id("users"),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.query("users").filter((q) => q.eq(q.field("_id"), args.id)).first();
        if (!user) {
            throw new Error("User not found");
        }
        await ctx.db.delete(args.id);
    }
});
