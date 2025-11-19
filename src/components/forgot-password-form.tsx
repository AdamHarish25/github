"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase/config";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export function ForgotPasswordForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, values.email);
      setSubmitted(true);
      toast({
        title: "Check your email",
        description: "A password reset link has been sent to your email address.",
      });
    } catch (error: any) {
      let message = "An unknown error occurred. Please try again.";
      // Firebase doesn't throw user-not-found on password reset for security reasons
      // So we show a generic message
      toast({
        title: "Request Failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (submitted) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Request Sent</CardTitle>
                <CardDescription>If an account exists for {form.getValues("email")}, you will receive an email with instructions to reset your password.</CardDescription>
            </CardHeader>
            <CardFooter>
                 <Button variant="outline" className="w-full" asChild>
                    <Link href="/login">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Log In
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Forgot Password?</CardTitle>
        <CardDescription>No worries, we'll send you reset instructions.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="name@example.com" {...field} className="pl-10" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              Send Reset Link
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-center">
         <Button variant="link" asChild>
            <Link href="/login">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Log In
            </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
