import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import BackgroundMusic from './components/BackgroundMusic';

const TributeWebsite = () => {
    const [stage, setStage] = useState('envelope');
    const [typedText, setTypedText] = useState('');
    const [showPhotoCTA, setShowPhotoCTA] = useState(false);
    const [particles, setParticles] = useState([]);
    const [envelopeHovered, setEnvelopeHovered] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [typingSpeed] = useState(20); // Faster default speed
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);



    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // Scroll to top when stage changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [stage]);


    // Generate floating particles
    useEffect(() => {
        const newParticles = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 2,
            duration: Math.random() * 10 + 20,
            delay: Math.random() * 5,
        }));
        setParticles(newParticles);
    }, []);

    const letterLines = [
        "Dear Respected Sir,",
        "",
        "As you embark on a new chapter, we wanted to express our deepest gratitude. Your impact on our journey has been truly profound.",
        "",
        "Your guidance as our lecturer and project guide went far beyond textbooks. It was your patience, your humility, and your genuine care for our growth that shaped us most deeply.",
        "",
        "We are especially grateful for your unwavering support during our final year project. Your insights helped us achieve what we thought impossible, and winning 2nd place was a direct testament to your exceptional mentorship.",
        "",
        "Thank you for believing in us, for challenging us, and for being a mentor in the truest sense of the word.",
        "",
        "We wish you every success in your future endeavors. May your journey ahead be filled with opportunities that honor your remarkable ability to inspire and educate.",
    ];

    const fullText = letterLines.join('\n');

    const bottomRef = useRef(null);

    useEffect(() => {
        if (stage === 'letter' && typedText.length < fullText.length) {
            const timeout = setTimeout(() => {
                setTypedText(fullText.slice(0, typedText.length + 1));
            }, typingSpeed);
            return () => clearTimeout(timeout);
        } else if (stage === 'letter' && typedText.length === fullText.length) {
            setTimeout(() => setShowPhotoCTA(true), 1000);
        }
    }, [typedText, stage, fullText, typingSpeed]);

    const photos = [
        { id: 1, rotation: -3, delay: 0.3, imageUrl: "/photos/photo1.jpeg", altImageUrl: "/photos/photo1-alt.jpeg" },
        { id: 3, rotation: 0, delay: 0.5, imageUrl: "/photos/photo3.jpeg", altImageUrl: "/photos/photo3-alt.jpeg" },
        { id: 2, rotation: 3, delay: 0.7, imageUrl: "/photos/photo2.jpeg", altImageUrl: "/photos/photo2-alt.jpeg" },
    ];

    return (
        <div
            className="min-h-screen relative overflow-x-hidden font-body text-tribute-text-primary"
            style={{
                background: `
                    radial-gradient(circle at 50% 50%, rgba(224, 159, 62, 0.15) 0%, transparent 40%),
                    linear-gradient(115deg, transparent 20%, rgba(74, 4, 4, 0.4) 45%, rgba(184, 69, 0, 0.5) 50%, rgba(214, 140, 21, 0.5) 55%, rgba(74, 4, 4, 0.4) 60%, transparent 80%),
                    radial-gradient(circle at 50% 50%, #4a0404 0%, #2a0505 40%, #050505 90%)
                `,
                backgroundSize: '200% 200%',
                backgroundBlendMode: 'screen, normal, normal',
                animation: 'gradientFlow 15s ease infinite'
            }}
        >
            <style>{`
            @keyframes gradientFlow {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
        `}</style>
            {/* Animated gradient background */}
            <motion.div
                className="absolute inset-0 opacity-40"
                animate={{
                    background: [
                        'radial-gradient(circle at 30% 30%, rgba(224, 159, 62, 0.05) 0%, transparent 60%)',
                        'radial-gradient(circle at 70% 70%, rgba(128, 0, 32, 0.05) 0%, transparent 60%)',
                        'radial-gradient(circle at 30% 30%, rgba(224, 159, 62, 0.05) 0%, transparent 60%)',
                    ]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

            {/* Floating particles */}
            {particles.map(particle => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full bg-tribute-accent/20"
                    style={{
                        left: `${particle.x}% `,
                        top: `${particle.y}% `,
                        width: particle.size,
                        height: particle.size,
                    }}
                    animate={{
                        y: [0, -100, 0],
                        opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* Music toggle */}
            <BackgroundMusic />

            {/* Typing Controls */
            /* Fixed position top-right below music button, outside restricted containers */}
            <AnimatePresence>
                {stage === 'letter' && typedText.length < fullText.length && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="fixed top-24 right-5 flex flex-col items-end gap-2 z-50 pointer-events-auto"
                    >

                        <button
                            onClick={() => setTypedText(fullText)}
                            className="bg-black/20 backdrop-blur-sm border border-tribute-accent/40 text-tribute-accent hover:bg-tribute-accent/10 hover:border-tribute-accent text-sm tracking-widest px-4 py-2 rounded-full transition-all shadow-lg font-heading italic min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-tribute-accent"
                            aria-label="Skip typing animation"
                        >
                            Skip to End ⏭
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
                {/* Stage 1: Envelope with enhanced animations */}
                {stage === 'envelope' ? (
                    <motion.div
                        key="envelope"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.8 }}
                        className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10"
                    >
                        {/* Glowing orb behind envelope */}
                        <motion.div
                            className="absolute w-64 h-64 rounded-full bg-tribute-accent/20 blur-3xl"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.5, 0.3],
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                        />

                        <motion.div
                            className="relative"
                            onHoverStart={() => setEnvelopeHovered(true)}
                            onHoverEnd={() => setEnvelopeHovered(false)}
                            whileHover={{ scale: 1.05, y: -8, rotate: 2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setStage('letter')}
                            style={{ cursor: 'pointer' }}
                            role="button"
                            tabIndex={0}
                            aria-label="Open envelope"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    setStage('letter');
                                }
                            }}
                        >
                            {/* Sparkle effects */}
                            <AnimatePresence>
                                {envelopeHovered && (
                                    <>
                                        {[...Array(30)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="absolute w-2 h-2 bg-tribute-accent rounded-full blur-[1px]"
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{
                                                    opacity: [0, 1, 0],
                                                    scale: [0, 1.5, 0],
                                                    x: [0, (Math.random() - 0.5) * 200],
                                                    y: [0, (Math.random() - 0.5) * 200],
                                                }}
                                                transition={{ duration: 1.2, delay: i * 0.05 }}
                                                style={{
                                                    left: '50%',
                                                    top: '50%',
                                                    boxShadow: '0 0 10px rgba(242, 216, 167, 0.8)'
                                                }}
                                            />
                                        ))}
                                    </>
                                )}
                            </AnimatePresence>

                            <motion.svg
                                width="140"
                                height="100"
                                viewBox="0 0 140 100"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="relative z-10 transition-all duration-500"
                                style={{
                                    filter: envelopeHovered ? 'drop-shadow(0 0 30px rgba(212, 175, 55, 0.6))' : 'drop-shadow(0 20px 25px -5px rgba(0, 0, 0, 0.1))'
                                }}
                            >
                                <defs>
                                    <linearGradient id="envelopeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#F2D8A7" />
                                        <stop offset="100%" stopColor="#E5C285" />
                                    </linearGradient>
                                    <filter id="glow">
                                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>
                                <motion.rect
                                    x="10"
                                    y="15"
                                    width="120"
                                    height="70"
                                    fill="url(#envelopeGrad)"
                                    stroke="#8C4A1F"
                                    strokeWidth="2"
                                    filter="url(#glow)"
                                    animate={envelopeHovered ? { fill: "#F2D8A7" } : {}}
                                />
                                <motion.path
                                    d="M10 15 L70 55 L130 15"
                                    stroke="#5A2E14"
                                    strokeWidth="2"
                                    fill="none"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 2, delay: 0.5 }}
                                />
                                <motion.path
                                    d="M10 15 L70 55 L130 15 L130 85 L10 85 Z"
                                    fill="#E5C285"
                                    opacity="0.4"
                                    animate={envelopeHovered ? { opacity: 0.6 } : { opacity: 0.4 }}
                                />
                                <motion.circle
                                    cx="70"
                                    cy="50"
                                    r="15"
                                    fill="#8C4A1F"
                                    opacity="0.3"
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            </motion.svg>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="mt-12 text-center space-y-4"
                        >
                            <motion.p
                                className="text-tribute-accent text-sm md:text-base font-light tracking-[0.25em] uppercase font-body"
                                animate={{ opacity: [0.6, 1, 0.6] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                A Token of Gratitude
                            </motion.p>
                            <motion.p
                                className="text-tribute-text-secondary text-2xl md:text-3xl lg:text-4xl font-heading mb-2 tracking-wide"
                                style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
                            >
                                For Respected Sir
                            </motion.p>
                            <motion.p
                                className="text-tribute-text-primary text-3xl md:text-5xl lg:text-6xl font-heading font-bold tracking-wider"
                                style={{ textShadow: '0 4px 20px rgba(212, 175, 55, 0.4)' }}
                            >
                                Mr. Adarsh Karanth
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.5 }}
                                className="text-tribute-accent/60 text-sm mt-6 italic font-body animate-pulse"
                            >
                                Click the envelope to begin!
                            </motion.p>
                        </motion.div>
                    </motion.div>
                ) : stage === 'letter' ? (
                    <motion.div
                        key="letter"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="min-h-screen flex items-center justify-center p-4 md:p-8 relative z-10 py-16"
                    >
                        <motion.div
                            className="max-w-4xl w-full relative"
                            initial={{ rotateX: 90, opacity: 0 }}
                            animate={{ rotateX: 0, opacity: 1 }}
                            transition={{ duration: 1, type: "spring" }}
                        >
                            {/* Premium Dark Glass Container */}
                            <div className="relative rounded-sm overflow-hidden"
                                style={{
                                    background: 'rgba(15, 7, 7, 0.4)',
                                    backdropFilter: 'blur(16px)',
                                    border: '1px solid rgba(184, 115, 51, 0.2)', // Copper tint
                                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
                                }}
                            >
                                {/* Paper texture overlay & Burnt Edge Effect */}
                                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")` }} />
                                <div className="absolute inset-0 pointer-events-none" style={{
                                    background: 'radial-gradient(circle at center, transparent 90%, rgba(139, 92, 46, 0.2) 100%)'
                                }} />


                                <div className="p-6 md:p-12 lg:p-16 relative z-10">
                                    {/* Wax Seal - Internal Right Aligned */}
                                    <motion.div
                                        className="absolute top-4 right-4 md:top-20 md:right-16 w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#4A0404] via-[#3E0303] to-[#200101] flex items-center justify-center border border-[#B87333]/40 z-20 shadow-2xl"
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ delay: 0.5, type: "spring" }}
                                        style={{ boxShadow: '0 8px 25px rgba(0,0,0,0.6)' }}
                                    >
                                        <span className="text-tribute-accent text-base md:text-lg font-heading font-bold">AK</span>
                                    </motion.div>

                                    {/* Decorative header */}
                                    <div className="text-center mb-6 md:mb-10 relative">
                                        <div className="w-12 md:w-16 h-1 bg-gradient-to-r from-transparent via-tribute-accent to-transparent mx-auto mb-6 md:mb-8" />
                                    </div>

                                    <div className="relative z-10">
                                        <pre className="font-body text-tribute-text-ink text-base md:text-lg lg:text-xl leading-relaxed md:leading-loose whitespace-pre-wrap font-light tracking-wide"
                                            style={{
                                                lineHeight: '1.8'
                                            }}
                                        >
                                            {typedText}
                                            <motion.span
                                                className="inline-block w-0.5 h-6 bg-tribute-gold ml-1 align-middle"
                                                animate={{ opacity: [1, 0, 1] }}
                                                transition={{ duration: 0.8, repeat: Infinity }}
                                            />
                                            {/* User Signature */}
                                            {typedText.length === fullText.length && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.5 }}
                                                    className="mt-8 text-right pr-4"
                                                >
                                                    <p className="font-body font-light tracking-wide text-tribute-text-ink/80 text-lg">Yours Sincerely,</p>
                                                    <p className="font-heading italic text-tribute-text-ink text-xl md:text-2xl mt-2 tracking-normal">Monisha Aradhya CM</p>
                                                </motion.div>
                                            )}
                                            <div ref={bottomRef} />
                                        </pre>



                                        <AnimatePresence>
                                            {showPhotoCTA && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="mt-16 text-center"
                                                >
                                                    <motion.button
                                                        onClick={() => setStage('photos')}
                                                        className="relative text-tribute-accent hover:text-tribute-text-primary text-base tracking-wider pb-2 px-8 py-3 group font-heading italic focus-visible:ring-2 focus-visible:ring-tribute-accent rounded-lg"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        aria-label="View photo memories"
                                                    >
                                                        <span className="relative z-10 flex items-center gap-2">
                                                            A few memories we cherish
                                                            <motion.span
                                                                animate={{ x: [0, 5, 0] }}
                                                                transition={{ duration: 1.5, repeat: Infinity }}
                                                            >
                                                                →
                                                            </motion.span>
                                                        </span>
                                                        <div className="absolute inset-0 bg-tribute-accent/10 group-hover:bg-tribute-accent/20 transition-colors rounded-lg" />
                                                    </motion.button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                                {/* Corner Decorations */}
                                <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-tribute-accent/30 rounded-tl-xl" />
                                <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-tribute-accent/30 rounded-tr-xl" />
                                <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-tribute-accent/30 rounded-bl-xl" />
                                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-tribute-accent/30 rounded-br-xl" />
                            </div>
                        </motion.div>
                    </motion.div>
                ) : stage === 'photos' ? (
                    <motion.div
                        key="photos"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 relative z-10 py-20"
                    >
                        <motion.div
                            className="max-w-6xl w-full text-center"
                            initial={{ y: 50 }}
                            animate={{ y: 0 }}
                        >
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.6 }}
                                transition={{ delay: 1 }}
                                className="text-tribute-text-dim text-sm font-montserrat italic mb-8"
                                style={{ textShadow: '0 0 20px rgba(255, 255, 255, 0.2)' }}
                            >
                                (Hover or tap on the cards to reveal hidden memories)
                            </motion.p>

                            {/* Polaroid gallery - Centered Trio */}
                            <div className="flex flex-wrap justify-center gap-8 md:gap-10 lg:gap-12 mb-8 max-w-6xl mx-auto px-4">
                                {photos.map((photo, index) => (
                                    <motion.div
                                        key={photo.id}
                                        initial={{ opacity: 0, scale: 0.9, y: 100, rotate: photo.rotation + (index % 2 === 0 ? -10 : 10) }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                            y: 0,
                                            rotate: photo.rotation,
                                        }}
                                        transition={{
                                            duration: 1.2,
                                            ease: [0.25, 0.46, 0.45, 0.94],
                                            delay: 0.5 + (index * 0.4)
                                        }}
                                        className="bg-neutral-100 p-4 pb-16 relative group w-full max-w-[300px] cursor-pointer"
                                        style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
                                        whileHover={{
                                            scale: 1.05,
                                            rotate: 0,
                                            zIndex: 10,
                                            boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
                                            transition: { duration: 0.3 }
                                        }}
                                        onClick={() => setSelectedPhoto(photo)}
                                        role="button"
                                        tabIndex={0}
                                        aria-label={`View memory ${index + 1}`}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                setSelectedPhoto(photo);
                                            }
                                        }}
                                    >
                                        {/* Tape effect */}
                                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-24 h-8 bg-white/40 backdrop-blur-sm shadow-sm rotate-1 z-20"
                                        />

                                        <div className="bg-neutral-200 w-full relative -z-0">
                                            {photo.imageUrl ? (
                                                <div className="relative w-full">
                                                    {/* Main Photo (Visible by default) */}
                                                    <img
                                                        src={photo.imageUrl}
                                                        alt={`Memory ${photo.id}`}
                                                        className="w-full h-auto shadow-inner relative z-10 transition-opacity duration-700 ease-in-out group-hover:opacity-0"
                                                    />

                                                    {/* Alternate Photo (Revealed on hover) */}
                                                    <img
                                                        src={photo.altImageUrl}
                                                        alt={`Memory ${photo.id} Alternate`}
                                                        className="absolute inset-0 w-full h-full object-cover shadow-inner z-20 opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
                                                    />

                                                    {/* Hint tooltip */}
                                                    <div className="absolute bottom-2 right-2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 bg-[#4A4A4A] text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm pointer-events-none font-montserrat">
                                                        Memory
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center justify-center p-12">
                                                    <p className="text-neutral-400 text-sm font-montserrat">No Image</p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="absolute bottom-4 left-0 right-0 text-center px-2">
                                            <p className="text-[#4A4A4A] text-[15px] font-caveat font-semibold">
                                                {index === 0 && "A moment of guidance"}
                                                {index === 1 && "Memories cherished"}
                                                {index === 2 && "Shared moments of wisdom"}
                                            </p>
                                        </div>

                                        {/* Hover glow */}
                                        <div className="absolute inset-0 bg-tribute-gold/0 group-hover:bg-tribute-gold/10 transition-all duration-300 pointer-events-none" />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Subtle Team Signature */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.5 }}
                                transition={{ delay: 2.5, duration: 2 }}
                                className="text-center mb-16 text-tribute-text-dim text-[11px] uppercase tracking-[0.2em] font-montserrat"
                            >
                                Irfan • Monisha • Mohan • Dheemanth
                            </motion.div>

                            {/* Closing section with enhanced design */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.5 }}
                                className="text-center space-y-6 mt-20"
                            >
                                <div className="w-[120px] h-0.5 bg-tribute-accent/50 mx-auto" />

                                <motion.p
                                    className="text-tribute-text-primary font-playfair text-xl md:text-2xl italic px-4 leading-relaxed"
                                    style={{ textShadow: '0 0 20px rgba(212, 175, 55, 0.3)' }}
                                >
                                    "Your influence is not just in what we learned, but in who we have become."
                                </motion.p>

                                <motion.p
                                    className="text-tribute-accent italic mt-10 font-playfair text-[22px]"
                                    animate={{ opacity: [0.7, 1, 0.7] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                >
                                    With lasting respect and gratitude.
                                </motion.p>

                                <div className="w-[120px] h-0.5 bg-tribute-accent/50 mx-auto mt-6" />
                            </motion.div>

                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 2 }}
                                onClick={() => {
                                    setStage('envelope');
                                    setTypedText('');
                                    setShowPhotoCTA(false);
                                }}
                                className="mx-auto block mt-16 text-tribute-accent/70 hover:text-tribute-accent text-sm tracking-wider transition-colors px-6 py-2 border border-tribute-accent/30 hover:border-tribute-accent/50 rounded-full backdrop-blur-sm font-montserrat min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-tribute-accent"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Return to start"
                            >
                                ← Return to beginning
                            </motion.button>


                        </motion.div>
                    </motion.div>
                ) : null}


            </AnimatePresence>

            {/* Full Screen Photo Modal */}
            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedPhoto(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
                        aria-modal="true"
                        role="dialog"
                    >
                        <motion.button
                            className="absolute top-4 right-4 text-white/50 hover:text-white p-2 min-w-[44px] min-h-[44px]"
                            onClick={() => setSelectedPhoto(null)}
                            aria-label="Close modal"
                        >
                            ✕
                        </motion.button>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="max-w-5xl max-h-[90vh] relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedPhoto.altImageUrl}
                                alt="Memory Full Size"
                                className="max-h-[80vh] w-auto object-contain rounded-sm shadow-2xl"
                            />
                            <p className="text-white/80 text-center mt-4 font-caveat text-xl">
                                {selectedPhoto.id === 1 && "A moment of guidance"}
                                {selectedPhoto.id === 2 && "Shared moments of wisdom"}
                                {selectedPhoto.id === 3 && "Memories cherished"}
                                {selectedPhoto.id === 4 && "Forever grateful"}
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div >
    );
};

export default TributeWebsite;