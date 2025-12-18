'use client';

export default function Content({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="overflow-y-auto w-full h-[calc(100vh-4rem)] overscroll-contain">
            <div className="max-w-7xl mx-auto">
                {children}
            </div>
        </main>
    );
}