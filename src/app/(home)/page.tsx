import Link from 'next/link';

export default function Home() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-background">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-text">Crea tu Workflow de GitHub Actions en minutos</h1>
            <p className="text-lg text-text-muted text-center max-w-xl mb-8">
                Genera archivos YAML listos para usar sin necesidad de escribir nada a mano. Empieza ahora mismo y acelera tu CI/CD.
            </p>
            <Link href="/templates" className="bg-primary text-black px-6 py-3 rounded-md text-lg font-semibold text-center hover:bg-primary-hover transition">
                Crear Workflow
            </Link>
        </main>
    );
}
