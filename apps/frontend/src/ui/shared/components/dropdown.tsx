'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
// eslint-disable-next-line import/no-named-as-default
import clsx from 'clsx';
import { ReactNode } from 'react';

export function Dropdown({
    children,
    open,
    onOpenChange,
    modal = false, // 👈 por defecto NO modal
}: {
    children: ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    modal?: boolean;
}) {
    return (
        <DropdownMenu.Root open={open} onOpenChange={onOpenChange} modal={modal}>
            {children}
        </DropdownMenu.Root>
    );
}

export function DropdownTrigger({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <DropdownMenu.Trigger asChild>
            <button type="button" className={clsx('inline-flex items-center justify-center focus:outline-none', className)} aria-label="Open user menu">
                {children}
            </button>
        </DropdownMenu.Trigger>
    );
}

export function DropdownContent({
    children,
    align = 'end',
    sideOffset = 8,
    className,
}: {
    children: ReactNode;
    align?: 'start' | 'center' | 'end';
    sideOffset?: number;
    className?: string;
}) {
    return (
        <DropdownMenu.Portal>
            <DropdownMenu.Content
                align={align}
                sideOffset={sideOffset}
                className={clsx(
                    'min-w-44 rounded-sm border border-border bg-surface shadow-lg p-1',
                    'data-[side=top]:animate-in data-[side=top]:fade-in-0 data-[side=top]:slide-in-from-bottom-2',
                    'data-[side=bottom]:animate-in data-[side=bottom]:fade-in-0 data-[side=bottom]:slide-in-from-top-2',
                    className,
                )}
            >
                {children}
            </DropdownMenu.Content>
        </DropdownMenu.Portal>
    );
}

export function DropdownItem({
    children,
    onSelect,
    href,
    className,
    'data-umami-event': umami,
}: {
    children: ReactNode;
    onSelect?: (event: Event) => void;
    href?: string;
    className?: string;
    'data-umami-event'?: string;
}) {
    const base = 'block w-full text-left px-3 py-2 text-text hover:text-primary focus:text-primary cursor-pointer outline-none select-none text-sm transition-colors';

    if (href) {
        // Link como Item
        return (
            <DropdownMenu.Item asChild>
                <a href={href} className={clsx(base, className)} data-umami-event={umami}>
                    {children}
                </a>
            </DropdownMenu.Item>
        );
    }

    return (
        <DropdownMenu.Item
            onSelect={(e) => {
                // Evita que Radix prevenga el default de <a>
                // y permite manejar acciones si no hay href
                onSelect?.(e as unknown as Event);
            }}
            className={clsx(base, className)}
            data-umami-event={umami}
        >
            {children}
        </DropdownMenu.Item>
    );
}

export function DropdownSeparator() {
    return <DropdownMenu.Separator className="my-1 h-px bg-border" />;
}
