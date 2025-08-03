import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useRef } from "react";

function useHistory() {
  const updateConvexState = useMutation(api.board.updateBoardState);
  const historyRef = useRef([]); // persist across renders
  const currRef = useRef(-1);    // persist across renders

  async function updateState() {
    await updateConvexState({
      roomId: "999",
      newState: JSON.stringify(historyRef.current[currRef.current])
    });
  }

  function saveState(canvas) {
    if (currRef.current < historyRef.current.length - 1) {
      historyRef.current = historyRef.current.slice(0, currRef.current + 1);
    }
    historyRef.current.push(canvas.toJSON());
    currRef.current++;
    updateState();
  }

  function undo() {
    console.log("Undo:", currRef.current);
    if (currRef.current > 0) {
      currRef.current--;
      updateState();
      return historyRef.current[currRef.current];
    }
    return null;
  }

  function redo() {
    if (currRef.current < historyRef.current.length - 1) {
      currRef.current++;
      updateState();
      return historyRef.current[currRef.current];
    }
    return null;
  }

  return { undo, redo, saveState };
}

export default useHistory;
