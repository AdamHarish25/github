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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/components/icons";
import { Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
} from "firebase/auth";
import { useAuth } from "@/firebase";

const formSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export function SignupForm() {
  const router = useRouter();
  const auth = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSocialLoading, setIsSocialLoading] = React.useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!auth) return;
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: values.username,
        });
      }
      toast({
        title: "Account Created",
        description: "You have successfully signed up.",
      });
      router.push("/dashboard");
    } catch (error: any) {
      let message = "An unknown error occurred.";
      if (error.code === "auth/email-already-in-use") {
        message = "This email is already in use.";
      }
      toast({
        title: "Sign Up Failed",
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
        title: "Sign Up Failed",
        description: "Could not sign up with the selected provider. Please try again.",
        variant: "destructive",
      });
    } finally {
        setIsSocialLoading(null);
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create an Account</CardTitle>
        <CardDescription>Enter your details below to get started.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="John Doe" {...field} className="pl-10" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                  <FormLabel>Password</FormLabel>
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
              Create Account
            </Button>
          </form>
        </Form>
        <div className="relative my-6">
          <Separator />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="bg-card px-2 text-xs text-muted-foreground">OR SIGN UP WITH</span>
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
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-primary hover:underline">
                Log in
            </Link>
        </p>
      </CardContent>
    </Card>
  );
}
