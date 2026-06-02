import { Link } from "react-router";

export default function ProjectCard({ project }) {
    return (
        <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-gray-800 border border-gray-400 rounded-md p-6 hover:translate-y-[-10px] main-transition">
            <h2 className="text-lg font-bold mb-2">{project.title}</h2>
            <p className="text-gray-400 text-justify mb-2">
                {project.description}
            </p>
            <p className="text-sm text-gray-400 mb-2">
                Status: <span className="text-[#2196F3]">{project.status}</span>
            </p>
            <p className="text-sm text-gray-400 mb-2">
                Capital:{" "}
                <span className="text-[#2196F3]">${project.capital}</span>
            </p>
            <p className="text-sm text-gray-400 mb-2">
                Amount Invested:{" "}
                <span className="text-[#2196F3]">${project.currentAmount}</span>
            </p>
            <p className="text-sm text-gray-400 mb-2">
                Max Percentage Allowed:{" "}
                <span className="text-[#2196F3]">{project.maxPercentage}%</span>
            </p>
            <Link
                to={`/projects/${project._id}`}
                className="block text-gray-400 hover:text-white text-center underline mt-4 main-transition"
            >
                View Details
            </Link>
        </div>
    );
}
