import { RiArrowLeftLongLine } from "@remixicon/react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router";
import {
    getSingleProject,
    handleOpenAndCloseProject,
    deleteProject,
} from "../store/slices/projects/projectsSilce";

export default function ProjectsDetailsPage() {
    const { VITE_API_URL } = import.meta.env;
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = useSelector((state) => state.userAuth.token);
    const currentProject = useSelector(
        (state) => state.projects.currentProject
    );

    useEffect(() => {
        const getProject = async () => {
            try {
                const response = await axios.get(
                    `${VITE_API_URL}/projects/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                dispatch(getSingleProject({ project: response.data }));
            } catch (error) {
                console.error(error);
            }
        };

        getProject();
    }, []);

    async function handleOpenAndClose(e) {
        const newProjectData = { ...currentProject };

        if (e.target.name === "open") {
            newProjectData.status = "open";
        } else if (e.target.name === "close") {
            newProjectData.status = "closed";
        }

        try {
            const response = await axios.put(
                `${VITE_API_URL}/projects/${id}`,
                newProjectData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            dispatch(
                handleOpenAndCloseProject({ project: response.data.newProject })
            );
        } catch (error) {
            console.error(error);
        }
    }

    async function handleDelete() {
        try {
            await axios.delete(`${VITE_API_URL}/projects/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            dispatch(deleteProject({ projectId: id }));
            navigate("/projects");
        } catch (error) {
            console.error(error);
        }
    }

    if (!currentProject) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Link
                to="/projects"
                className="text-[#2196F3] text-sm flex items-center gap-1 cursor-pointer mb-4"
            >
                <RiArrowLeftLongLine />
                <span>Back to Projects</span>
            </Link>
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">{currentProject.title}</h1>
                <div className="flex gap-3">
                    {currentProject.status === "closed" && (
                        <button
                            className="bg-transparent text-white text-[13px] py-1 px-4 border rounded-md hover:bg-white hover:text-gray-800 cursor-pointer main-transition"
                            name="open"
                            onClick={handleOpenAndClose}
                        >
                            Open
                        </button>
                    )}
                    {currentProject.status === "open" && (
                        <button
                            className="bg-transparent text-white text-[13px] py-1 px-4 border rounded-md hover:bg-white hover:text-gray-800 cursor-pointer main-transition"
                            name="close"
                            onClick={handleOpenAndClose}
                        >
                            Close
                        </button>
                    )}
                    <button className="bg-transparent text-white text-[13px] py-1 px-4 border rounded-md hover:bg-white hover:text-gray-800 cursor-pointer main-transition">
                        Edit
                    </button>
                    <button
                        className="bg-transparent text-white text-[13px] py-1 px-4 border rounded-md hover:bg-white hover:text-gray-800 cursor-pointer main-transition"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>
            <div className="mt-4">
                <p className="text-sm text-gray-400 mb-2">
                    {currentProject.description}
                </p>
                <p className="text-sm text-gray-400 mb-2">
                    Status:{" "}
                    <span className="text-[#2196F3]">
                        {currentProject.status}
                    </span>
                </p>
                <p className="text-sm text-gray-400 mb-2">
                    Capital:{" "}
                    <span className="text-[#2196F3]">
                        ${currentProject.capital}
                    </span>
                </p>
                <p className="text-sm text-gray-400 mb-2">
                    Amount Invested:{" "}
                    <span className="text-[#2196F3]">
                        ${currentProject.currentAmount}
                    </span>
                </p>
                <p className="text-sm text-gray-400 mb-2">
                    Max Percentage Allowed:{" "}
                    <span className="text-[#2196F3]">
                        {currentProject.maxPercentage}%
                    </span>
                </p>
            </div>
            <h2 className="text-base font-bold mt-6 mb-4">
                Project Investors:
            </h2>
            {currentProject.investorsIds.length ? (
                <ul>
                    {currentProject.investorsIds.map((investor, i) => (
                        <li
                            key={investor._id}
                            className="text-sm text-gray-400"
                        >
                            <span className="text-white">{i + 1}.</span>
                            <span className="ml-2 capitalize">
                                {investor.name}
                            </span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-sm text-gray-400">No investors yet.</p>
            )}
        </div>
    );
}
