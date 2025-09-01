import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    adressLine: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
    pincode: {
      type: String,
      default: "",
    },
    mobile: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

const AddressModel = mongoose.model("Address", addressSchema);

export default AddressModel;
