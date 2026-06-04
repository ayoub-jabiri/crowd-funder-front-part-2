import { RiBriefcaseLine, RiDashboardLine, RiUserFill } from "@remixicon/react";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { userLogout } from "../../store/slices/auth/authSilce";

export default function SideBar() {
    const dispatch = useDispatch();

    function handleLogout() {
        dispatch(userLogout());
    }

    return (
        <aside className="relative bg-[#13151c] w-[250px] h-screen p-4 border-r border-[#252839]">
            <div className="flex items-center gap-2 p-6 border-b border-[#E2DDD8]">
                <div className="bg-white w-fit p-2 rounded-md">
                    <img src="/logo.png" alt="Logo" className="w-[20px]" />
                </div>
                <h1 className="secondary-font text-xl text-white">
                    InvoiceFlow
                </h1>
            </div>
            <div className="p-2 mt-4">
                <Link
                    to="/dashboard"
                    className="text-white hover:bg-[#F0EDE8] hover:text-black w-full text-start px-4 py-3 mb-2 rounded-md flex items-center gap-1 cursor-pointer main-transition"
                >
                    <RiDashboardLine className="w-[20px]" />
                    <span>Dashboard</span>
                </Link>
                <Link
                    to="/projects"
                    className="text-white hover:bg-[#F0EDE8] hover:text-black w-full text-start px-4 py-3 rounded-md flex items-center gap-1 cursor-pointer main-transition"
                >
                    <RiBriefcaseLine className="w-[20px]" />
                    <span>Projects</span>
                </Link>
            </div>
            <div className="p-6 border-t border-[#E2DDD8] absolute left-[50%] translate-x-[-50%] bottom-0 w-[calc(100%-16px)]">
                <Link to="/login" onClick={handleLogout}>
                    <div className="flex items-center gap-2 p-2 rounded-md text-white hover:bg-[#F0EDE8] hover:text-black main-transition">
                        <div className="w-[32px] h-[32px] font-bold rounded-[50%] flex justify-center items-center">
                            <RiUserFill className="w-[18px]" />
                        </div>
                        <div>
                            <h3 className="text-sm">Log out</h3>
                        </div>
                    </div>
                </Link>
            </div>
        </aside>
    );
}
