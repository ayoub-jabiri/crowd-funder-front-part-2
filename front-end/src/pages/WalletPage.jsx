import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBalance } from "../store/slices/investor/investor";
import { RiAddLine } from "@remixicon/react";
import DepositModal from "../components/wallet/DepositModal";

export default function WalletPage() {
    const { balance } = useSelector((state) => state.investor);
    const dispatch = useDispatch();
    const [showDepositModal, setShowDepositModal] = useState(false);

    useEffect(() => {
        dispatch(getBalance());
    }, []);
    return (
        <>
            <div>
                <h1 className="text-xl font-bold">Wallet Page</h1>
                <div className="mt-10">
                    <h2 className="text-2xl mb-4">Balance: {balance}</h2>
                    <button
                        type="button"
                        className="bg-white text-black border border-black font-medium leading-5 rounded-md text-sm px-4 py-2.5 flex items-center gap-2 cursor-pointer"
                        onClick={() => setShowDepositModal(true)}
                    >
                        <RiAddLine />
                        <span>Deposit</span>
                    </button>
                </div>
            </div>
            {showDepositModal && (
                <DepositModal closeModal={() => setShowDepositModal(false)} />
            )}
        </>
    );
}
