import { useEffect } from "react";
import SideBar from "./SideBar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function AppLayout({ children }) {
    const navigate = useNavigate();

    const token = useSelector((state) => state.userAuth.token);

    useEffect(() => {
        if (!token) navigate("/login", { replace: true });
    }, []);

    return (
        <div className="flex">
            <SideBar />
            <main className="text-white p-10 flex-1">{children}</main>
        </div>
    );
}
