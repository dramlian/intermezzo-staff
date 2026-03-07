import { isAdmin } from "../lib/isAdmin";
import WalletPage from "./WalletPage";

export default async function Page() {
    const admin = await isAdmin();
    return <WalletPage isAdmin={admin} />;
}