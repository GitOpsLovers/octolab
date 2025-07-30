import { auth0Client } from '@features/authentication/infrastructure/auth0/client.auth0';
import { Cta } from '@ui/home/components/cta.component';
import { Features } from '@ui/home/components/features.component';
import { Footer } from '@ui/home/components/footer.component';
import { Hero } from '@ui/home/components/hero.component';
import { HowWorks } from '@ui/home/components/how-works.component';

/**
 * Home page component.
 */
export default async function Home() {
    const session = await auth0Client.getSession();

    return (
        <main>
            {/* Hero */}
            <Hero session={session} />
            {/* Features */}
            <Features />
            {/* How it Works */}
            <HowWorks />
            {/* Final CTA */}
            <Cta />
            {/* Footer */}
            <Footer />
        </main>
    );
}
