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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
                <div key={template.id} className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition flex flex-col">
                    <div className="text-5xl mb-4">{template.icon}</div>
                    <h2 className="text-xl font-semibold mb-2">{template.name}</h2>
                    <p className="text-gray-600 mb-4">{template.description}</p>
                    <ul className="text-gray-500 text-sm mb-4 list-disc pl-5 flex-1">
                        {template.features.map((feature, index) => (
                            <li key={index}>✅ {feature}</li>
                        ))}
                    </ul>
                    <Link href={`/editor/${template.id}`} className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition mt-auto text-center block">
                        Usar plantilla
                    </Link>
                </div>
            ))}
        </div>
    );
}
