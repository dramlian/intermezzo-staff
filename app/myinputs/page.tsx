import { isAdmin } from "../lib/isAdmin";
import MyInputsPage from "./MyInputsPage";

export default async function Page() {
    const admin = await isAdmin();
    return <MyInputsPage isAdmin={admin} />;
}