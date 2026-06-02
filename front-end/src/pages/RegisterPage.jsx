import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function LoginPage() {
    const { VITE_API_URL } = import.meta.env;
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
        role: "owner",
    });
    const [errorMessage, setErrorMessage] = useState(null);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: value,
            };
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${VITE_API_URL}/users/register`,
                formData
            );

            localStorage.setItem("accessToken", response.data.accessToken);
            navigate("/dashboard", { replace: true });
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                error.response?.data?.errors?.[0]?.msg ||
                "Something went wrong";
            console.log(
                `Status: ${error.response.status}, error: ${errorMessage}`
            );

            setErrorMessage(errorMessage);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center py-10">
            <div className="flex items-center gap-2 mb-4">
                <div className="bg-white w-fit p-2 rounded-md">
                    <img src="/logo.png" alt="Logo" className="w-[20px]" />
                </div>
                <h1 className="secondary-font text-xl text-white">
                    InvoiceFlow
                </h1>
            </div>
            <div className="bg-[#181b25] text-white border border-[#6B6560] rounded-[20px] p-[40px] w-[420px] [box-shadow:0_1px_3px_rgba(0,0,0,0.06),_0_4px_16px_rgba(0,0,0,0.04)]">
                <div className="flex border mb-6 border-[#6B6560] rounded-md overflow-hidden">
                    <Link
                        to="/login"
                        className="bg-transparent text-[#6B6560] border-r border-[#6B6560] flex-1 p-2.5 text-center text-[14px] cursor-pointer"
                    >
                        Log in
                    </Link>
                    <Link
                        to="/register"
                        className="bg-[#252839] text-white flex-1 p-2.5 text-center text-[14px] cursor-pointer"
                    >
                        Register
                    </Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label
                            htmlFor="name"
                            className="block mb-2.5 text-[#6B6560] text-sm font-medium text-heading"
                        >
                            Email Address
                        </label>
                        <input
                            type="name"
                            id="name"
                            name="name"
                            className="bg-neutral-secondary-medium border border-[#6B6560] text-heading text-sm rounded-md focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                            placeholder="john.doe@company.com"
                            required
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="email"
                            className="block mb-2.5 text-[#6B6560] text-sm font-medium text-heading"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="bg-neutral-secondary-medium border border-[#6B6560] text-heading text-sm rounded-md focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                            placeholder="john.doe@company.com"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block mb-2.5 text-[#6B6560] text-sm font-medium text-heading"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="bg-neutral-secondary-medium border border-[#6B6560] text-heading text-sm rounded-md focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                            placeholder="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password-confirm"
                            className="block mb-2.5 text-[#6B6560] text-sm font-medium text-heading"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password-confirm"
                            name="passwordConfirm"
                            className="bg-neutral-secondary-medium border border-[#6B6560] text-heading text-sm rounded-md focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                            placeholder="password"
                            required
                            value={formData.passwordConfirm}
                            onChange={handleChange}
                        />
                    </div>
                    {errorMessage && (
                        <p className="text-red-500">*{errorMessage}</p>
                    )}
                    <button
                        type="submit"
                        className="block w-full bg-[#252839] text-white text-[14px] border border-[#6B6560] px-4 py-2 mt-6 rounded-md cursor-pointer"
                    >
                        Create an Account
                    </button>
                </form>
            </div>
        </div>
    );
}
