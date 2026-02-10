export default async function TourDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return (
        <main>
            <h1>Tour: {slug}</h1>
            <p>Details about this specific tour will go here.</p>
        </main>
    );
}
