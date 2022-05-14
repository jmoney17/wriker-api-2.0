import { object, string, TypeOf } from "zod";

const payload = {
  body: object({
    fullName: string({
      required_error: "Full Name is required",
    }),
    contactNumber: string({
      required_error: "Contact Number is required",
    }),
    emailAddress: string({
      required_error: "Email Address is required",
    }),
    createdBy: string({
      required_error: "Created By is required",
    }),
  }),
};

const params = {
  params: object({
    id: string({
      required_error: "Contact Id is required",
    }),
  }),
};

export const createContactSchema = object({
  ...payload,
});

export const updateContactSchema = object({
  ...payload,
  ...params,
});

export const deleteContactSchema = object({
  ...params,
});

export const getContactSchema = object({
  ...params,
});

export type CreateContactInput = TypeOf<typeof createContactSchema>;
export type UpdateContactInput = TypeOf<typeof updateContactSchema>;
export type ReadContactInput = TypeOf<typeof getContactSchema>;
export type DeleteContactInput = TypeOf<typeof deleteContactSchema>;