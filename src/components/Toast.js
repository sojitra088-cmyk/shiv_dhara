import Swal from "sweetalert2";

const defaultOptions = {
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true,
  background: "#111827",
  color: "#f8fafc",
};

export const toastSuccess = (title, text) =>
  Swal.fire({
    ...defaultOptions,
    icon: "success",
    title,
    text,
  });

export const toastError = (title, text) =>
  Swal.fire({
    ...defaultOptions,
    icon: "error",
    title,
    text,
  });

export const toastWarning = (title, text) =>
  Swal.fire({
    ...defaultOptions,
    icon: "warning",
    title,
    text,
  });

export const confirmDialog = async ({ title, text, confirmButtonText = "Yes", cancelButtonText = "Cancel" }) =>
  Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#84cc16",
    cancelButtonColor: "#d33",
    confirmButtonText,
    cancelButtonText,
  });
