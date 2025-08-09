import { useRef, useState, type MouseEvent } from "react";
import generateRandomRgbColor from "../lib/utils";

interface Client { x: number, y: number }
interface Card extends Client { id: number; bg?: string }
export default function Drag4() {
    const boxWidth = 160;
    const boxHeight = 160;
    const [cards, setCards] = useState<Card[]>([{ id: 1, x: 50, y: 60, bg: 'rgb(85 103 129)' }])
    const [offset, setOffset] = useState<Client>({ x: 0, y: 0 })
    const [isDragging, setIsDragging] = useState(false);
    const [selectedCard, setselectedCard] = useState<number | null>(null)

    const containerRef = useRef<HTMLDivElement>(null);

    const mouseDown = (e: MouseEvent<HTMLDivElement>, id: number) => {
        setIsDragging(true);
        setselectedCard(id);
        const rect = e.currentTarget.getBoundingClientRect();

        setOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    }
    const mouseUp = () => setIsDragging(false);

    const mouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!isDragging || !containerRef.current || !selectedCard) return;

        const containerRect = containerRef.current?.getBoundingClientRect()

        const maxX = containerRect?.width - boxWidth;
        const maxY = containerRect?.height - boxHeight;

        // control so it's never go outside of viewport
        const newX = Math.min(maxX, Math.max(e.clientX - offset.x, 0));
        const newY = Math.min(maxY, Math.max(e.clientY - offset.y, 0))
        setCards(prev => prev.map(card => card?.id === selectedCard ? { ...card, x: newX, y: newY } : card))
    }
    const addCard = () => {
        if (!containerRef.current) return;
        const containerRect = containerRef.current?.getBoundingClientRect()
        const randomX = Math.random() * (containerRect?.width - boxWidth)
        const randomY = Math.random() * (containerRect?.height - boxHeight)

        setCards(prev => [...prev, { id: prev.length + 1, x: randomX, y: randomY, bg: generateRandomRgbColor() }])
    }
    return (
        <div
            ref={containerRef}
            className="h-screen bg-slate-700 text-slate-400"
            onMouseMove={mouseMove}
            onMouseUp={mouseUp}
        >
            {
                cards.map((card) => (<div
                    key={card.id}
                    className="w-40 h-40  absolute border transition-discrete"
                    onMouseDown={(e) => mouseDown(e, card.id)}
                    style={{
                        left: card.x + 'px',
                        top: card.y + 'px',
                        borderRadius: isDragging && card.id === selectedCard ? '20px' : '5px',
                        cursor: isDragging ? 'grabbing' : 'grab',
                        background: card?.bg
                    }}
                />))
            }
            {/* Add Card Button */}
            <button
                onClick={addCard}
                className="absolute bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-600 cursor-pointer"
            >
                +
            </button>
        </div>
    )
}
