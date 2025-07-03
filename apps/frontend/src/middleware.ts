import { NextResponse, type NextRequest } from 'next/server';

import { auth0Client } from '@features/authentication/infrastructure/auth0/client.auth0';

export async function middleware(request: NextRequest) {
    // Ejecutar middleware de Auth0
    const authResponse = await auth0Client.middleware(request);

    // Si es NextResponse (next), añadir header
    if (authResponse instanceof NextResponse) {
        authResponse.headers.set('x-current-path', request.nextUrl.pathname);
        return authResponse;
    }

    // Si auth0 devolvió redirección u otra respuesta, devolverla tal cual
    return authResponse;
}

export const config = {
    matcher: [
        // Excluye rutas estáticas y de imágenes
        '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
};
