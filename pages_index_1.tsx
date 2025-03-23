import { useState, useEffect, useCallback } from 'react';

// --- Data for Principles ---
interface Principle {
  id: number;
  title: string;
  description: string;
  page: string;
  details: string;
  iconGradient: string;
}

const principles: Principle[] = [
  { id: 1, title: 'Ethical Foundation', description: 'Integrity & Transparency', page: '/ethics', details: 'Explore how our operations are built on a strong ethical framework, ensuring fairness and trust in every interaction.', iconGradient: 'from-purple-500/20 to-fuchsia-500/20' },
  { id: 2, title: 'Privacy by Design', description: 'Your Data, Your Control', page: '/privacy', details: 'Discover our commitment to embedding privacy in every solution, safeguarding your information from the ground up.', iconGradient: 'from-blue-500/20 to-cyan-500/20' },
  { id: 3, title: 'Ironclad Security', description: 'Multi-Layered Protection', page: '/security', details: 'Learn about the robust, cutting-edge security measures we implement to protect your valuable digital assets.', iconGradient: 'from-teal-500/20 to-emerald-500/20' },
];

// --- Icon Placeholder ---
const IconPlaceholder = ({ className = "w-8 h-8", gradient = "from-purple-500/20 to-purple-800/20", innerScale = "group-hover:scale-90", innerOpacity = "group-hover:opacity-100" }: { className?: string, gradient?: string, innerScale?: string, innerOpacity?: string }) => (
    <div className={`relative flex-shrink-0 ${className}`}> 
        <div className={`absolute inset-0 ${gradient} border border-purple-400/30 rounded-full transition-all duration-500 ease-out group-hover:border-purple-300 group-hover:scale-110 group-hover:rotate-[10deg]`}></div>
        <div className={`absolute inset-1.5 bg-gray-950 rounded-full`}></div>
        <div className={`absolute inset-2.5 bg-purple-600/40 rounded-full transition-all duration-300 ease-out scale-50 opacity-0 blur-sm ${innerScale} ${innerOpacity}`}></div>
    </div>
);

// --- Typing Effect Hook ---
const useTypingEffect = (words: string[], typeSpeed = 80, deleteSpeed = 40, delay = 1800) => {
    const [taglineIndex, setTaglineIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        if (!words || words.length === 0) return;
        const currentWord = words[taglineIndex];
        let timeoutId: NodeJS.Timeout;

        if (isDeleting) {
            if (subIndex > 0) {
                timeoutId = setTimeout(() => {
                    setDisplayedText(currentWord.substring(0, subIndex - 1));
                    setSubIndex(subIndex - 1);
                }, deleteSpeed);
            } else {
                setIsDeleting(false);
                setTaglineIndex((prev) => (prev + 1) % words.length);
            }
        } else {
            if (subIndex < currentWord.length) {
                timeoutId = setTimeout(() => {
                    setDisplayedText(currentWord.substring(0, subIndex + 1));
                    setSubIndex(subIndex + 1);
                }, typeSpeed);
            } else {
                timeoutId = setTimeout(() => setIsDeleting(true), delay);
            }
        }
        return () => clearTimeout(timeoutId);
    }, [subIndex, isDeleting, taglineIndex, words, typeSpeed, deleteSpeed, delay]);

    return displayedText;
};

// --- Blinking Cursor ---
const BlinkingCursor = () => <span className="inline-block w-0.5 h-5 bg-purple-400 animate-blink ml-1"></span>;

// --- Main Component ---
const taglines = [
    "Unlock Your Virtual Freedom.",
    "Ethical Tech for a Secure Future.",
    "Privacy-Powered Operations.",
    "Your Digital World, Reimagined."
];

interface Tool {
    t: string;
    i: string; // Placeholder for icon type
    gradient: string;
}

const empowermentTools: Tool[] = [
    { t: "Secure Infra", i: "shield", gradient: "from-purple-600/30 to-fuchsia-700/30" },
    { t: "Private Comms", i: "lock", gradient: "from-blue-600/30 to-cyan-700/30" },
    { t: "Ethical Data", i: "leaf", gradient: "from-teal-600/30 to-emerald-700/30" },
    { t: "Open Solutions", i: "code", gradient: "from-indigo-600/30 to-violet-700/30" }
];

