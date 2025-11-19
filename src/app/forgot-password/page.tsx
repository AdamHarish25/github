import AuthLayout from "@/components/auth-layout";
import { ForgotPasswordForm } from "@/components/forgot-password-form";
import { Suspense } from "react";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <ForgotPasswordForm />
      </Suspense>
    </AuthLayout>
  );
}
