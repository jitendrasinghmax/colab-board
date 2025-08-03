import mongoose from "mongoose";

// Schema
const stateSchema = new mongoose.Schema({
  state: Object, // you can refine this type further if needed
});

// Guard against overwrite in hot reload / repeated imports
export const StateModel =
  mongoose.models.State || mongoose.model("State", stateSchema);

export async function updateState(state) {
  try {
    const newState = await StateModel.create({ state });
    return newState;
  } catch (e) {
    // optional: you can inspect e.code for duplicate key etc.
    throw new Error(e.message);
  }
}
