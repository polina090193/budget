import { FormikErrors } from "formik";

export const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const getStringForBadgeFromFormikErrors = (
  errors: string | FormikErrors<unknown> | string[] | FormikErrors<unknown>[] | undefined,
  touched: FormikTouchedType
) => touched && errors 
  ? Array.isArray(errors) 
    ? errors.join(', ') 
    : errors.toString() 
  : 0