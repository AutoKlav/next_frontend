import { Metadata } from 'next';
import Layout from '../../layout/layout';

interface AppLayoutProps {
    children: React.ReactNode;
}

// Define the metadata for your layout
export const metadata: Metadata = {
    title: 'Autoklav',
    description: 'The ultimate collection of design-agnostic, flexible and accessible React UI Components.',
    robots: { index: false, follow: false },
    openGraph: {
                
    },
    icons: {
        
    }
};

// Use `generateViewport` for setting viewport meta tags
export function generateViewport() {
    return {
        initialScale: 1,
        width: 'device-width',
    };
}

export default function AppLayout({ children }: AppLayoutProps) {
    return <Layout>{children}</Layout>;
}
