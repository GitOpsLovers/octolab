import Link from 'next/link';

const templates = [
    {
        id: 'node-ci',
        name: 'Node.js CI',
        description: 'Instala dependencias, corre tests y build para Node.js.',
    },
    {
        id: 'npm-publish',
        name: 'Publicar NPM',
        description: 'Workflow para publicar tu paquete en NPM.',
    },
];

/**
 * Templates page
 */
export default function TemplatesPage() {
    return (
        <main className="p-8 bg-gray-50">
            <h1 className="text-3xl font-bold mb-8 text-center">Elige una plantilla para empezar</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => (
                    <div key={template.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                        <h2 className="text-xl font-semibold mb-2">{template.name}</h2>
                        <p className="text-gray-600 mb-4">{template.description}</p>
                        <Link href={`/editor/${template.id}`} className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition text-center block">
                            Usar plantilla
                        </Link>
                    </div>
                ))}
            </div>
        </main>
    );
}
