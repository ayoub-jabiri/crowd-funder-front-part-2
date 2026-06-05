import "../style/DashboradPage.css";
import Card from "../components/Dashboard/Card";
import { useEffect, useState } from "react";
import axios from "axios";

function DashboradPage() {
  const [stats, setStats] = useState({
    balance: 0,
    totalInvested: 0,
    projectsCount: 0,
    portfolio: 0,
  });

  const [investments, setInvestments] = useState([]);

  const token = localStorage.getItem("token");

  const getData = async () => {
    try {
      const [projectsRes, investmentsRes, walletRes] = await Promise.all([
        axios.get("http://localhost:3000/projects", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:3000/investments", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:3000/wallet", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const projects = projectsRes.data;
      const investmentsData = investmentsRes.data;
      const wallet = walletRes.data;

      // calculations
      const totalInvested = investmentsData.reduce(
        (sum, inv) => sum + inv.amount,
        0
      );

      const projectsCount = investmentsData.length;

      const portfolio = projects.length
        ? Math.round((projectsCount / projects.length) * 100)
        : 0;

      setStats({
        balance: wallet.balance,
        totalInvested,
        projectsCount,
        portfolio,
      });

      setInvestments(investmentsData);
    } catch (err) {
      console.log("Error:", err.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="dashboard">
      <div className="page-header">
        <header>
          <h1 className="text-xl font-bold">Investor Dashboard</h1>
        </header>

        <section className="stats">
          <Card title="Balance" value={`${stats.balance} MAD`} />
          <Card title="Total Invested" value={`${stats.totalInvested} MAD`} />
          <Card title="Projects Participated" value={stats.projectsCount} />
          <Card title="Portfolio" value={`${stats.portfolio}%`} />
        </section>
      </div>

      {/*  Investments List */}
      <section className="investments-list">
        <h2>My Investments</h2>

        {investments.length === 0 ? (
          <p>No investments yet</p>
        ) : (
          investments.map((inv) => (
            <div key={inv._id} className="investment-card">
              <p>
                <strong>Project:</strong> {inv.projectName || inv.projectId}
              </p>
              <p>
                <strong>Amount:</strong> {inv.amount} MAD
              </p>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default DashboradPage;