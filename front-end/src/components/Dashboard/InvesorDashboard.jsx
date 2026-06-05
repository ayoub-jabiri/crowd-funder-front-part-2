import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import { getDashboardData } from "../../store/slices/investor/investor";
import { useEffect } from "react";

export default function InvesorDashboard() {
    const { dashboardData } = useSelector((state) => state.investor);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDashboardData());
    }, []);

    if (!dashboardData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dashboard">
            <div className="page-header">
                <header>
                    <h1 className="text-xl font-bold">Dashboard Page</h1>
                </header>

                <section className="stats">
                    <Card
                        title="Disponible Balance"
                        value={dashboardData.disponibleBalance || 0}
                    />
                    <Card
                        title="Amount Invested"
                        value={dashboardData.amountInvested || 0}
                    />
                    <Card
                        title="Projects Funded"
                        value={dashboardData.projectsInvestedIn || 0}
                    />
                </section>
            </div>
        </div>
    );
}
