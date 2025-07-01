import { create } from "zustand";

export const useProductStore = create((set, get) => ({
  products: [],

  setProducts: (products) => set({ products }),

  fetchProducts: async () => {
    try {
      const res = await fetch("/api/products"); // proxy orqali backendga
      const data = await res.json();

      if (!res.ok) {
        console.error("Fetch failed:", data.message);
        return;
      }

      set({ products: data.data }); // Agar backend `data: []` qilib qaytarsa
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },

  deleteProduct: async (pid) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, message: data.message || "Failed to delete product." };
      }

      // Mahsulotni holatdan o‘chirish
      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));

      return { success: true, message: "Product deleted successfully." };
    } catch (error) {
      return { success: false, message: "Server error: " + error.message };
    }
  },

  updateProduct: async (pid, updatedProduct) => {
  try {
    const res = await fetch(`/api/products/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Failed to update product.",
      };
    }

    // Mahsulotni local holatda yangilash
    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? data.data : product
      ),
    }));

    return {
      success: true,
      message: "Product updated successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: "Server error: " + error.message,
    };
  }
},


  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return {
        success: false,
        message: "Please fill in all fields.",
      };
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          success: false,
          message: data.message || "Failed to create product.",
        };
      }

      set((state) => ({
        products: [...state.products, data.data],
      }));

      return {
        success: true,
        message: "Product added successfully.",
      };
    } catch (error) {
      return {
        success: false,
        message: "Server error: " + error.message,
      };
    }
  },
}));
