import * as yup from "yup";

export const basicdetailsSchema = yup.object({
  firstname: yup.string().required("Firstname required").trim("Can't empty"),
  lastname: yup.string().required("Lastname required").trim("Can't empty"),
  email: yup
    .string()
    .email("Please Enter Valid Email")
    .required("Email required"),
  phonenumber: yup
    .string()
    .required("Phonenumer required")
    .trim("Can't empty")
    .matches(/^[6789]{1}/, "Phonenumber only start with 6,7,8,9")
    .matches(/^[6789]{1}\d{9}$/, "Please enter valid phonenumber"),
  zipcode: yup
    .string()
    .required("Zipcode required")
    .trim("Can't empty")
    .matches(/^[1-9]{1}\d{5}$/, "Please enter valid zipcode first"),
  address: yup.string().required("Address required").trim("Can't empty"),
  city: yup.string().required("City required").trim("Can't empty"),
  state: yup.string().required("State required").trim("Can't empty"),
  dateofbirth: yup.date().required("Dateofbirth required"),
  gender: yup.string().required("Gender required").trim("Can't empty"),
  relationshipstatus: yup
    .string()
    .required("Relationship required")
    .trim("Can't empty"),
});

const bachelorSchema = yup.object({
  isRequired: yup.boolean(),
  nameofcourse: yup.string().when("isRequired", ([value], schema) => {
    return value
      ? schema.required("Cource name required").trim("Can't empty")
      : schema;
  }),
  nameofuniversity: yup.string().when("isRequired", ([value], schema) => {
    return value
      ? schema.required("University name required").trim("Can't empty")
      : schema;
  }),
  passingyear: yup.string().when("isRequired", ([value], schema) => {
    return value
      ? schema.required("Passing year required").trim("Can't empty")
      : schema;
  }),
  percentage: yup.number().when("isRequired", ([value], schema) => {
    return value
      ? schema
          .typeError("Percentage must be a number")
          .required("Percentage required")
          .min(0, "Minimum 0 percentage allow")
          .max(100, "Maximum 100 percentage allow")
      : schema;
  }),
});

const sscSchema = yup.object({
  nameofboard: yup.string().required("Board name required").trim("Can't empty"),
  passingyear: yup
    .string()
    .required("Passingyear required")
    .trim("Can't empty"),
  percentage: yup
    .number()
    .typeError("Percentage must be a number")
    .required("Percentage required")
    .min(0, "Minimum 0 percentage allow")
    .max(100, "Maximum 100 percentage allow"),
  // .test((value, ctx) => {
  //   if (isNaN(Number(value))) {
  //     return ctx.createError({ message: 'Percentage must be a number' });
  //   }
  //   return true
  // }),
});

const educationDetailsSchema = yup.object({
  ssc: sscSchema,
  hsc: sscSchema,
  bachelor: bachelorSchema,
  master: bachelorSchema,
});

const language = yup.object({
  selected: yup.mixed(),
  // yup
  // .mixed()
  // .oneOf([yup.string(), yup.boolean().required("Please Select language")]),
  proficiency: yup.array().test((value, ctx) => {
    const languageSelected: boolean | string = ctx.parent.selected;
    if (languageSelected) {
      let stringCount: number = 0;
      if (value) {
        for (const element of value) {
          if (typeof element === "string") {
            stringCount++;
          }
        }
        if (stringCount !== 0) {
          return true;
        } else {
          console.log(ctx.path);
          return ctx.createError({
            message: "At least one language proficiency select",
            path: `${ctx.path}`,
          });
        }
      }
    } else if (typeof languageSelected === "boolean" && !languageSelected) {
      let stringCount: number = 0;
      if (value) {
        for (const element of value) {
          if (typeof element === "string") {
            stringCount++;
          }
        }
        if (stringCount === 0) {
          return true;
        } else {
          return ctx.createError({
            message: "Please select language",
            path: `${ctx.path}`,
          });
        }
      }
    } else {
      return true;
    }
  }),
});

export const languageSchema = yup.object({
  English: language,
  Gujarati: language,
  Hindi: language,
});

const technologies = yup.object({
  selected: yup.mixed(),
  // proficiency: yup.array().of(yup.string()),
  proficiency: yup
    .mixed()
    .nullable()
    .test((value, ctx) => {
      const technologySelected: boolean | string = ctx.parent.selected;
      if (technologySelected) {
        if (value) {
          return true;
        } else {
          return ctx.createError({
            message: "Please select technology proficiency",
            path: `${ctx.path}`,
          });
        }
      } else if (
        typeof technologySelected === "boolean" &&
        !technologySelected
      ) {
        if (value) {
          return ctx.createError({
            message: "Please select technology",
            path: `${ctx.path}`,
          });
        } else {
          return true;
        }
      } else {
        return true;
      }
    }),
});

