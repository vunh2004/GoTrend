import { productSchema } from "../schemas/product";
import ProductModel from "../models/product";

// 1. Thêm sản phẩm
export const addProduct = async (req, res) => {
  try {
    // Validate dữ liệu đầu vào
    const { error, value } = productSchema.validate(req.body, {
      abortEarly: false,
    }); // Lấy tất cả lỗi

    // Nếu có lỗi, trả về tất cả các lỗi
    if (error) {
      const errorMessages = error.details.map((detail) => detail.message); // Lấy tất cả các lỗi
      return res.status(400).json({ errors: errorMessages });
    }

    // Tạo mới sản phẩm từ dữ liệu hợp lệ
    const product = new ProductModel(value); // Dùng dữ liệu đã được validate

    // Lưu sản phẩm vào cơ sở dữ liệu
    const savedProduct = await product.save();

    // Trả về thông tin sản phẩm đã thêm vào cơ sở dữ liệu
    res.status(201).json({
      message: "Sản phẩm đã được thêm",
      product: savedProduct,
    });
  } catch (error) {
    // Nếu có lỗi khác
    res.status(500).json({ error: "Đã có lỗi xảy ra khi thêm sản phẩm" });
  }
};

// 2. Lấy tất cả sản phẩm
export const getAllProducts = async (req, res) => {
  try {
    // Lấy tất cả sản phẩm từ cơ sở dữ liệu
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Đã có lỗi xảy ra khi lấy danh sách sản phẩm" });
  }
};

// 3. Lấy chi tiết sản phẩm
export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    // Tìm sản phẩm theo ID
    const product = await ProductModel.findById(id);

    // Nếu không tìm thấy sản phẩm
    if (!product) {
      return res.status(404).json({ error: "Sản phẩm không tồn tại" });
    }

    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Đã có lỗi xảy ra khi lấy chi tiết sản phẩm" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    // Validate dữ liệu đầu vào
    const { error, value } = productSchema.validate(req.body, {
      abortEarly: false,
    });

    // Nếu có lỗi validation, trả về tất cả các lỗi
    if (error) {
      const errorMessages = error.details.map((detail) => detail.message); // Lấy tất cả các lỗi
      return res.status(400).json({ errors: errorMessages });
    }

    // Cập nhật sản phẩm
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, value, {
      new: true, // Đảm bảo trả về sản phẩm sau khi cập nhật
    });

    // Nếu không tìm thấy sản phẩm
    if (!updatedProduct) {
      return res.status(404).json({ error: "Sản phẩm không tồn tại" });
    }

    // Trả về sản phẩm đã được cập nhật
    res.status(200).json({
      message: "Sản phẩm đã được cập nhật",
      updatedProduct,
    });
  } catch (error) {
    // Lỗi không phải Joi, trả về lỗi server
    res.status(500).json({ error: "Đã có lỗi xảy ra khi cập nhật sản phẩm" });
  }
};

// 5. Xóa sản phẩm
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    // Xóa sản phẩm theo ID
    const deletedProduct = await ProductModel.findByIdAndDelete(id);

    // Nếu không tìm thấy sản phẩm
    if (!deletedProduct) {
      return res.status(404).json({ error: "Sản phẩm không tồn tại" });
    }

    res.status(200).json({
      message: "Sản phẩm đã được xóa",
      deletedProduct,
    });
  } catch (error) {
    res.status(500).json({ error: "Đã có lỗi xảy ra khi xóa sản phẩm" });
  }
};
