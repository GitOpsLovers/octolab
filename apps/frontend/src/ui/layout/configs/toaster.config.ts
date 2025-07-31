/**
 * Toaster configuration
 */
export const toasterConfig = {
    style: {
        background: 'var(--surface)',
        color: 'var(--color-text)',
        border: '1px solid var(--border)',
        fontFamily: 'var(--font-poppins), sans-serif',
        fontSize: '1rem',
        padding: '1rem 1.5rem',
        minWidth: '280px',
    },
    success: {
        style: {
            background: 'var(--primary)',
            color: 'var(--color-white)',
            border: '1px solid var(--color-primary)',
            fontSize: '1rem',
            padding: '1rem 1.5rem',
            minWidth: '280px',
        },
        iconTheme: {
            primary: 'var(--color-white)',
            secondary: 'var(--surface)',
        },
    },
    error: {
        style: {
            background: 'var(--danger)',
            color: 'var(--color-white)',
            border: '1px solid var(--color-danger)',
            fontSize: '1rem',
            padding: '1rem 1.5rem',
            minWidth: '280px',
        },
        iconTheme: {
            primary: 'var(--color-white)',
            secondary: 'var(--surface)',
        },
    },
};
