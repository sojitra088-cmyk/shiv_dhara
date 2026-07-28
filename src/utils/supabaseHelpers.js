import { supabase } from "../supabase";

export const DEFAULT_BUCKET = "product-images";

export const getStoragePathFromUrl = (url) => {
  if (!url || typeof url !== "string") return null;

  try {
    const parsed = new URL(url);
    const route = parsed.pathname;

    const match = route.match(/\/storage\/v1\/object\/public\/([^/]+)\/(.+)/);
    if (!match) return null;

    return decodeURIComponent(match[2]);
  } catch {
    return null;
  }
};

export const uploadStorageFile = async (
  file,
  { bucket = DEFAULT_BUCKET, folder = "products" } = {}
) => {
  if (!file) throw new Error("No file provided for upload.");

  const ext = file.name.split('.').pop().toLowerCase();
  const safeName = file.name
    .replace(/[^a-zA-Z0-9.-_]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 10)}-${safeName}`;

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, { upsert: false });

  if (uploadError) {
    throw uploadError;
  }

  const { data: publicUrlData, error: publicUrlError } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName);

  if (publicUrlError) {
    throw publicUrlError;
  }

  return { publicUrl: publicUrlData.publicUrl, path: fileName };
};

export const deleteStorageFile = async (publicUrl, bucket = DEFAULT_BUCKET) => {
  const path = getStoragePathFromUrl(publicUrl);
  if (!path) return;

  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) {
    throw error;
  }
};

export const validateImageFile = (file, maxBytes = 5 * 1024 * 1024) => {
  if (!file) return "No file selected.";

  if (!file.type.startsWith("image/")) {
    return "Only image files are supported.";
  }

  if (file.size > maxBytes) {
    return `Image must be smaller than ${Math.round(maxBytes / 1024 / 1024)}MB.`;
  }

  return null;
};
