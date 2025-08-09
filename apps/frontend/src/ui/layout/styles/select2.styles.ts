// eslint-disable-next-line import/named
import { StylesConfig } from 'react-select';

export interface ActionOption {
    label: string;
    value: string;
}

/**
 * Styles for Select2 components
 */
export const select2Styles: StylesConfig<ActionOption, false> = {
    control: (styles, state) => {
        const newStyles = { ...styles };
        newStyles.backgroundColor = 'var(--color-background)';
        newStyles.borderColor = 'var(--color-border)';
        newStyles.borderRadius = 'var(--radius-md)';
        newStyles.boxShadow = 'none';
        newStyles.minHeight = '40px';

        if (state.isFocused) {
            newStyles.borderColor = 'var(--color-primary)';
            newStyles.boxShadow = '0 0 0 1px var(--color-primary)';
        }

        newStyles['&:hover'] = {
            borderColor: 'var(--color-border)',
        };

        return newStyles;
    },

    valueContainer: (styles) => ({
        ...styles,
        color: 'var(--color-text)',
    }),

    singleValue: (styles) => ({
        ...styles,
        color: 'var(--color-text)',
    }),

    placeholder: (styles) => ({
        ...styles,
        color: 'var(--color-text-muted)',
    }),

    menu: (styles) => ({
        ...styles,
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border)',
        marginTop: 2,
        zIndex: 100,
    }),

    option: (styles, state) => {
        const newStyles = { ...styles };
        newStyles.backgroundColor = 'transparent';
        newStyles.color = 'var(--color-text)';
        newStyles.cursor = 'pointer';

        if (state.isSelected) {
            newStyles.backgroundColor = 'var(--color-primary)';
            newStyles.color = 'var(--color-primary-foreground)';
        } else if (state.isFocused) {
            newStyles.backgroundColor = 'color-mix(in srgb, var(--color-primary-hover) 10%, transparent)';
        }

        newStyles['&:active'] = {
            backgroundColor: 'var(--color-primary-hover)',
        };

        return newStyles;
    },

    input: (styles) => ({
        ...styles,
        color: 'var(--color-text)',
    }),

    dropdownIndicator: (styles, state) => {
        const newStyles = { ...styles };
        newStyles.color = 'var(--color-text-muted)';

        if (state.isFocused) {
            newStyles.color = 'var(--color-primary)';
        }

        newStyles['&:hover'] = {
            color: 'var(--color-primary-hover)',
        };

        return newStyles;
    },

    indicatorSeparator: (styles) => ({
        ...styles,
        backgroundColor: 'var(--color-border)',
    }),

    clearIndicator: (styles) => ({
        ...styles,
        color: 'var(--color-danger)',
        '&:hover': {
            color: 'var(--danger)',
        },
    }),
};
