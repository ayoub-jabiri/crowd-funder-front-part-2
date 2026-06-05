import { useSelector } from "react-redux";
import OwnerProjects from "../components/Layout/projects/OwnerProjects";
import InvestorProjects from "../components/Layout/projects/InvestorProjects";

export default function ProjectsPage() {
    const { role } = useSelector((state) => state.userAuth);

    if (role === "owner") {
        return <OwnerProjects />;
    } else if (role === "investor") {
        return <InvestorProjects />;
    }
}
