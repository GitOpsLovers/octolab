import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Crea tu Workflow de GitHub Actions en minutos
      </h1>
      <p className="text-lg text-gray-600 text-center max-w-xl mb-8">
        Genera archivos YAML listos para usar sin necesidad de escribir nada a mano. Empieza ahora mismo y acelera tu CI/CD.
      </p>
      <Link
        href="/templates"
        className="bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800 transition"
      >
        Crear Workflow
      </Link>
    </main>
  );
}