export default function MakerTooLandingPage() {
    const displayedTagline = useTypingEffect(taglines);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedPrinciple, setSelectedPrinciple] = useState<Principle | null>(null);
    const [popupClosing, setPopupClosing] = useState(false);

    const openPopup = (principle: Principle) => {
        setSelectedPrinciple(principle);
        setPopupClosing(false);
        setIsPopupOpen(true);
    };

    const closePopup = useCallback(() => {
        setPopupClosing(true);
        setTimeout(() => {
            setIsPopupOpen(false);
            setSelectedPrinciple(null);
        }, 350); // Match pop-up animation duration
    }, []);

    // Embedded CSS for animations
    const embeddedStyles = `
        @keyframes slow-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes subtle-pulse { 0%, 100% { opacity: 0.7; transform: scale(1); } 50% { opacity: 1; transform: scale(1.03); } }
        @keyframes subtle-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes blink { from, to { opacity: 1 } 50% { opacity: 0 } }
        @keyframes tool-icon-float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-3px) rotate(5deg); }
        }
        @keyframes tool-glow {
            0%, 100% { box-shadow: 0 0 15px -5px var(--glow-color-start); }
            50% { box-shadow: 0 0 25px 0px var(--glow-color-end); }
        }
        .animate-slow-spin { animation: slow-spin 35s linear infinite; }
        .animate-subtle-pulse { animation: subtle-pulse 5s ease-in-out infinite; }
        .animate-subtle-float { animation: subtle-float 6s ease-in-out infinite; }
        .animate-blink { animation: blink 1s step-end infinite; }
        .group:hover .animate-tool-icon-float { animation: tool-icon-float 1.5s ease-in-out infinite; }
        .animate-tool-glow {
            --glow-color-start: rgba(192, 132, 252, 0.2);
            --glow-color-end: rgba(192, 132, 252, 0.5);
            animation: tool-glow 2.5s ease-in-out infinite;
        }
        .tool-blue { --glow-color-start: rgba(96, 165, 250, 0.2); --glow-color-end: rgba(96, 165, 250, 0.5); }
        .tool-teal { --glow-color-start: rgba(45, 212, 191, 0.2); --glow-color-end: rgba(45, 212, 191, 0.5); }
        .tool-indigo { --glow-color-start: rgba(129, 140, 248, 0.2); --glow-color-end: rgba(129, 140, 248, 0.5); }
    `;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 font-sans">
            <style>{embeddedStyles}</style>
            {/* Mobile Frame */}
            <div className="relative w-[375px] h-[812px] bg-black rounded-[40px] shadow-2xl shadow-purple-900/50 overflow-hidden border-4 border-gray-800 flex flex-col">
                <div className="flex-grow overflow-y-auto no-scrollbar text-white px-5 pt-6">
                    {/* Header/Hero */}
                    <header className="pt-8 pb-10 text-center min-h-[180px] flex flex-col justify-center">
                        <h1 className="text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">
                            MakerToo
                        </h1>
                        <div className="h-6 text-purple-300/90 text-base font-medium leading-relaxed whitespace-nowrap overflow-hidden text-ellipsis mb-3">
                            <span>{displayedTagline}</span>
                            <BlinkingCursor />
                        </div>
                        <p className="text-gray-400 text-sm max-w-xs mx-auto leading-relaxed">
                            We empower your business with ethical, secure, and private operational solutions, giving you true <span className="text-purple-400 font-medium">Virtual Freedom</span>.
                        </p>
                    </header>

                    {/* "Virtual Freedom" Visual Section */}
                    <section className="my-10 flex flex-col items-center text-center group">
                        <div className="relative w-48 h-48 mb-5">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-700 via-fuchsia-800 to-purple-900 blur-xl opacity-50 animate-subtle-pulse"></div>
                            <div className="absolute inset-8 rounded-full border-2 border-purple-500/30 animate-slow-spin opacity-60"></div>
                            <div className="absolute inset-12 rounded-full bg-gradient-to-tl from-gray-900 to-black opacity-80 flex items-center justify-center animate-subtle-float">
                                <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-fuchsia-400 transform group-hover:scale-110 transition-transform duration-500">VF</span>
                            </div>
                        </div>
                        <h2 className="text-2xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">Experience Virtual Freedom</h2>
                        <p className="text-gray-400 text-sm max-w-[280px] mx-auto leading-relaxed">Operate, connect, and grow without compromise. Your digital space, secured and private, by design.</p>
                    </section>

                    {/* Core Principles */}
                    <section className="mb-10">
                        <h2 className="text-xl font-semibold mb-5 text-center text-purple-300/80">Our Pillars</h2>
                        <div className="space-y-3.5">
                            {principles.map((principle) => (
                                <button
                                    key={principle.id}
                                    onClick={() => openPopup(principle)}
                                    className="group w-full bg-gradient-to-br from-gray-900/70 to-gray-800/50 p-3.5 rounded-xl shadow-lg border border-gray-700/60 flex items-center space-x-3 transition-all duration-300 ease-out hover:bg-gray-800/80 hover:shadow-xl hover:shadow-purple-700/20 hover:border-purple-600/50 hover:scale-[1.02] text-left focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
                                >
                                    <IconPlaceholder className="w-8 h-8" gradient={principle.iconGradient} />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-sm text-white">{principle.title}</h3>
                                        <p className="text-gray-400 text-xs transition-colors duration-300 group-hover:text-gray-300">{principle.description}</p>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-400/60 group-hover:text-purple-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* Empowerment Tools */}
                    <section className="mb-10">
                        <h2 className="text-xl font-semibold mb-5 text-center text-purple-300/80">Empowerment Tools</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {empowermentTools.map((tool, index) => (
                            <div key={tool.t}
                                className={`group relative bg-gray-800/60 p-4 rounded-lg border border-gray-700/50 text-center transition-all duration-300 hover:bg-gray-700/70 hover:border-purple-600/40 hover:-translate-y-1
                                    ${index === 0 ? 'animate-tool-glow' : ''}
                                    ${index === 1 ? 'animate-tool-glow tool-blue' : ''}
                                    ${index === 2 ? 'animate-tool-glow tool-teal' : ''}
                                    ${index === 3 ? 'animate-tool-glow tool-indigo' : ''}
                                `}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="flex justify-center mb-2">
                                    <div className="animate-tool-icon-float">
                                        <IconPlaceholder className="w-9 h-9" gradient={tool.gradient} innerScale="group-hover:scale-100" innerOpacity="group-hover:opacity-70" />
                                    </div>
                                </div>
                                <p className="text-xs font-medium text-gray-300 group-hover:text-white">{tool.t}</p>
                            </div>
                            ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-4 text-center">Leveraging <span className="text-purple-400/80">Open Source</span> for transparency and trust.</p>
                    </section>

                    {/* Testimonial Placeholder */}
                    <section className="mb-12 px-4">
                        <div className="border-l-4 border-purple-600 pl-4 py-2 bg-gray-800/40 rounded-r-lg">
                            <p className="text-sm italic text-gray-300">"MakerToo transformed how we operate, giving us peace of mind about our data and ethics."</p>
                            <p className="text-xs text-gray-500 mt-1">- A Valued Partner (Placeholder)</p>
                        </div>
                    </section>

                    {/* Immersive Call to Action */}
                    <section className="text-center pb-8 pt-0">
                        <button className="relative inline-flex items-center justify-center px-10 py-3.5 overflow-hidden font-bold text-white transition-all duration-500 ease-out bg-gradient-to-r from-purple-600 to-fuchsia-700 rounded-lg shadow-lg group hover:shadow-purple-500/60 focus:outline-none focus:ring-4 focus:ring-purple-400/50 focus:ring-offset-2 focus:ring-offset-black active:scale-95">
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-500 via-fuchsia-600 to-purple-800 opacity-0 transition-opacity duration-500 group-hover:opacity-100 scale-150 group-hover:scale-100"></span>
                            <span className="relative text-base transition-transform duration-300 group-hover:scale-105">
                                Claim Your Freedom
                            </span>
                            <span className="absolute top-0 left-0 w-full h-full transition-all duration-500 ease-out transform -translate-x-full bg-white opacity-10 group-hover:translate-x-full group-hover:skew-x-12"></span>
                        </button>
                    </section>

                </div>
                {/* Footer Area */}
                <footer className="p-3.5 text-center text-xs text-gray-600 border-t border-gray-800/50">
                    © {new Date().getFullYear()} MakerToo. Ethical Tech. Virtual Freedom.
                </footer>

                {/* --- Innovative Pop-up --- */}
                <div
                    className={`absolute inset-0 z-50 flex items-end justify-center transition-opacity duration-300 ease-out ${isPopupOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    aria-labelledby="popup-title"
                    role="dialog"
                    aria-modal="true"
                >
                    {/* Backdrop */}
                    <div
                        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/70 to-black/50 backdrop-blur-lg transition-opacity duration-300 ease-out ${isPopupOpen && !popupClosing ? 'opacity-100' : 'opacity-0'}`}
                        onClick={closePopup}
                    ></div>

                    {/* Pop-up Content */}
                    {selectedPrinciple && (
                        <div
                            className={`relative bg-gradient-to-b from-gray-900/90 to-black/95 border-t-2 border-purple-500/80 rounded-t-3xl shadow-2xl shadow-purple-900/50 w-full max-h-[70vh] overflow-y-auto no-scrollbar p-6 pt-8 transition-transform duration-300 ease-out ${isPopupOpen && !popupClosing ? 'translate-y-0' : 'translate-y-full'}`}
                        >
                            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gray-600 rounded-full"></div>
                            <div className="flex items-center mb-5 space-x-3">
                                <IconPlaceholder className="w-10 h-10" gradient={selectedPrinciple.iconGradient} innerScale="scale-90" innerOpacity="opacity-80" />
                                <h3 id="popup-title" className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-fuchsia-400">{selectedPrinciple.title}</h3>
                            </div>
                            <p className="text-gray-300 text-sm mb-6 leading-relaxed">{selectedPrinciple.details}</p>
                            <div className="flex flex-col space-y-3">
                                <button
                                    onClick={closePopup} // Simulate navigation
                                    className="w-full relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-medium text-purple-200 transition-all duration-300 bg-gradient-to-r from-purple-600 to-fuchsia-700 rounded-lg shadow-md group hover:from-purple-500 hover:to-fuchsia-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 active:scale-95"
                                >
                                    <span className="relative text-sm">Explore {selectedPrinciple.page}</span>
                                    <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white/20 rounded-full group-hover:w-24 group-hover:h-24 opacity-10"></span>
                                </button>
                                <button
                                    onClick={closePopup}
                                    className="w-full px-6 py-2.5 text-xs font-medium text-gray-400 bg-gray-700/60 rounded-lg hover:bg-gray-600/80 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 active:scale-95"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}