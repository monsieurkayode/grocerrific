export const caps = (str) => {
  const temp = str.toLowerCase();
  return `${temp[0].toUpperCase()}${temp.substr(1)}`;
};

export const validateForm = (formData, create = true) => {
  const minLength = 3;
  const maxLength = 30;
  const fields = ['name', 'quantity', 'price'];
  const exp = /[a-zA-Z ]+[0-9]*$/gi;
  const errors = {};

  if (create) {
    fields.forEach((field) => {
      if (!Object.keys(formData).includes(field)) {
        errors[field] = `${caps(field)} is required`;
      }
    });
  }

  Object.entries(formData).forEach(([key, value]) => {
    if (!fields.includes(key)) return;
    const inputLength = value.toString().trim().length;

    if (!inputLength) { errors[key] = `${caps(key)} is required`; }
    if (inputLength && inputLength < minLength && key === 'name') {
      errors[key] = `${caps(key)} too short`;
    }
    if (inputLength && inputLength > maxLength && key === 'name') {
      errors[key] = `${caps(key)} too long`;
    }
    if (inputLength >= minLength
      && inputLength <= maxLength
      && key === 'name') {
      exp.test(value)
        ? null
        : errors[key] = `${caps(key)} is invalid (e.g Granola 5gram)`;
    }
    if (inputLength && fields.slice(1).includes(key)) {
      Number.isNaN(Number(value)) || (!Number.isNaN(Number(value)) && value < 0)
        ? errors[key] = `Invalid value for ${caps(key)}` : false;
    }
  });

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
