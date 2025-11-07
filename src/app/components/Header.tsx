'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Menu from './Menu';

const Header: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const loadSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();
            setIsAuthenticated(!!session);
        };

        loadSession();

        const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
            setIsAuthenticated(!!session);
        });

        return () => {
            authListener?.subscription?.unsubscribe();
        };
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/auth');
    };

    return (
        <header className="flex items-center justify-between border-b border-teal-100 bg-white px-6 py-4 shadow-sm">
            <Link href="/" className="text-lg font-semibold text-teal-700">
                Shopping List
            </Link>
            <Menu isAuthenticated={isAuthenticated} onSignOut={handleSignOut} />
        </header>
    );
};

export default Header;
