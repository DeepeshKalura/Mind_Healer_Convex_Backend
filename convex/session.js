import { mutation, query } from "./_generated/server.js";
import { v } from "convex/values";

export const allSessionForUser = query({
    args: {
        id: v.id('users'),
    },
    handler: async (ctx, args) => {
        const session_list = (await ctx.db.query("sessions").filter(q => q.eq(q.field("userId"), args.id)).collect());
        let session_id_list = []
        for (let i = 0; i < session_list.length; i++) {
            // console.log(session_list[i]._id);
            const data = {
                "id": session_list[i]._id
            }
            session_id_list.push(data);
        }
        return session_id_list;
    }
});

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
});


export const createdNewThread = mutation({
    args: {
        id: v.id("sessions"),
        message: v.string(),
        response: v.string(),
        sentiment_compound: v.float64(),
    },
    handler: async (ctx, args) => {
        const thread_id = await ctx.db.insert("threads", {
            session_id: args.id,
            message: args.message,
            response: args.response,
            sentiment_compound: args.sentiment_compound,
        });
        console.log(thread_id);
        const thread = await ctx.db.get(thread_id);
        return thread;
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
