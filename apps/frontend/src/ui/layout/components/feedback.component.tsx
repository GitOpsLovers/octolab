'use client';

import { ReactNode } from 'react';
import { FaCommentDots } from 'react-icons/fa';

/**
 * Feedback button component
 */
export function Feedback(): ReactNode {
    return (
        <a
            href="https://octolab.featurebase.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-4 right-4 bg-primary text-white font-semibold rounded-full shadow-lg hover:bg-primary-hover transition cursor-pointer flex items-center w-12 h-12 justify-center md:w-auto md:h-auto md:px-4 md:py-2 md:gap-2 md:justify-start z-50"
        >
            <FaCommentDots className="w-5 h-5" />
            <span className="hidden md:inline">Feedback</span>{' '}
        </a>
    );
}
