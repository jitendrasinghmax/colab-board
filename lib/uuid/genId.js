export const genId = () => {
    let id = localStorage.getItem('drawingRoomSessionId');
    if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem('drawingRoomSessionId', id);
    }
    return id;
};