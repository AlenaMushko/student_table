import { EEmailAction } from "../enums";

export const templates = {
  [EEmailAction.FORGOT_PASSWORD]: {
    templateName: "forgot-password",
    subject: "Do not worry, we control your password",
  },
  [EEmailAction.MANAGER_EMAIL]: {
    templateName: "manager-email",
    subject: "email from autoRia",
  },
};
