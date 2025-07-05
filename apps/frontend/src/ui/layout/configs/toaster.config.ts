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
            background: 'var(--surface)',
            color: 'var(--color-success)',
            border: '1px solid var(--color-success)',
            fontSize: '1rem',
            padding: '1rem 1.5rem',
            minWidth: '280px',
        },
        iconTheme: {
            primary: 'var(--color-success)',
            secondary: 'var(--surface)',
        },
    },
    error: {
        style: {
            background: 'var(--surface)',
            color: 'var(--color-danger)',
            border: '1px solid var(--color-danger)',
            fontSize: '1rem',
            padding: '1rem 1.5rem',
            minWidth: '280px',
        },
        iconTheme: {
            primary: 'var(--color-danger)',
            secondary: 'var(--surface)',
        },
    },
};
