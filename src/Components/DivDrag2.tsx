import { useState, type MouseEvent } from "react"

type Client = { x: number, y: number }
export default function DivDrag2() {
    const [client, setClient] = useState<Client>({ x: 0, y: 0 })
    const [offset, setOffset] = useState<Client>({ x: 0, y: 0 })
    const [isDragging, setIsDragging] = useState(false)

    const mouseDown = (e: MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        const rect = e.currentTarget.getBoundingClientRect();
        setOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        })
    }
    const mouseUp = () => setIsDragging(false)
    const mouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!isDragging) return;
        setClient({
            x: e.clientX - offset.x,
            y: e.clientY - offset.y
        })
    }
    return (
        <div
            className="h-screen bg-slate-700 text-slate-400"
            onMouseMove={mouseMove}
            onMouseUp={mouseUp}
        >
            <div
                id="move-item"
                className="w-40 h-40 bg-slate-500 absolute"
                onMouseDown={mouseDown}
                style={{
                    left: client.x + 'px',
                    top: client.y + 'px',
                    cursor: isDragging ? 'grabbing' : 'grab'
                }}
            />
        </div>
    )
}
