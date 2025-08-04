import { useEffect, useState } from 'react';

/**
 * Hook to determine if the current device is desktop based on screen width.
 */
export function useIsDesktop(): boolean | null {
    const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

    useEffect(() => {
        const check = () => {
            setIsDesktop(window.matchMedia('(min-width: 768px)').matches);
        };
        check();

        window.addEventListener('resize', check);
        return () => {
            window.removeEventListener('resize', check);
        };
    }, []);

    return isDesktop;
}
