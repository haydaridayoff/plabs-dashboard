export const toFormData = (obj: any): FormData => {
  const formData = new FormData();

  for (let key in obj) {
    console.log("dawda =", key, obj[key]);
    if (obj.hasOwnProperty(key)) {
      formData.append(key, obj[key]);
    }
  }

  return formData;
};
