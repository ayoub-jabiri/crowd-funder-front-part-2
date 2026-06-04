import { useEffect } from "react";
import SideBar from "./SideBar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import NotFoundPage from "../../pages/NotFoundPage";

export default function AppLayout({ allowedRole, children }) {
    const navigate = useNavigate();

    const { token, role } = useSelector((state) => state.userAuth);

    useEffect(() => {
        if (!token) navigate("/login", { replace: true });
    }, []);

    if (allowedRole !== undefined) {
        if (allowedRole !== role) {
            return <NotFoundPage />;
        }
    }
    return (
        <div className="flex">
            <SideBar />
            <main className="text-white p-10 flex-1">{children}</main>
        </div>
    );
}
