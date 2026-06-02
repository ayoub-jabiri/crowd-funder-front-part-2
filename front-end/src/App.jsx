import { RouterProvider } from "react-router";
import { router } from "./routes/router";
import AppLayout from "./components/Layout/AppLayout";

export default function App() {
    return (
        <RouterProvider router={router}>
            <AppLayout />
        </RouterProvider>
    );
}
