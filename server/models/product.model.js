import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: null,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    subCategory: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "SubCategory",
    },
    images: [
      {
        type: Array,
        default: [],
      },
    ],
    stock: {
      type: Number,
      required: true,
      default: null,
    },
    unit: {
      type: String,
      default: "",
    },
    discount: {
      type: Number,
      default: null,
    },
    more_details: {
      type: Object,
      default: {},
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
