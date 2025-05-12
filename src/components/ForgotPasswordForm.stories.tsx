import { ForgotPasswordForm } from "./ForgotPasswordForm";

export default {
  title: "Components/ForgotPasswordForm",
  component: ForgotPasswordForm,
};

export const Default = () => (
  <ForgotPasswordForm onBackToLogin={() => alert("Back to login clicked")} />
);
