import { RiCloseLine } from "@remixicon/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { walletDeposit } from "../../store/slices/investor/investor";

export default function DepositModal({ closeModal }) {
    const [amount, setAmount] = useState("");
    const dispatch = useDispatch();

    function handleDeposit() {
        if (amount !== "") {
            dispatch(walletDeposit(+amount));
            closeModal();
        }
    }
    return (
        <div
            id="default-modal"
            className="bg-[#000000d6] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen flex justify-center items-center"
        >
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-white text-black border border-default rounded-base shadow-sm p-4 md:p-6 rounded-md">
                    <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5">
                        <h3 className="text-lg font-medium text-heading">
                            Deposit
                        </h3>
                        <button
                            type="button"
                            className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center cursor-pointer"
                            onClick={() => closeModal()}
                        >
                            <RiCloseLine />
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="space-y-4 md:space-y-6 py-4 md:py-6">
                        <input
                            type="number"
                            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-[300px] px-3 py-2.5 mx-auto shadow-xs placeholder:text-body"
                            placeholder="Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        <button
                            type="button"
                            className="block bg-white text-black border border-black font-medium leading-5 rounded-md text-sm px-4 py-2.5 mx-auto cursor-pointer"
                            onClick={handleDeposit}
                        >
                            <span>Deposit</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
