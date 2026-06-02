import { RiCloseLine } from "@remixicon/react";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProject } from "../../../features/projects/projectsSilce";

export default function AddProjectModal({ setShowPopup }) {
    const [formValues, setFormValues] = useState({
        title: "",
        description: "",
        capital: "",
        initialInvestment: "",
        maxPercentage: "",
        status: "",
    });

    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    }

    const { VITE_API_URL } = import.meta.env;
    const token = useSelector((state) => state.userAuth.token);
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState(null);

    async function addNewMovie() {
        try {
            const response = await axios.post(
                `${VITE_API_URL}/projects/register`,
                formValues,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("New Project: ", response.data);

            dispatch(createProject({ newProject: response.data.project }));

            setShowPopup(false);
        } catch (error) {
            const errors = error.response.data.errors.map((err) => err.msg);
            setErrorMessage(errors.join(". *"));
        }
    }
    return (
        <div className="fixed top-0 left-0 z-10 w-screen h-screen flex justify-center items-center">
            <div className="bg-gray-800 p-8 w-full h-full rounded-md">
                <div className="flex justify-between items-center mb-4 text-white">
                    <h4 className="text-xl font-bold">Add New Project</h4>
                    <button
                        className="cursor-pointer"
                        onClick={() => setShowPopup(false)}
                    >
                        <RiCloseLine />
                    </button>
                </div>
                <div className="flex justify-between items-center gap-10">
                    <form
                        className="flex justify-center items-center flex-wrap gap-3"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <div className="w-[calc(100%/3.5)]">
                            <label className="block text-white mb-2">
                                Project Title
                            </label>
                            <input
                                required
                                type="text"
                                placeholder="project-title"
                                className="bg-[#0b0d12] border border-[#777] text-[#777] w-[250px] px-3 p-2 rounded-sm"
                                name="title"
                                value={formValues.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="w-[calc(100%/3.5)]">
                            <label className="block text-white mb-2">
                                Project Description
                            </label>
                            <input
                                required
                                type="text"
                                placeholder="project-description"
                                className="bg-[#0b0d12] border border-[#777] text-[#777] w-[250px] px-3 p-2 rounded-sm"
                                name="description"
                                value={formValues.description}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="w-[calc(100%/3.5)]">
                            <label className="block text-white mb-2">
                                Project Capital
                            </label>
                            <input
                                required
                                type="number"
                                placeholder="project-capital"
                                className="bg-[#0b0d12] border border-[#777] text-[#777] w-[250px] px-3 p-2 rounded-sm"
                                name="capital"
                                value={formValues.capital}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="w-[calc(100%/3.5)]">
                            <label className="block text-white mb-2">
                                Project Initial Investment
                            </label>
                            <input
                                required
                                type="number"
                                placeholder="project-initial-investment"
                                className="bg-[#0b0d12] border border-[#777] text-[#777] w-[250px] px-3 p-2 rounded-sm"
                                name="initialInvestment"
                                value={formValues.initialInvestment}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="w-[calc(100%/3.5)]">
                            <label className="block text-white mb-2">
                                Max Percentage Allowed
                            </label>
                            <input
                                required
                                type="number"
                                placeholder="project-max-percentage"
                                className="bg-[#0b0d12] border border-[#777] text-[#777] w-[250px] px-3 p-2 rounded-sm"
                                name="maxPercentage"
                                value={formValues.maxPercentage}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="w-[calc(100%/3.5)]">
                            <label className="block text-white mb-2">
                                Project Status
                            </label>
                            <input
                                required
                                type="text"
                                placeholder="open/closed"
                                className="bg-[#0b0d12] border border-[#777] text-[#777] w-[250px] px-3 p-2 rounded-sm"
                                name="status"
                                value={formValues.status}
                                onChange={handleInputChange}
                            />
                        </div>
                        {errorMessage && (
                            <div className="w-full text-center">
                                <p className="text-red-500">*{errorMessage}</p>
                            </div>
                        )}
                        <div className="w-full text-center">
                            <button
                                className="bg-white text-black w-[130px] border py-2 rounded-sm cursor-pointer"
                                onClick={addNewMovie}
                            >
                                Add Project
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
