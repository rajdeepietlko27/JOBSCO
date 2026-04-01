import qs from "query-string";
export const recruiterOnBoardFormControls = [
  {
    label: "Name",
    name: "name",
    placeholder: "Enter your name",
    componentType: "input",
  },
  {
    label: "Company",
    name: "companyName",
    placeholder: "Enter your Company Name",
    componentType: "input",
  },
  {
    label: "Company Role",
    name: "companyRole",
    placeholder: "Enter your company role",
    componentType: "input",
  },
];

export const initialRecruiterFormData = {
  name: "",
  companyName: "",
  companyRole: "",
};

export const candidateOnboardFormControls = [
  {
    label: "Resume",
    name: "resume",
    componentType: "file",
  },
  {
    label: "Name",
    name: "name",
    placeholder: "Enter your name",
    componentType: "input",
  },
  {
    label: "Current Company",
    name: "currentCompany",
    placeholder: "Enter your current company",
    componentType: "input",
  },
  {
    label: "Current Job Location",
    name: "currentJobLocation",
    placeholder: "Enter your Current Job Location",
    componentType: "input",
  },
  {
    label: "preffered Job Location",
    name: "prefferedJobLocation",
    placeholder: "Enter your preffered Job Location",
    componentType: "input",
  },
  {
    label: "Current salary",
    name: "currentSalary",
    placeholder: "Enter your Current Salary",
    componentType: "input",
  },
  {
    label: "Notice Period",
    name: "noticePeriod",
    placeholder: "Enter your Current Notice Period",
    componentType: "input",
  },
  {
    label: "Skills",
    name: "skills",
    placeholder: "Enter your Current Skills",
    componentType: "input",
  },
  {
    label: "Previous companies ",
    name: "previousCompanies",
    placeholder: "Enter your previous companies",
    componentType: "input",
  },
  {
    label: "Total Experience ",
    name: "totalExperience",
    placeholder: "Enter your Total Experience",
    componentType: "input",
  },
  {
    label: "College ",
    name: "college",
    placeholder: "Enter your College",
    componentType: "input",
  },
  {
    label: "College Location",
    name: "collegeLocation",
    placeholder: "Enter your College Location",
    componentType: "input",
  },
  {
    label: "Graduated Year",
    name: "graduatedYear",
    placeholder: "Enter your Graduated Year",
    componentType: "input",
  },
  {
    label: "Linknedin profile",
    name: "linknedinProfile",
    placeholder: "Enter your Linknedin profile",
    componentType: "input",
  },
  {
    label: "github profile",
    name: "githubProfile",
    placeholder: "Enter your github profile",
    componentType: "input",
  },
];

export const initialCaandidateFormDta = {
  resume: "",
  name: "",
  currentCompany: "",
  currentJobLocation: "",
  prefferedJobLocation: "",
  currentSalary: "",
  noticePeriod: "",
  skills: "",
  previousCompanies: "",
  totalExperience: "",
  college: "",
  collegeLocation: "",
  graduatedYear: "",
  linknedinProfile: "",
  githubProfile: "",
};

export const postNewJobsFormControls = [
  {
    label: "Company Name",
    name: "companyName",
    placeholder: "Company Name",
    componentType: "input",
    disabled: true,
  },
  {
    label: "Title",
    name: "title",
    placeholder: "Title",
    componentType: "input",
  },
  {
    label: "Type",
    name: "type",
    placeholder: "Job Type",
    componentType: "input",
  },
  {
    label: "Location",
    name: "location",
    placeholder: "Job Location",
    componentType: "input",
  },
  {
    label: "Experience",
    name: "experience",
    placeholder: "Experience",
    componentType: "input",
  },
  {
    label: "Description",
    name: "description",
    placeholder: "Description",
    componentType: "input",
  },
  {
    label: "Skills",
    name: "skills",
    placeholder: "Skills",
    componentType: "input",
  },
];

export const initialPostNewJobsFormData = {
  companyName: "",
  title: "",
  type: "",
  location: "",
  experience: "",
  description: "",
  skills: "",
};

export const filterMenuDataArray = [
  {
    id: "companyName",
    label: "Company Name",
  },
  {
    id: "title",
    label: "Title",
  },
  {
    id: "type",
    label: "Type",
  },
  {
    id: "location",
    label: "Location",
  },
];

export function formUrlQuery({ params, dataToAdd }) {
  let currentURL = qs.parse(params);

  if (Object.keys(dataToAdd).length > 0) {
    Object.keys(dataToAdd).map((key) => {
      if (dataToAdd[key].length === 0) delete currentURL[key];
      else currentURL[key] = dataToAdd[key].join(",");
    });
  }
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentURL,
    },
    {
      skipNull: true,
    },
  );
}
