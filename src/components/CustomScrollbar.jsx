import { useEffect, useRef, useState } from "react";

function CustomScrollbar() {
    const [scrollPercent, setScrollPercent] = useState(0);
    const [dragging, setDragging] = useState(false);
    const trackRef = useRef(null);
    const thumbHeight = 80;

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight;
            const winHeight = window.innerHeight;
            const scrollableHeight = docHeight - winHeight;

            const percent = scrollableHeight > 0 ? scrollTop / scrollableHeight : 0;
            setScrollPercent(percent);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!dragging) return;

        const handleMouseMove = (e) => {
            const track = trackRef.current;
            if (!track) return;

            const trackRect = track.getBoundingClientRect();
            const relativeY = e.clientY - trackRect.top - thumbHeight / 2;
            const maxTop = trackRect.height - thumbHeight;
            const clampedY = Math.min(Math.max(relativeY, 0), maxTop);
            const percent = clampedY / maxTop;

            const docHeight = document.documentElement.scrollHeight;
            const winHeight = window.innerHeight;
            const scrollableHeight = docHeight - winHeight;

            window.scrollTo(0, percent * scrollableHeight);
        };

        const handleMouseUp = () => setDragging(false);

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [dragging]);

    const trackHeight = trackRef.current?.clientHeight || 0;
    const maxTop = trackHeight - thumbHeight;
    const thumbTop = maxTop * scrollPercent;

    return (
        <div className="custom-scrollbar-track" ref={trackRef}>
            <div
                className="custom-scrollbar-thumb"
                style={{ top: `${thumbTop}px`, height: `${thumbHeight}px` }}
                onMouseDown={() => setDragging(true)}
            ></div>
        </div>
    );
}

export default CustomScrollbar;