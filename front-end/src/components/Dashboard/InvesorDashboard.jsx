import Card from "./Card";

export default function InvesorDashboard() {
    return (
        <div className="dashboard">
            <div className="page-header">
                <header>
                    <h1 className="text-xl font-bold">Dashboard Page</h1>
                </header>

                <section className="stats">
                    <Card
                        title="Total Projects"
                        value={stats.total}
                        subtitle="All projects"
                    />
                </section>
            </div>
        </div>
    );
}
