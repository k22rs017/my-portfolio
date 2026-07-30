import { useEffect, useState } from "react";

function Hero() {

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100);
        };
        
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToSection = (id) => {
        document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    }
    
    return (
    <>
        <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <span className="header-title">Portfolio</span>
        <nav className="header-nav">
            <button onClick={() => scrollToSection("about")}>About</button>
            <button onClick={() => scrollToSection("projects")}>Projects</button>
            <button onClick={() => scrollToSection("contact")}>Contact</button>
            </nav>
        </header>
        <section className="hero">
        <p>上原 一眞</p>
        <p>九州産業大学 大学院 情報工学研究科 情報科学専攻 修士1年</p>
        </section>
    </>
    );
}

export default Hero;