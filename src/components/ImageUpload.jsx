import { useEffect, useState } from "react";
import { uploadStorageFile, validateImageFile } from "../utils/supabaseHelpers";
import { toastError } from "../components/Toast";

const ImageUploader = ({
  label,
  value,
  onChange,
  folder = "products",
  bucket = "product-images",
  multiple = false,
}) => {
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [previews]);

  const handleFiles = async (files) => {
    const fileArray = Array.from(files);
    const invalid = fileArray.find((file) => validateImageFile(file));

    if (invalid) {
      toastError("Invalid image", validateImageFile(invalid));
      return;
    }

    const localPreviews = fileArray.map((file) => URL.createObjectURL(file));
    if (multiple) {
      setPreviews((prev) => [...prev, ...localPreviews]);
    } else {
      setPreviews(localPreviews);
    }

    setUploading(true);
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 14, 90));
    }, 180);

    try {
      const uploadedUrls = [];
      for (let file of fileArray) {
        const { publicUrl } = await uploadStorageFile(file, { bucket, folder });
        uploadedUrls.push(publicUrl);
      }

      if (multiple) {
        onChange([...(value || []), ...uploadedUrls]);
      } else {
        onChange(uploadedUrls[0]);
      }
      setProgress(100);
    } catch (err) {
      toastError("Upload failed", err.message || "Try again later.");
    } finally {
      clearInterval(progressInterval);
      setUploading(false);
      setTimeout(() => setProgress(0), 300);
    }
  };

  return (
    <div className="space-y-3">
      <p className="font-medium">{label}</p>

      <div
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-lime-500 transition"
      >
        <input
          type="file"
          accept="image/*"
          multiple={multiple}
          hidden
          id={label}
          onChange={(e) => handleFiles(e.target.files)}
        />

        <label htmlFor={label} className="cursor-pointer block">
          {uploading ? "Uploading image..." : "Drag & Drop image here or Click to browse"}
        </label>

        {uploading && (
          <div className="mt-4">
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-lime-500 transition-all" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-2 text-xs text-gray-500">{progress}%</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {previews.map((src, i) => (
          <img
            key={`preview-${i}`}
            src={src}
            alt={`preview-${i}`}
            className="h-24 rounded-lg object-cover border"
          />
        ))}

        {!multiple && value && previews.length === 0 && (
          <img src={value} alt="saved" className="h-24 rounded-lg object-cover border" />
        )}

        {multiple && value?.length > 0 && previews.length === 0 &&
          value.map((img, i) => (
            <img key={`saved-${i}`} src={img} alt={`saved-${i}`} className="h-24 rounded-lg object-cover border" />
          ))}
      </div>
    </div>
  );
};

export default ImageUploader;
