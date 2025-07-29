function useHistory() {
    let history = [];
    let curr = -1;
  
    function saveState(canvas) {
      if (curr < history.length - 1) {
        history = history.slice(0, curr + 1);
      }
      history.push(canvas.toJSON());
      curr++;
    }
  
    function undo() {
      if (curr > 0) {
        curr--;
        return history[curr];
      }
      return null;
    }
  
    function redo() {
      if (curr < history.length - 1) {
        curr++;
        return history[curr];
      }
      return null;
    }
  
    return { undo, redo, saveState };
  }
export default useHistory  