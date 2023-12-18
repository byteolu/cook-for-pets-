

import Link from 'next/link';

const NavBar = () => {
    return (
        <nav className="bg-white shadow-md">
            <ul className="flex justify-center space-x-4">
                <li>
                    <Link href="/"
                         className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Home
                    </Link>
                </li>
                <li>
                    <Link href="/blog"
                         className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Blog
                    </Link>
                </li>
                <li>
                    <Link href="/prop-desc-tool"
                        className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Real Estate Tools
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
