import Image from 'next/image';
import { useEffect, useState } from 'react';

const _Logo = (): JSX.Element => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="flex items-center gap-2">
            {mounted ? (
                <Image
                    src="/indicab-logo.svg"
                    alt="IndiCab Logo"
                    width={25}
                    height={25}
                    className="h-6 w-auto"
                    priority
                />
            ) : (
                <div className="h-6 w-6 bg-white/20 rounded-sm animate-pulse"></div>
            )}
            <div className="text-lg font-bold text-white">IndiCab</div>
        </div>
    );
};

export default _Logo;
