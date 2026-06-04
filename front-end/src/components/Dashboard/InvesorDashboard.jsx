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

    console.log(dashboardData);

    return (
        <div className="dashboard">
            <div className="page-header">
                <header>
                    <h1 className="text-xl font-bold">Dashboard Page</h1>
                </header>

                <section className="stats">
                    {/* <Card
                        title="Total Projects"
                        value={stats.total}
                        subtitle="All projects"
                    /> */}
                </section>
            </div>
        </div>
    );
}
