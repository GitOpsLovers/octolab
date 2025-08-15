import { ReactNode } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as Io5Icons from 'react-icons/io5';
import * as SiIcons from 'react-icons/si';

/**
 * Template icon component
 */
export function TemplateIcon({ template, className }: { template: any; className?: string }): ReactNode {
    if (!template) return null;
    let Icon;
    if (template.iconLibrary === 'io5') {
        // eslint-disable-next-line import/namespace
        Icon = Io5Icons[template.icon as keyof typeof Io5Icons];
    } else if (template.iconLibrary === 'fa') {
        // eslint-disable-next-line import/namespace
        Icon = FaIcons[template.icon as keyof typeof FaIcons];
    } else {
        // eslint-disable-next-line import/namespace
        Icon = SiIcons[template.icon as keyof typeof SiIcons];
    }
    return <Icon className={className} style={{ color: template.iconColor }} />;
}
