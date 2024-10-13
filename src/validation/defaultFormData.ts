const basicDetailsData = {
  firstname: "",
  lastname: "",
  email: "",
  phonenumber: "",
  zipcode: "",
  address: "",
  dateofbirth: new Date(),
  gender: "Male",
  relationshipstatus: "",
};

const educationOptionSSC = {
  nameofboard: "",
  passingyear: new Date(),
  percentage: "",
};

const educationOptionBachelor = {
  nameofcource: "",
  nameofuniversity: "",
  passingyear: new Date(),
  percentage: "",
};

const educationDetailsData = {
  ssc: educationOptionSSC,
  hsc: educationOptionSSC,
  bachelor: undefined,
  master: undefined,
};

const workExperienceData = [
  {
    id: "",
    companyname: "",
    designation: "",
    from: new Date(),
    to: new Date(),
  },
];

const languageData = {
  English: {
    selected: false,
    proficiency: [false, false, false],
  },
  Gujarati: {
    selected: false,
    proficiency: [false, false, false],
  },
  Hindi: {
    selected: false,
    proficiency: [false, false, false],
  },
};

const technologiesData = {
  Angular: {
    selected: false,
    proficiency: false,
  },
  MySQL: {
    selected: false,
    proficiency: false,
  },
  PHP: {
    selected: false,
    proficiency: false,
  },
  React: {
    selected: false,
    proficiency: false,
  },
};

const referanceData = [
  {
    id: "",
    contactnumber: "",
    referancename: "",
    relation: "",
  },
];

const preferanceData = {
  currentctc: "",
  department: "",
  expectedctc: "",
  noticeperiod: "",
  preferedlocation: [],
};

export const defaultFormData = {
  basicdetails: basicDetailsData,
  educationdetails: educationDetailsData,
  workexperience: workExperienceData,
  language: languageData,
  technologies: technologiesData,
  referance: referanceData,
  preferance: preferanceData,
};
