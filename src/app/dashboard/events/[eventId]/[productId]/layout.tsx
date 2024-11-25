export default function EventProductLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="min-h-screen bg-gray-100 py-8">{children}</section>
    );
}
