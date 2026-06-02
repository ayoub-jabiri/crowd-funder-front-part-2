import { RiAddLine } from "@remixicon/react";
import ProjectCard from "../components/Layout/projects/ProjectCard";
import { useSelector, useDispatch } from "react-redux";
import { getProjects } from "../features/projects/projectsSilce";
import { useEffect, useState } from "react";
import axios from "axios";
import AddProjectModal from "../components/Layout/projects/AddProjectModal";

export default function ProjectsPage() {
    const { VITE_API_URL } = import.meta.env;
    const dispatch = useDispatch();

    const token = useSelector((state) => state.userAuth.token);
    const projects = useSelector((state) => state.projects.ownerProjects);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const getProject = async () => {
            try {
                const response = await axios.get(`${VITE_API_URL}/projects`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                dispatch(getProjects({ projects: response.data }));
            } catch (error) {
                console.error(error);
            }
        };

        getProject();
    }, []);

    let projectsList;

    if (!projects) {
        projectsList = (
            <p className="col-span-12">
                Something went wrong! Try reloading the page.
            </p>
        );
    } else if (projects.length) {
        projectsList = projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
        ));
    } else {
        projectsList = (
            <p className="col-span-12">There are no projects to show.</p>
        );
    }

    return (
        <>
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-bold">Projects Page</h1>
                    <button
                        type="button"
                        className="bg-white text-black border border-black font-medium leading-5 rounded-md text-sm px-4 py-2.5 flex items-center gap-2 cursor-pointer"
                        onClick={() => setShowPopup(true)}
                    >
                        <RiAddLine />
                        <span>New Project</span>
                    </button>
                </div>
                <div className="grid grid-cols-12 gap-5">{projectsList}</div>
            </div>
            {showPopup && <AddProjectModal setShowPopup={setShowPopup} />}
        </>
    );
}
