import { Schema, model } from "mongoose";

const projectSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    capital: {
        type: Number,
        required: true,
    },
    initialInvestment: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return value <= this.capital;
            },
        },
    },
    currentAmount: {
        type: Number,
        default: function () {
            return this.initialInvestment;
        },
    },
    maxPercentage: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["open", "closed"],
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    investorsIds: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    createdAt: {
        type: Date,
        default: () => Date.now(),
    },
});

export default model("Project", projectSchema);
