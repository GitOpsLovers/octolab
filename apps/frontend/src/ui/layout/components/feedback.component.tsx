import { ReactNode } from 'react';
import { FaCommentDots } from 'react-icons/fa';

/**
 * Feedback component
 */
export function Feedback(): ReactNode {
    return (
        <a
            href="https://octolab.featurebase.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-4 right-4 bg-primary text-white px-4 py-2 font-semibold rounded-full flex items-center gap-2 shadow-lg hover:bg-primary-hover transition cursor-pointer"
        >
            <FaCommentDots className="w-5 h-5" />
            Feedback
        </a>
    );
}
