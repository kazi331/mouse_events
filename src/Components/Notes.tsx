import { useState } from "react";

function NotesApp() {
    const [notes, setNotes] = useState([1, 2]);
    const addNote = () => setNotes(prev => [...prev, prev.length + 1])

    return (
        <div
            className="bg-slate-800 h-screen p-2"

        >
            <div className="flex w-max gap-1 p-1 bg-white rounded-2xl mb-2">
                <input type="color" className="rounded-full w-6 h-6 colorPicker" />
                <button onClick={addNote} className="w-6 h-6 rounded-full bg-black text-white cursor-pointer">+</button>
            </div>
            {notes.map((_, i) => (
                <div
                    className="absolute top-20 left-5 min-w-64 max-w-min rounded-2xl rounded-b-3xl overflow-hidden p-0 m-0 active:cursor-grab"
                >
                    <NoteContent key={i} />
                </div>
            ))}
        </div>
    );
}

export default NotesApp;

const NoteContent = () => {
    return (<>
        <div className="flex flex-row justify-between items-center p-2 bg-black text-white" id="">
            <p className="text-sm font-mono">Title</p>
            <button className="w-6 h-6 rounded-full bg-red-400 text-white cursor-pointer text-xs">X</button>
        </div>
        <textarea name="notes" rows={6} id="notes" className="w-full bg-slate-600/50 appearance-none p-1 focus:outline-0 text-gray-300 text-sm" />
    </>
    )
}