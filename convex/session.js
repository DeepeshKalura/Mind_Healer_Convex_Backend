import { mutation, query } from "./_generated/server.js";
import { v } from "convex/values";


export const createNewSession = mutation({
    args: {
        id: v.id('users'),
    },
    handler: async (ctx, args) => {
        var lt = Math.floor(Date.now());
        const sessionId = await ctx.db.insert("sessions", {
            userId: args.id,
            isEnded: false,
            lastTime: lt
        });
        return sessionId;
    }
})


export const createdNewThread = mutation({
    args: {
        id: v.id("sessions"),
        message: v.string(),
        response: v.string(),
        sentiment_compound: v.float64(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.insert("threads", {
            session_id: args.id,
            message: args.message,
            response: args.response,
            sentiment_compound: args.sentiment_compound,
        });
    }
});

export const sessionEnded = mutation({
    args: {
        id: v.id("sessions"),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, { isEnded: true })
    }
});

export const updateLastTime = mutation({
    args: {
        id: v.id("sessions"),
    },
    handler: async (ctx, args) => {
        var lt = Math.floor(Date.now());
        await ctx.db.patch(args.id, { lastTime: lt, })
    }
});
