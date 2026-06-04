import { useSelector } from "react-redux";
import OwnerDashboard from "../components/dashboard/OwnerDashboard";
import InvesorDashboard from "../components/dashboard/InvesorDashboard";

export default function DashboradPage() {
    const { role } = useSelector((state) => state.userAuth);

    if (role == "owner") {
        return <OwnerDashboard />;
    } else if (role == "investor") {
        return <InvesorDashboard />;
    }
}
