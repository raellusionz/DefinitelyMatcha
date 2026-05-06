import React, { useState, useEffect, use } from "react";
import merchantProductService from "./MerchProductService";


const ProductModal = ({isOpen, onClose, merchant_id, onProductAdded, productToEdit}) => {
  const [pdtName, setPdtName] = useState("")
  const [pdtPrice, setPdtPrice] = useState("")
  const [pdtCategory, setPdtCategory] = useState("")
  const [pdtDesc, setPdtDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isEditMode = !!productToEdit;

  useEffect(() => {
    if (productToEdit) {
      setPdtName(productToEdit.pdt_name|| ""),
      setPdtPrice(productToEdit.pdt_price|| ""),
      setPdtCategory(productToEdit.pdt_category|| ""),
      setPdtDesc(productToEdit.pdt_desc|| "")
    } else {
      setPdtName("");
      setPdtPrice("");
      setPdtCategory("");
      setPdtDesc("");
    } 
    setError(null);

  },[productToEdit, isOpen])

  const handleUpdateAddButton = async() => {
    try {
      setLoading(true)
      setError(null)

      let savedProduct;

      if (isEditMode) {
        
        const response = await merchantProductService.updateSingleProductMerchantPg(
          productToEdit.merchant_pdt_id,
          pdtCategory,
          pdtName,
          pdtPrice,
          pdtDesc
        );

        savedProduct = response.data?.updatedProduct ?? {
          ...productToEdit,
          pdt_name: pdtName,
          pdt_price: pdtPrice,
          pdt_category: pdtCategory,
          pdt_desc: pdtDesc,
        };

      } else {

        const response = await merchantProductService.addSingleProductMerchantPg(
          merchant_id,
          pdtName,
          pdtPrice,
          pdtCategory
        );
        savedProduct = response.data?.newProduct ?? null;

      }

      onProductAdded(savedProduct);
      onClose(); 

    } catch (err) {
        setError(isEditMode ? "Failed to update product." : "Failed to add product.");
        console.error(err);

    } finally {
        setLoading(false)
    }
  } 

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-6 mx-4">
        <div className="flex items-center justify-between mb-5">
          
          <h2 className="text-lg font-bold text-gray-900">
              {isEditMode ? "Edit Product" : "Add New Product"}
          </h2>

          <button onClick={onClose} className="text-sm text-gray-500">
            Close
          </button>

        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-500">Product Name</label>
            <input
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm mt-1"
              placeholder="e.g. Matcha Latte"
              value={pdtName}
              onChange={(e) => setPdtName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Price ($)</label>
            <input
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm mt-1"
              placeholder="e.g. 6.50"
              type="number"
              value={pdtPrice}
              onChange={(e) => setPdtPrice(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Category</label>
            <select
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm mt-1"
              value={pdtCategory}
              onChange={(e) => setPdtCategory(e.target.value)}
            >
                <option value="">Select category</option>
                <option value="Beverages">Beverages</option>
                <option value="Desserts">Desserts</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-500">Description</label>
                <textarea
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm mt-1"
                    placeholder="e.g. A refreshing matcha drink"
                    value={pdtDesc}
                    onChange={(e) => setPdtDesc(e.target.value)}
                    rows={3}
                />
            </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            onClick={handleUpdateAddButton}
            disabled={loading}
            className="w-full py-3 bg-gray-900 text-white rounded-xl text-sm font-medium disabled:opacity-50"
          >
             {loading
              ? isEditMode
                ? "Saving..."
                : "Adding..."
              : isEditMode
              ? "Save Changes"
              : "Add Product"}
          </button>
        </div>
      </div>
    </div>
  );


}

export default ProductModal