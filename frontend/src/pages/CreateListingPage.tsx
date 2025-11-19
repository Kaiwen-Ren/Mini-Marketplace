// src/pages/CreateListingPage.tsx
import React, { useState, useRef } from "react";
import { apiPost } from "../api";
import { useUser } from "../UserContext";

const MAX_DESCRIPTION_LENGTH = 255;

const CreateListingPage: React.FC = () => {
  const { currentUserId } = useUser();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);

  // 新增：图片文件 + 预览 + ref
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    // 前端简单校验
    if (description.length > MAX_DESCRIPTION_LENGTH) {
      setDescriptionError(
        `Description cannot exceed ${MAX_DESCRIPTION_LENGTH} characters.`
      );
      return;
    }

    const numericPrice = Number(price);
    if (Number.isNaN(numericPrice) || numericPrice < 0) {
      setError("Price must be a non-negative number");
      return;
    }

    if (!imageFile) {
      setError("Please upload an image for your listing.");
      return;
    }

    setSubmitting(true);

    try {
      // 1️⃣ 上传图片到后端 /api/upload
      const formData = new FormData();
      formData.append("file", imageFile);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        throw new Error("Failed to upload image");
      }

      const uploadJson = await uploadRes.json();
      const imageUrl = uploadJson.url as string;

      // 2️⃣ 创建 listing
      await apiPost("/api/listings", {
        title,
        description,
        price: numericPrice,
        imageUrl,
        sellerId: currentUserId,
      });

      // 清空所有内容
      setMessage("Listing created successfully!");
      setTitle("");
      setDescription("");
      setPrice("");
      setImageFile(null);
      setImagePreview(null);
      setDescriptionError(null);

      // ⭐ 清空 <input type="file"> 的实际值
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setShowSuccessModal(true);
    } catch (err: any) {
      setError(err.message || "Failed to create listing");
    } finally {
      setSubmitting(false);
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className="max-w-xl space-y-4">
      <h2 className="text-3xl font-semibold text-gray-900">
        Create Listing
      </h2>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit} className="card">
        <div className="card-body">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Listing details</legend>

            {/* Title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Baby stroller, crib, etc."
              />
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                className={`textarea ${
                  descriptionError ? "border-red-400" : ""
                }`}
                value={description}
                onChange={(e) => {
                  const value = e.target.value;
                  setDescription(value);

                  if (value.length > MAX_DESCRIPTION_LENGTH) {
                    setDescriptionError(
                      `Description cannot exceed ${MAX_DESCRIPTION_LENGTH} characters.`
                    );
                  } else {
                    setDescriptionError(null);
                  }
                }}
                rows={3}
                placeholder="Condition, brand, how long it’s been used..."
              />

              {descriptionError && (
                <p className="text-xs text-red-500 mt-1">
                  {descriptionError}
                </p>
              )}
              <p className="text-xs text-gray-500">
                {description.length}/{MAX_DESCRIPTION_LENGTH}
              </p>
            </div>

            {/* Price */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">$</span>
                <input
                  className="input flex-1"
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  placeholder="50.00"
                />
              </div>
            </div>

            {/* Image upload */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Image</span>
              </label>
              <input
                type="file"
                accept="image/*"
                className="input"
                ref={fileInputRef} 
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setImageFile(file ?? null);

                  if (file) {
                    const previewUrl = URL.createObjectURL(file);
                    setImagePreview(previewUrl);
                  } else {
                    setImagePreview(null);
                  }
                }}
              />

              <p className="mt-1 text-xs text-gray-500">
                Upload a clear photo of your item.
              </p>

              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-32 w-32 object-cover rounded-md border border-gray-200"
                  />
                </div>
              )}
            </div>
          </fieldset>

          <div className="card-actions justify-end mt-2">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting || descriptionError !== null}
            >
              {submitting ? "Creating..." : "Create listing"}
            </button>
          </div>
        </div>
      </form>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal">
          <div className="modal-backdrop" onClick={closeSuccessModal} />
          <div className="modal-box">
            <button
              type="button"
              className="modal-close"
              onClick={closeSuccessModal}
              aria-label="Close"
            >
              ×
            </button>
            <h3 className="modal-title">Listing created</h3>
            <p className="modal-body-text">
              Your listing has been created successfully.
            </p>
            <div className="modal-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={closeSuccessModal}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateListingPage;
