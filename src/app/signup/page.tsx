import AuthLayout from "@/components/auth-layout";
import { SignupForm } from "@/components/signup-form";
import { Suspense } from "react";

export default function SignupPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <SignupForm />
      </Suspense>
    </AuthLayout>
  );
}
