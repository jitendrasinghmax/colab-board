import {defineSchema,defineTable} from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
    board:defineTable({
        admin:v.string(),
        roomId:v.string(),
        state:v.string()
    }).index("by_roomId", ["roomId"])
})