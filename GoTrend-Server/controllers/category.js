import CategoryModel from "../models/category";

// 1. Thêm danh mục
export const addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!name) {
      return res.status(400).json({ error: "Tên danh mục là bắt buộc" });
    }

    // Tạo danh mục mới
    const category = new CategoryModel({ name, description });

    // Lưu vào cơ sở dữ liệu
    const savedCategory = await category.save();

    res.status(201).json({
      message: "Danh mục đã được thêm",
      category: savedCategory,
    });
  } catch (error) {
    res.status(500).json({ error: "Đã có lỗi xảy ra khi thêm danh mục" });
  }
};

// 2. Hiển thị tất cả danh mục
export const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find(); // Lấy tất cả danh mục
    res.status(200).json(categories);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Đã có lỗi xảy ra khi lấy danh sách danh mục" });
  }
};

// 4. Cập nhật danh mục
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    // Cập nhật danh mục
    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      id,
      { name, description },
      { new: true } // Trả về danh mục đã cập nhật
    );

    // Nếu không tìm thấy danh mục
    if (!updatedCategory) {
      return res.status(404).json({ error: "Danh mục không tồn tại" });
    }

    res.status(200).json({
      message: "Danh mục đã được cập nhật",
      updatedCategory,
    });
  } catch (error) {
    res.status(500).json({ error: "Đã có lỗi xảy ra khi cập nhật danh mục" });
  }
};

// 5. Xóa danh mục
export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    // Xóa danh mục
    const deletedCategory = await CategoryModel.findByIdAndDelete(id);

    // Nếu không tìm thấy danh mục
    if (!deletedCategory) {
      return res.status(404).json({ error: "Danh mục không tồn tại" });
    }

    res.status(200).json({
      message: "Danh mục đã được xóa",
      deletedCategory,
    });
  } catch (error) {
    res.status(500).json({ error: "Đã có lỗi xảy ra khi xóa danh mục" });
  }
};
