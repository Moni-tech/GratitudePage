import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const BackgroundMusic = () => {
    const [isPlaying, setIsPlaying] = useState(true);
    const audioRef = useRef(null);

    useEffect(() => {
        // Initialize audio object
        const audio = new Audio('/music/tribute-song.mpeg');
        audio.loop = true;
        audio.volume = 0.25; // Set volume to 25% for subtle background
        audioRef.current = audio;

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const playAudio = async () => {
            try {
                await audio.play();
                setIsPlaying(true);
            } catch (err) {
                console.log("Autoplay blocked, waiting for interaction");
                setIsPlaying(false);
            }
        };

        if (isPlaying) {
            playAudio();
        } else {
            audio.pause();
        }

        // Add one-time interaction listener to start music if autoplay blocked
        const handleInteraction = () => {
            if (audio.paused && isPlaying) {
                playAudio();
            }
        };

        window.addEventListener('click', handleInteraction, { once: true });
        window.addEventListener('keydown', handleInteraction, { once: true });

        return () => {
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
        };
    }, [isPlaying]);

    return (
        <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className="fixed top-6 right-6 z-50 w-12 h-12 rounded-full bg-tribute-bg-dark/60 backdrop-blur-md border border-tribute-accent/30 flex items-center justify-center hover:bg-tribute-bg-light/80 transition-all group"
            aria-label={isPlaying ? "Pause Music" : "Play Music"}
        >
            <span className="text-tribute-accent text-xl" role="img" aria-hidden="true">
                {isPlaying ? '🔊' : '🔇'}
            </span>
            <span className="absolute right-14 bg-black/80 text-tribute-accent text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {isPlaying ? 'Music On' : 'Music Off'}
            </span>
        </motion.button>
    );
};

export default BackgroundMusic;
