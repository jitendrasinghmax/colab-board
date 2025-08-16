import { useMutation } from 'convex/react';
import { genId } from '../../../lib/uuid/genId';
import './style.css'
import { api } from '../../../convex/_generated/api';
export default function CreateDialog({isCollab,setIsCollab,setOpenDialog}) {
    const createSession=useMutation(api.board.createBoard);

    const id=genId();
    const handelCreateSession=async ()=>{
        await createSession({
            admin:"admin",
            roomId:id
        });
        setIsCollab({
            isCollab:true,
            roomId:id
        });
    }
    return (
        <>
        <div className="createDialog">
                <h1>
                    Live collaboration
                </h1>
                <h2>
                    Invite people to collaborate on your drawing.
                </h2>
                <h2>
                    Don't worry, the session is end-to-end encrypted, and fully private. Not even our server can see what you draw.
                </h2>
                {isCollab.isCollab && ( 
                    <div className="session-link">
                        <input
                            type="text"
                            readOnly
                            value={`${window.location.origin}/collab/${isCollab.roomId}`}
                            style={{ width: '80%', marginRight: '8px' }}
                        />
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(`${window.location.origin}/${isCollab.roomId}`);
                            }}
                        >
                            Copy
                        </button>
                    </div>
                )}
                {isCollab.isCollab==false?<button className='session-btn' onClick={handelCreateSession}>New Session</button>
                :<button className='session-btn' onClick={()=>{
                    setIsCollab({
                        isCollab:false,
                        roomId:"0"
                    });
                }}>End Session</button>}
                <button className='close-btn' onClick={()=>setOpenDialog(false)}>Close</button>
        </div>
        </>
    )
}