import { useEffect, useRef, useState } from "react";

function CustomCursor() {
    const cursorRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const cursor = cursorRef.current;
            if (!cursor) return;
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        };

        const handleMouseEnter = () => setVisible(true);
        const handleMouseLeave = () => setVisible(false);

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseenter", handleMouseEnter);
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <div
            className="custom-cursor"
            ref={cursorRef}
            style={{ opacity: visible ? 1 : 0 }}
        ></div>
    );
}

export default CustomCursor;