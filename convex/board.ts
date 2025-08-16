import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { query, mutation } from "./_generated/server";

// No need to define boardType explicitly here as the schema handles types.

export const  getBoard=query(
    async ({db}, {roomId}:{roomId:string})=>{
        if (!roomId) return null;

        const boards = await db
      .query("board")
      .filter((q) =>q.eq(q.field("roomId"), roomId))
      .collect();
        return boards;
    }
)
export const createBoard = mutation({
    args: {
      admin: v.string(), // Define that 'admin' should be a string
      roomId: v.string(), // Define that 'roomId' should be a string
    },
    handler: async (ctx, args) => {
      // Insert a new document into the "board" table
        const existing = await ctx.db
      .query("board")
      .filter((q) => q.eq(q.field("roomId"), args.roomId))
      .first();

    if (existing) {
      return null; // Already exists
    }

      const boardId = await ctx.db.insert("board", {
        admin: args.admin,
        roomId: args.roomId,
        state: "", // Initialize with an empty string
      });
  
      // You can return the ID of the newly created board if needed
      return boardId;
    },
  });

  export const updateBoardState = mutation({
    args: {
        roomId: v.string(),
        newState: v.string(),
    },
    handler: async (ctx, args) => {
        const { roomId, newState } = args;

        const boardToUpdate = await ctx.db
            .query("board")
            .withIndex("by_roomId", (q) => q.eq("roomId", roomId))
            .unique(); // Expecting a single unique result
        if (!boardToUpdate) {
            throw new Error(`Board with roomId '${roomId}' not found.`); //
        }

        await ctx.db.patch(boardToUpdate._id, { state: newState });

        return boardToUpdate._id;
    },
});
