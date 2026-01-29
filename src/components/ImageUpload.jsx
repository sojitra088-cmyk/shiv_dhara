import { useState } from "react";
import { supabase } from "../supabase";

const ImageUploader = ({
  label,
  value,
  onChange,
  folder = "products",
  multiple = false
}) => {
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState([]);

  // Upload one file
  const uploadFile = async (file) => {
    const ext = file.name.split(".").pop();
    const fileName = `${folder}/${Date.now()}-${Math.random()}.${ext}`;

    const { error } = await supabase.storage
      .from("product-images")
      .upload(fileName, file);

    if (error) throw error;

    const { data } = supabase.storage
      .from("product-images")
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  // Handle selected / dropped files
  const handleFiles = async (files) => {
    const fileArray = Array.from(files);

    // 1️⃣ SHOW LOCAL PREVIEW IMMEDIATELY
    const localPreviews = fileArray.map((file) =>
      URL.createObjectURL(file)
    );

    if (multiple) {
      setPreviews((prev) => [...prev, ...localPreviews]);
    } else {
      setPreviews(localPreviews);
    }

    // 2️⃣ UPLOAD TO SUPABASE
    setUploading(true);

    try {
      const uploadedUrls = [];
      for (let file of fileArray) {
        const url = await uploadFile(file);
        uploadedUrls.push(url);
      }

      // 3️⃣ SAVE URL TO PARENT STATE
      if (multiple) {
        onChange([...(value || []), ...uploadedUrls]);
      } else {
        onChange(uploadedUrls[0]);
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <p className="font-medium">{label}</p>

      {/* DROP ZONE */}
      <div
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
        onDragOver={(e) => e.preventDefault()}
        className="
          border-2 border-dashed border-gray-300
          rounded-xl p-6 text-center cursor-pointer
          hover:border-lime-500 transition
        "
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
          {uploading
            ? "Uploading image..."
            : "Drag & Drop image here or Click to browse"}
        </label>
      </div>

      {/* 🔥 PREVIEW SECTION */}
      <div className="grid grid-cols-3 gap-3">
        {/* LOCAL PREVIEW (INSTANT) */}
        {previews.map((src, i) => (
          <img
            key={`preview-${i}`}
            src={src}
            className="h-24 rounded-lg object-cover border"
          />
        ))}

        {/* SAVED IMAGE (EDIT MODE / AFTER UPLOAD) */}
        {!multiple && value && previews.length === 0 && (
          <img
            src={value}
            className="h-24 rounded-lg object-cover border"
          />
        )}

        {multiple && value?.length > 0 && previews.length === 0 &&
          value.map((img, i) => (
            <img
              key={`saved-${i}`}
              src={img}
              className="h-24 rounded-lg object-cover border"
            />
          ))}
      </div>
    </div>
  );
};

export default ImageUploader;
