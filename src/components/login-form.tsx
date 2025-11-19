"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/components/icons";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
} from "firebase/auth";
import { useAuth } from "@/firebase";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const auth = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSocialLoading, setIsSocialLoading] = React.useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: searchParams.get("email") || "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!auth) return;
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      router.push("/dashboard");
    } catch (error: any) {
      let message = "An unknown error occurred.";
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password" || error.code === 'auth/invalid-credential') {
        message = "Invalid email or password. Please try again.";
      }
      toast({
        title: "Login Failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const socialLogin = async (providerName: 'google' | 'microsoft') => {
    if (!auth) return;
    setIsSocialLoading(providerName);
    try {
        let provider;
        if (providerName === 'google') {
            provider = new GoogleAuthProvider();
        } else {
            provider = new OAuthProvider('microsoft.com');
        }
        await signInWithPopup(auth, provider);
        router.push("/dashboard");
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: "Could not sign in with the selected provider. Please try again.",
        variant: "destructive",
      });
    } finally {
        setIsSocialLoading(null);
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>Enter your credentials to access your account.</CardDescription>
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <FormLabel>Password</FormLabel>
                    <Link href="/forgot-password" passHref>
                        <Button variant="link" className="p-0 h-auto text-xs">Forgot password?</Button>
                    </Link>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input type="password" placeholder="••••••••" {...field} className="pl-10" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading || !auth}>
              {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              Log In
            </Button>
          </form>
        </Form>
        <div className="relative my-6">
          <Separator />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="bg-card px-2 text-xs text-muted-foreground">OR CONTINUE WITH</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" onClick={() => socialLogin('google')} disabled={!!isSocialLoading || !auth}>
             {isSocialLoading === 'google' ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : <Icons.Google className="mr-2 h-4 w-4" />}
            Google
          </Button>
          <Button variant="outline" onClick={() => socialLogin('microsoft')} disabled={!!isSocialLoading || !auth}>
            {isSocialLoading === 'microsoft' ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : <Icons.Outlook className="mr-2 h-4 w-4" />}
            Outlook
          </Button>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link href="/signup" className="font-semibold text-primary hover:underline">
                Sign up
            </Link>
        </p>
      </CardContent>
    </Card>
  );
}
