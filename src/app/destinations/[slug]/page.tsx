export default async function DestinationDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return (
        <main>
            <h1>Destination: {slug}</h1>
            <p>Details about this specific destination will go here.</p>
        </main>
    );
}
