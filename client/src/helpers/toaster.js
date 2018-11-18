import { toast } from 'react-toastify';

export const toastSuccess = (message) => {
  toast.dismiss();
  toast.success(message, {
    position: toast.POSITION.TOP_CENTER
  });
};

export const toastError = (message) => {
  toast.dismiss();
  toast.error(message, {
    position: toast.POSITION.TOP_CENTER
  });
};

export const toastWarning = (message) => {
  toast.dismiss();
  toast.warn(message, {
    position: toast.POSITION.TOP_CENTER
  });
};
