import "../style/DashboradPage.css";
import Card from "../components/Dashboard/Card";
import { useEffect, useState } from "react";
import axios from "axios";

const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI2YTBmMWNlNTRjNzJmNWU3MDgxMWUyMDAiLCJuYW1lIjoiYXlvdWJfb3duZXIiLCJlbWFpbCI6ImF5b3ViX293bmVyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJGQ0UlI5YVVobnJMTnBZLmNWeE15Zk9LWTQua2hVTVBacnQ4bEFDWDgzMmVLaHQ4NWxBNWtDIiwicm9sZSI6Im93bmVyIiwiY3JlYXRlZEF0IjoiMjAyNi0wNS0yMVQxNDo1NTozMy4wNDJaIiwiX192IjowfQ.vJ7cv8kAflIqVneRlakoBwIcejvJ7fx3_EhYxAn6I_w";

function DashboradPage() {
    const [stats, setStats] = useState({
        total: 0,
        open: 0,
        closed: 0,
        capital: 0,
    });

    useEffect(() => {
        const getProjects = async () => {
            try {
                const res = await axios.get("http://localhost:3000/projects", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = res.data;
                console.log(data);

                const total = data.length;
                const open = data.filter((p) => p.status === "open").length;
                const closed = data.filter((p) => p.status === "closed").length;
                const capital = data.reduce(
                    (sum, p) => sum + (p.value || 0),
                    0
                );

                setStats({ total, open, closed, capital });
            } catch (err) {
                console.log("Network Error:", err.message);
            }
        };

        getProjects();
    }, []);

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

                    <Card
                        title="Open Projects"
                        value={stats.open}
                        subtitle="Currently active"
                    />

                    <Card
                        title="Closed Projects"
                        value={stats.closed}
                        subtitle="Completed projects"
                    />

                    <Card
                        title="Total Capital"
                        value={`${stats.capital} MAD`}
                        subtitle="Total funds raised"
                    />
                </section>
            </div>
        </div>
    );
}

export default DashboradPage;
