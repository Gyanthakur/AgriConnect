import mongoose from "mongoose";
const addressSchema = new mongoose.Schema(
    {
        line: { type: String, trim: true, default: "" },
        city: { type: String, trim: true, default: "" },
        state: { type: String, trim: true, default: "" },
        zip: { type: String, trim: true, default: "" },
        country: { type: String, trim: true, default: "India" },
    },
    { _id: false }
);

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            trim: true,
           
            maxlength: 50,
            default: "",
        },
        lastName: {
            type: String,
            trim: true,
           
            maxlength: 50,
            default: "",
        },
        aadharId: {
            type: String,
            sparse: true,
            trim: true,
            match: /^[0-9]{12}$/,
            default: null,
        },
        verified: {
            type: Boolean,
            default: false,
        },
        verifiedAt: {
            type: Date,
            default: null,
        },
        farmerId: {
            type: String,
            sparse: true,
            trim: true,
            default: null,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: /^[0-9]{10,15}$/,
            default: null,
        },
        email: {
            type: String,
            sparse: true,
            trim: true,
            default: null,
        },
        password: {
            type: String,
            required: true,
            select: false,
            minlength: 6,
        },
        image: {
            type: String,
            default: "https://res.cloudinary.com/dva2u9y89/image/upload/v1743803965/ggsexl1he9gdntr4ojff.png",
        },
        address: {
            type: addressSchema,
            default: {},
        },
        gender: {
            type: String,
            enum: ["Male", "Female", "Other", "Not Selected"],
            default: "Not Selected",
        },
        dob: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true }
);

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);
export default UserModel
