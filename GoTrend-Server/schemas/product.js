import Joi from "joi";

export const productSchema = Joi.object({
  name: Joi.string().required().trim().min(3).messages({
    "any.required": "Tên sản phẩm là trường bắt buộc",
    "string.empty": "Tên sản phẩm không được để trống",
    "string.trim": "Tên sản phẩm không được chứa khoảng trắng dư thừa",
    "string.min": "Tên sản phẩm phải có ít nhất 3 ký tự",
  }),
  images: Joi.array()
    .items(
      Joi.string().uri().messages({
        "string.uri": "Hình ảnh phải là URL hợp lệ",
      })
    )
    .min(1)
    .required()
    .messages({
      "any.required": "Hình ảnh là trường bắt buộc",
      "array.min": "Phải có ít nhất một hình ảnh",
    }),
  originalPrice: Joi.number().required().min(0).messages({
    "any.required": "Giá ban đầu là trường bắt buộc",
    "number.base": "Giá ban đầu phải là số",
    "number.min": "Giá ban đầu không được nhỏ hơn 0",
  }),
  discountPrice: Joi.number()
    .required()
    .min(0)
    .messages({
      "any.required": "Giá bán là trường bắt buộc",
      "number.base": "Giá bán phải là số",
      "number.min": "Giá bán không được nhỏ hơn 0",
    })
    .custom((value, helpers) => {
      const { originalPrice } = helpers.state.ancestors[0];
      if (value > originalPrice) {
        return helpers.message("Giá bán không được lớn hơn giá ban đầu");
      }
      return value;
    }),
  quantity: Joi.number().required().min(0).messages({
    "any.required": "Số lượng là trường bắt buộc",
    "number.base": "Số lượng phải là số",
    "number.min": "Số lượng không được nhỏ hơn 0",
  }),
  description: Joi.string().required().min(10).messages({
    "any.required": "Mô tả sản phẩm là trường bắt buộc",
    "string.empty": "Mô tả sản phẩm không được để trống",
    "string.min": "Mô tả sản phẩm phải có ít nhất 10 ký tự",
  }),
  category: Joi.string().required().messages({
    "any.required": "Danh mục sản phẩm là trường bắt buộc",
    "string.empty": "Danh mục sản phẩm không được để trống",
  }),

  status: Joi.string()
    .valid("Còn hàng", "Hết hàng", "Ngừng bán")
    .default("Còn hàng")
    .messages({
      "any.only":
        "Trạng thái sản phẩm phải là 'Còn hàng', 'Hết hàng' hoặc 'Ngừng bán'",
    }),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional(),
});
