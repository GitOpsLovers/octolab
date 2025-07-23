'use client';

import { useCookies } from 'next-client-cookies';
import { useEffect, useState } from 'react';
import { HiOutlineBeaker } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';

/**
 * Beta banner component
 */
export function BetaBanner() {
    const cookies = useCookies();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const hidden = cookies.get('octolab_hide_beta_banner');
        if (hidden !== 'true') {
            setVisible(true);
        }
    }, [cookies]);

    const handleClose = () => {
        setVisible(false);
        cookies.set('octolab_hide_beta_banner', 'true', { expires: 30 });
    };

    if (!visible) return null;

    return (
        <div className="bg-primary text-background px-4 py-2 flex items-center justify-between text-sm font-medium">
            <div className="flex items-center gap-2">
                <HiOutlineBeaker className="text-white w-5 h-5" />
                <span>OctoLab is currently in beta phase for product validation. New features coming soon!</span>
            </div>
            <button onClick={handleClose} className="text-background hover:text-background/70 transition cursor-pointer" aria-label="Close banner">
                <IoClose size={18} />
            </button>
        </div>
    );
}
