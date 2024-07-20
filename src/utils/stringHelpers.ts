import { FormikErrors, FormikTouched } from "formik";

export const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const getStringForBadgeFromFormikErrors = (
  errors: string | FormikErrors<any> | string[] | FormikErrors<any>[] | undefined,
  touched: FormikTouchedType
) => touched && errors 
  ? Array.isArray(errors) 
    ? errors.join(', ') 
    : errors.toString() 
  : 0