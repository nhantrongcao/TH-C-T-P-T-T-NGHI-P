// src/utils/productHelpers.js
export const deleteProductById = async (pid) => {
    try {
      const res = await fetch(`http://localhost:5000/api/product/${pid}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        alert("✅ Xoá thành công!");
        return true;
      } else {
        alert("❌ Xoá thất bại.");
        return false;
      }
    } catch (error) {
      console.error("Lỗi xoá sản phẩm:", error);
      alert("❌ Có lỗi xảy ra khi xoá sản phẩm.");
      return false;
    }
  };
  