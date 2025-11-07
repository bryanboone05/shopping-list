import Link from 'next/link';
import React from 'react';

interface MenuProps {
    isAuthenticated?: boolean;
    onSignOut?: () => Promise<void> | void;
}

const Menu: React.FC<MenuProps> = ({ isAuthenticated = false, onSignOut }) => {
    const handleSignOut = async () => {
        if (onSignOut) {
            await onSignOut();
        }
    };

    return (
        <nav aria-label="Menu principal">
            <ul className="flex items-center gap-3 m-0 list-none p-0">
                <li>
                    <Link
                        href="/"
                        className="text-sm font-medium text-teal-700 transition hover:invert"
                    >
                        Home
                    </Link>
                </li>
                <li>
                    {isAuthenticated ? (
                        <button
                            type="button"
                            onClick={handleSignOut}
                            className="text-sm font-medium text-red-600  duration-150 hover:scale-125 cursor-pointer"
                        >
                            Sair
                        </button>
                    ) : (
                        <Link
                            href="/auth"
                            className="text-sm font-medium text-teal-700 transition hover:invert"
                        >
                            Entrar
                        </Link>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Menu;