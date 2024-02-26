import { query } from "./_generated/server.js";
import { v } from "convex/values";


export const totalTimeOfuserSession = query({
    args: {
        id: v.id('users'),
    },
    handler: async (ctx, args) => {
        const userSession = await ctx.db.query("sessions").filter(q => q.eq(q.field("userId"), args.id)).collect();
        var totalTimeInSeconds = 0;
        userSession.forEach(session => {
            const timePerSessionSecond = (session.lastTime - session._creationTime) / 1000;
            totalTimeInSeconds += timePerSessionSecond;
        });
        return totalTimeInSeconds;
    }
});

export const durationListOfEachSessionPerUser = query({
    args: {
        id: v.id('users'),
    },
    handler: async (ctx, args) => {
        const userSession = await ctx.db.query("sessions").filter(q => q.eq(q.field("userId"), args.id)).collect();
        var durationList = [];
        userSession.forEach(session => {
            const duration = (session.lastTime - session._creationTime) / 1000;
            durationList.push(duration);
        });
        return durationList;
    }
});

export const lastSessionOfUser = query({
    args: {
        id: v.id('users'),
    },
    handler: async (ctx, args) => {
        const userSession = await ctx.db.query("sessions").filter(q => q.eq(q.field("userId"), args.id)).collect();
        var lastSession = userSession[userSession.length - 1];
        return lastSession;
    }
});

export const totalNumberOfSessionPerUser = query({
    args: {
        id: v.id('users'),
    },
    handler: async (ctx, args) => {
        const userSession = await ctx.db.query("sessions").filter(q => q.eq(q.field("userId"), args.id)).collect();
        return userSession.length;
    }
});

export const listOfSentimentCompoundPerSession = query({
    args: {
        id: v.id('users'),
    },
    handler: async (ctx, args) => {
        const userSession = await ctx.db.query("sessions").filter(q => q.eq(q.field("userId"), args.id)).collect();
        var sentimentCompoundList = [];
        userSession.forEach(async session => {
            const threadData = await ctx.db.query("threads").filter(q => q.eq(q.field("session_id"), session._id)).collect();
            sSC = 0;
            threadData.forEach(thread => {
                sSC += thread.sentiment_compound;
            });
            sentimentCompoundList.push(sSC / threadData.length);
        });
        return sentimentCompoundList;
    }
});

export const sessionUUTCountPerUser = query({
    args: {
        id: v.id('users'),
    },
    handler: async (ctx, args) => {
        const userSession = await ctx.db.query("sessions").filter(q => q.eq(q.field("userId"), args.id)).collect();
        var sessionUUTCount = [];
        userSession.forEach(async session => {
            const threadData = await ctx.db.query("threads").filter(q => q.eq(q.field("session_id"), session._id)).collect();
            sessionUUTCount.push(threadData.length);
        });
        return sessionUUTCount;
    }
});


export const sessionUUTCount = query({
    handler: async (ctx, args) => {
        const userSession = await ctx.db.query("sessions").collect();
        var sessionUUTCount = 0;
        userSession.forEach(async session => {
            const threadData = await ctx.db.query("threads").filter(q => q.eq(q.field("session_id"), session._id)).collect();
            sessionUUTCount += (threadData.length);
        });
        return sessionUUTCount / userSession.length;
    }
});

export const platformInteractionTimeAverage = query({
    handler: async (ctx, args) => {
        const userSession = await ctx.db.query("sessions").collect();
        var durationList = 0;
        userSession.forEach(session => {
            const duration = (session.lastTime - session._creationTime) / 1000;
            durationList += duration;
        });

        return durationList / userSession.length;
    }
});