"use client";
import { useState, useEffect } from 'react';

function getWindowDimensions() {
    if (typeof window !== 'undefined') {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }

    // Default values when window is not defined
    return {
        width: 1000, // You can set this to a default value
        height: 1000 // You can set this to a default value
    };
}
export function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}