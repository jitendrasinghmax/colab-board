
import { useState, useEffect, useRef, use } from "react";
import { set } from "mongoose";

function useHistory() {
  const [history, setHistory] = useState([]);
  const [currState, setCurrState] = useState({});
  const curr = useRef(-1);

  function saveState(canvas) {
    if (curr.current === -1) {
      setHistory([ canvas.toJSON()]);
    } else if (curr.current < history.length - 1) {
      setHistory((prev) => [...prev.slice(0, curr.current + 1), canvas.toJSON()]);
    } else {
      setHistory((prev) => [...prev,  canvas.toJSON()]);
    }
          setCurrState(canvas.toJSON());

    curr.current = curr.current + 1;
  }

  function undo() {

    if (curr.current > 0) {
      curr.current = curr.current - 1;
      setCurrState(history[curr.current]);
      return history[curr.current];
    }

    return null;
  }

  function redo() {
    if (curr.current < history.length - 1) {
      curr.current = curr.current + 1;
      setCurrState(history[curr.current]);
      return history[curr.current];
    }
    return null;
  }

  return {currState, undo, redo, saveState };
}

export default useHistory;
