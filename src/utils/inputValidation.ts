export const isValidObjField = (obj: Object) => {
  return Object.values(obj).every((value) => value.trim());
};

export const updateError = (
  errorMessage: string,
  field: string,
  stateUpdater: React.Dispatch<
    React.SetStateAction<{
      message: string;
      field: string;
    }>
  >
) => {
  stateUpdater({ message: errorMessage, field });
  setTimeout(() => {
    stateUpdater({ message: "", field: "" });
  }, 2500);
};

export const isValidEmail = (value: string) => {
  const regx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return regx.test(value);
};
