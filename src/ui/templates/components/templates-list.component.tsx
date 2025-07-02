import Link from 'next/link';

const templates = [
    {
        id: 'node-ci',
        name: 'Node.js CI',
        description: 'Instala dependencias, corre tests y build para Node.js.',
        icon: '💚',
        features: ['Tests automáticos', 'Compatible Node 16/18/20', 'Build antes de merge'],
    },
    {
        id: 'npm-publish',
        name: 'Publicar NPM',
        description: 'Workflow para publicar tu paquete en NPM.',
        icon: '📦',
        features: ['Configura token NPM', 'Test y build antes de publish', 'Compatible monorepos'],
    },
];

/**
 * Templates list component.
 */
export default function TemplatesList() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template) => (
                <div key={template.id} className="bg-surface rounded-xl shadow hover:shadow-lg transition border border-border flex flex-col">
                    <div className="p-6 flex flex-col flex-1">
                        <div className="text-5xl mb-4">{template.icon}</div>

                        <h2 className="text-xl font-bold text-text mb-2">{template.name}</h2>

                        <p className="text-text-muted mb-4">{template.description}</p>

                        <ul className="space-y-1 text-sm text-text-muted flex-1">
                            {template.features.map((feature, index) => (
                                <li key={index} className="flex items-center gap-2">
                                    <span className="text-success">✔️</span>
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <Link href={`/editor/${template.id}`} className="bg-primary text-black font-semibold text-center py-2 rounded-md hover:bg-primary-hover transition mt-6">
                            Usar plantilla
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}
