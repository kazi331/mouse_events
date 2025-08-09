import { useState, type MouseEvent } from "react";

type Client = { x: number; y: number }
const DivDrag = () => {
    const [client, setClient] = useState<Client>({ x: 0, y: 0 });
    const [offset, setOffset] = useState<Client>({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const mouseDown = (e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        console.log(rect.toJSON())
        // Store the offset between the mouse click and the box's top-left corner
        setOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
        setIsDragging(true);
    }
    const mouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!isDragging) return;
        setClient({ x: e.clientX - offset.x, y: e.clientY - offset.y })
    }
    const mouseUp = () => setIsDragging(false)

    return (
        <div
            className="h-screen bg-slate-700 text-slate-400 pt-10"
            onMouseMove={mouseMove}
            onMouseUp={mouseUp}
        >
            <div
                id="move-item"
                className="w-40 h-40 bg-slate-500 absolute"
                onMouseDown={mouseDown}
                style={{
                    left: `${client.x}px`,
                    top: `${client.y}px`,
                    cursor: isDragging ? 'grabbing' : 'grab'
                }}
            />
            <div>
                {
                    JSON.stringify(offset)
                }
            </div>
        </div>
    )
}

export default DivDrag