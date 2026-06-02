import { Link } from "react-router";

export default function NotFoundPage() {
    return (
        <div className="text-white flex justify-center items-center flex-col py-10">
            <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
            <Link
                to="/dashboard"
                className="bg-white text-black p-2 rounded-md"
            >
                Go to the dashboard page
            </Link>
        </div>
    );
}
