/**
 * Template model
 */
export interface Template {
    id: string;
    name: string;
    description: string;
    icon: string;
    iconColor: string;
    iconLibrary: string;
    features: string[];
    type: TemplateType;
}

/**
 * Templates types
 */
export type TemplateType = 'verification' | 'distribution' | 'deployment' | 'releasing' | 'security' | 'versioning';
