const initalState = {
  vendor_id: null,
  fname: null,
  lname: null,
  phone: null,
  personal_email: null,
  email: null,
  project: null,
  primary_skill: null,
  secondary_skill: null,
  experience: null,
  relationship: null,
  alternate_no: null,
  resident_address: null,
  resume: null,
  us_shift: null,
  uk_shift: null,
  can_relocate: null,
  contract_start_date: null,
  contract_end_date: null,
  contract_file: null,
  checklist: null,
  other_docs: null,
  passing_year: null,
  pan_link: null,
  aadhar: null,
  pf_opt_out_form_link: null,
  cost: null,
  l1: null,

  vendor_id_error: null,
  fname_error: null,
  lname_error: null,
  phone_error: null,
  personal_email_error: null,
  email_error: null,
  project_error: null,
  primary_skill_error: null,
  secondary_skill_error: null,
  experience_error: null,
  relationship_error: null,
  alternate_no_error: null,
  resident_address_error: null,
  resume_error: null,
  us_shift_error: null,
  uk_shift_error: null,
  can_relocate_error: null,
  contract_start_date_error: null,
  contract_end_date_error: null,
  contract_file_error: null,
  checklist_error: null,
  other_docs_error: null,
  passing_year_error: null,
  pan_link_error: null,
  aadhar_error: null,
  pf_opt_out_form_link_error: null,
  cost_error: null,
  l1_error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'vendor_id':
      return {
        ...state,
        vendor_id: action.payload,
      };
    case 'fname':
      return {
        ...state,
        fname: action.payload,
      };
    case 'lname':
      return {
        ...state,
        lname: action.payload,
      };
    case 'phone':
      return {
        ...state,
        phone: action.payload,
      };
    case 'personal_email':
      return {
        ...state,
        personal_email: action.payload,
      };
    case 'email':
      return {
        ...state,
        email: action.payload,
      };
    case 'project':
      return {
        ...state,
        project: action.payload,
      };
    case 'primary_skill':
      return {
        ...state,
        primary_skill: action.payload,
      };
    case 'secondary_skill':
      return {
        ...state,
        secondary_skill: action.payload,
      };
    case 'experience':
      return {
        ...state,
        experience: action.payload,
      };
    case 'relationship':
      return {
        ...state,
        relationship: action.payload,
      };
    case 'alternate_no':
      return {
        ...state,
        alternate_no: action.payload,
      };
    case 'resident_address':
      return {
        ...state,
        resident_address: action.payload,
      };
    case 'resume':
      return {
        ...state,
        resume: action.payload,
      };
    case 'us_shift':
      return {
        ...state,
        us_shift: action.payload,
      };
    case 'uk_shift':
      return {
        ...state,
        uk_shift: action.payload,
      };
    case 'can_relocate':
      return {
        ...state,
        can_relocate: action.payload,
      };
    case 'contract_start_date':
      return {
        ...state,
        contract_start_date: action.payload,
      };
    case 'contract_end_date':
      return {
        ...state,
        contract_end_date: action.payload,
      };
    case 'contract_file':
      return {
        ...state,
        contract_file: action.payload,
      };
    case 'checklist':
      return {
        ...state,
        checklist: action.payload,
      };
    case 'other_docs':
      return {
        ...state,
        other_docs: action.payload,
      };
    case 'passing_year':
      return {
        ...state,
        passing_year: action.payload,
      };
    case 'pan_link':
      return {
        ...state,
        pan_link: action.payload,
      };
    case 'aadhar':
      return {
        ...state,
        aadhar: action.payload,
      };
    case 'pf_opt_out_form_link':
      return {
        ...state,
        pf_opt_out_form_link: action.payload,
      };
    case 'cost':
      return {
        ...state,
        cost: action.payload,
      };
    case 'l1':
      return {
        ...state,
        l1: action.payload,
      };

    case 'vendor_id_error':
      return {
        ...state,
        vendor_id_error: action.payload,
      };
    case 'fname_error':
      return {
        ...state,
        fname_error: action.payload,
      };
    case 'lname_error':
      return {
        ...state,
        lname_error: action.payload,
      };
    case 'phone_error':
      return {
        ...state,
        phone_error: action.payload,
      };
    case 'personal_email_error':
      return {
        ...state,
        personal_email_error: action.payload,
      };
    case 'email_error':
      return {
        ...state,
        email_error: action.payload,
      };
    case 'project_error':
      return {
        ...state,
        project_error: action.payload,
      };
    case 'primary_skill_error':
      return {
        ...state,
        primary_skill_error: action.payload,
      };
    case 'secondary_skill_error':
      return {
        ...state,
        secondary_skill_error: action.payload,
      };
    case 'experience_error':
      return {
        ...state,
        experience_error: action.payload,
      };
    case 'relationship_error':
      return {
        ...state,
        relationship_error: action.payload,
      };
    case 'alternate_no_error':
      return {
        ...state,
        alternate_no_error: action.payload,
      };
    case 'resident_address_error':
      return {
        ...state,
        resident_address_error: action.payload,
      };
    case 'resume_error':
      return {
        ...state,
        resume_error: action.payload,
      };
    case 'us_shift_error':
      return {
        ...state,
        us_shift_error: action.payload,
      };
    case 'uk_shift_error':
      return {
        ...state,
        uk_shift_error: action.payload,
      };
    case 'can_relocate_error':
      return {
        ...state,
        can_relocate_error: action.payload,
      };
    case 'contract_start_date_error':
      return {
        ...state,
        contract_start_date_error: action.payload,
      };
    case 'contract_end_date_error':
      return {
        ...state,
        contract_end_date_error: action.payload,
      };
    case 'contract_file_error':
      return {
        ...state,
        contract_file_error: action.payload,
      };
    case 'checklist_error':
      return {
        ...state,
        checklist_error: action.payload,
      };
    case 'other_docs_error':
      return {
        ...state,
        other_docs_error: action.payload,
      };
    case 'passing_year_error':
      return {
        ...state,
        passing_year_error: action.payload,
      };
    case 'pan_link_error':
      return {
        ...state,
        pan_link_error: action.payload,
      };
    case 'aadhar_error':
      return {
        ...state,
        aadhar_error: action.payload,
      };
    case 'pf_opt_out_form_link_error':
      return {
        ...state,
        pf_opt_out_form_link_error: action.payload,
      };
    case 'cost_error':
      return {
        ...state,
        cost_error: action.payload,
      };
    case 'l1_error':
      return {
        ...state,
        l1_error: action.payload,
      };

    default:
      return state;
  }
};

export {initalState, reducer};