const technologiesSchema = yup.object({
  Angular: technologies,
  MySQL: technologies,
  PHP: technologies,
  React: technologies,
});

// const referanceSchema = yup.object({
//   id: yup.array().of(yup.number()).min(0),
//   contactnumber: yup.array().of(
//     yup
//       .string()
//       .required("Contactnumber required")
//       .trim("Can't empty")
//       .matches(/^[6789]{1}/, "Contactnumber only start with 6,7,8,9")
//       .matches(/^[6789]{1}\d{9}$/, "Please enter valid contactnumber"),
//   ),
//   referancename: yup
//     .array()
//     .of(yup.string().required("referancename required").trim("can't empty")),
//   relation: yup
//     .array()
//     .of(yup.string().required("relation required").trim("can't empty")),
// });

const referanceSchema = yup.array().of(
  yup.object({
    id: yup.mixed(),
    contactnumber: yup
      .string()
      .required("Contactnumber required")
      .trim("Can't empty")
      .matches(/^[6789]{1}/, "Contactnumber only start with 6,7,8,9")
      .matches(/^[6789]{1}\d{9}$/, "Please enter valid contactnumber"),
    referancename: yup
      .string()
      .required("referancename required")
      .trim("can't empty"),
    relation: yup.string().required("relation required").trim("can't empty"),
  }),
);

const workExperienceSchema = yup.array().of(
  yup.object().shape({
    id: yup.mixed(), //----temporary
    companyname: yup
      .string()
      .required("companyname required")
      .trim("Can't empty"),
    designation: yup
      .string()
      .required("designation required")
      .trim("Can't empty"),
    from: yup.date().required("please selecte from date"),
    to: yup.date().required("please selecte to date"),
  }),
);

const preferanceSchema = yup.object({
  currentctc: yup
    .string()
    .min(0, "Minimum 0 allow")
    .required("Current CTC required")
    .test((value: string, ctx) => {
      if (isNaN(Number(value))) {
        return ctx.createError({
          message: "only number allow",
          path: "preferance.currentctc",
        });
      } else if (Number(value) < 0) {
        return ctx.createError({
          message: "Minimum 0 allow",
          path: "preferance.currentctc",
        });
      }
      return true;
    }),
  department: yup
    .string()
    .required("Department required")
    .trim("Please select department"),
  expectedctc: yup
    .string()
    .min(0, "Minimum 0 allow")
    .required("Expected CTC required")
    .test((value: string, ctx) => {
      if (isNaN(Number(value))) {
        return ctx.createError({
          message: "only number allow",
          path: "preferance.expectedctc",
        });
      } else if (Number(value) < 0) {
        return ctx.createError({
          message: "Minimum 0 allow",
          path: "preferance.expectedctc",
        });
      }
      return true;
    }),
  noticeperiod: yup
    .string()
    .required("Notice Period required")
    .test((value: string, ctx) => {
      if (isNaN(Number(value))) {
        return ctx.createError({
          message: "only number allow",
          path: "preferance.noticeperiod",
        });
      } else if (Number(value) <= 0) {
        return ctx.createError({
          message: "Minimum 1 day allow",
          path: "preferance.noticeperiod",
        });
      }
      return true;
    }),
  preferedlocation: yup
    .array()
    .of(
      yup
        .string()
        .required("Prefered Location required")
        .trim("Please select preferedlocation"),
    )
    .min(1, "Minimum one locatin select"),
});

export const formSchema = yup.object({
  basicdetails: basicdetailsSchema,
  educationDetails: educationDetailsSchema,
  language: languageSchema,
  technologies: technologiesSchema,
  referance: referanceSchema,
  workexperience: workExperienceSchema,
  preferance: preferanceSchema,
});

export const basicdetailsFormSchema = yup.object({
  basicdetails: basicdetailsSchema,
});

export const educationdetailsFormSchema = yup.object({
  educationdetails: educationDetailsSchema,
});

export const workExperienceFormSchema = yup.object({
  workexperience: workExperienceSchema,
});

export const languageTechnologyFormSchema = yup.object({
  language: languageSchema,
  technologies: technologiesSchema,
});

export const referanceFormSchema = yup.object({
  referance: referanceSchema,
});

export const preferanceFormSchema = yup.object({
  preferance: preferanceSchema,
});
