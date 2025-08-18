import { ReactNode } from 'react';

// usa tu helper
import { Profile } from '@ui/user/components/profile.component';

export default function ProfilPage(): ReactNode {
    return (
        <main className="p-8 max-w-3xl mx-auto">
            <Profile />
        </main>
    );
}
