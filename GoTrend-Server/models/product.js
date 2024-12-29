import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tên sản phẩm là bắt buộc"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Mô tả sản phẩm là bắt buộc"],
    },
    originalPrice: {
      type: Number,
      required: [true, "Giá ban đầu là bắt buộc"],
      min: [0, "Giá ban đầu không thể nhỏ hơn 0"],
    },
    discountPrice: {
      type: Number,
      required: [true, "Giá bán là bắt buộc"],
      min: [0, "Giá bán không thể nhỏ hơn 0"],
      validate: {
        validator: function (value) {
          return value <= this.originalPrice;
        },
        message: "Giá bán phải nhỏ hơn hoặc bằng giá ban đầu",
      },
    },
    quantity: {
      type: Number,
      required: [true, "Số lượng là bắt buộc"],
      min: [0, "Số lượng không thể nhỏ hơn 0"],
    },
    categoryId: {
      type: String,
      required: [true, "ID Danh mục sản phẩm là bắt buộc"],
    },
    images: {
      type: [String], // Danh sách URL hình ảnh
      validate: {
        validator: function (v) {
          return v.length > 0;
        },
        message: "Ít nhất một hình ảnh phải được cung cấp",
      },
    },
    status: {
      type: String,
      enum: ["Còn hàng", "Hết hàng", "Ngừng bán"], // Trạng thái sản phẩm
      default: "Còn hàng",
    },
    createdAt: {
      type: Date,
      default: Date.now, // Tự động thêm thời gian tạo
    },
    updatedAt: {
      type: Date,
      default: Date.now, // Tự động thêm thời gian cập nhật
    },
  },
  { versionKey: false, timestamps: true } // Đây là tùy chọn tự động thêm createdAt và updatedAt
);

export default mongoose.model("ProductModel", productSchema);
