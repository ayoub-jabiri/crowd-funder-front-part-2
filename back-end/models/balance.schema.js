import { Schema, model } from "mongoose";

const balanceSchema = new Schema({
    balance: {
        type: Number,
        default: () => 0,
    },
    investorId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
    },
});

export default model("Balance", balanceSchema);
