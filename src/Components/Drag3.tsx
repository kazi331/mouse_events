import { useRef, useState, type MouseEvent } from "react";

type Client = { x: number, y: number }
export default function Drag3() {
    const [client, setClient] = useState<Client>({ x: 0, y: 0 })
    const [offset, setOffset] = useState<Client>({ x: 0, y: 0 })
    const [isDragging, setIsDragging] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);

    const mouseDown = (e: MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        const rect = e.currentTarget.getBoundingClientRect();

        setOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        })
    }
    const mouseUp = () => setIsDragging(false);

    const mouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!isDragging || !containerRef.current || !boxRef.current) return;

        const boxRect = boxRef.current?.getBoundingClientRect();
        const containerRect = containerRef.current?.getBoundingClientRect()
        const maxX = containerRect?.width - boxRect.width;
        const maxY = containerRect?.height - boxRect.height;

        // setClient({
        //     x: e.clientX - offset.x,
        //     y: e.clientY - offset.y,
        // })
        // control so it's never go outside of viewport
        setClient({
            x: Math.min(maxX, Math.max(e.clientX - offset.x, 0)),
            y: Math.min(maxY, Math.max(e.clientY - offset.y, 0))
        })
    }
    return (
        <div
            ref={containerRef}
            className="h-screen bg-slate-700 text-slate-400"
            onMouseMove={mouseMove}
            onMouseUp={mouseUp}
        >
            <div
                ref={boxRef}
                className="w-40 h-40 bg-slate-500 absolute"
                onMouseDown={mouseDown}
                style={{
                    left: client.x + 'px',
                    top: client.y + 'px',
                    borderRadius: isDragging ? '20px' : '0',
                    cursor: isDragging ? 'grabbing' : 'grab'
                }}
            />
        </div>
    )
}
