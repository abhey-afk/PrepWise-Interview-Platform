"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "@/components/FormField";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { signUp } from "@/lib/actions/auth.action";

// Type for form mode
type FormType = "sign-in" | "sign-up";

// Schema factory based on form type
const authFormSchema = (type: FormType) =>
  z.object({
    name: type === "sign-up" ? z.string().min(3, "Name is required") : z.string().optional(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(5, "Password must be at least 5 characters"),
  });

interface AuthFormProps {
  type: FormType;
}

function AuthForm({ type }: AuthFormProps) {
  const router = useRouter();
  const isSignIn = type === "sign-in";

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { name, email, password } = values;

    try {
      if (isSignIn) {
        // Sign-In flow with NextAuth
        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (result?.error) {
          toast.error("Invalid email or password.");
          return;
        }

        if (result?.ok) {
          toast.success("Signed in successfully.");
          router.push("/interview");
        }
      } else {
        // Sign-Up flow
        const result = await signUp({
          name: name || "",
          email,
          password,
        });

        if (!result?.success) {
          toast.error(result?.message || "Signup failed");
          return;
        }

        toast.success("Account created successfully. Please sign in.");
        router.push("/sign-in");
      }
    } catch (error) {
      console.error("Auth Error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="card-border lg:max-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">PrepWise</h2>
        </div>

        <h3>Practice job interviews with AI</h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full mt-4 form">
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
              />
            )}

            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your Email"
              type="email"
            />

            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />

            <Button className="btn" type="submit">
              {isSignIn ? "Sign in" : "Create account"}
            </Button>
          </form>
        </Form>

        <p className="text-center">
          {isSignIn ? "No account yet?" : "Have an account already?"}
          <Link
            href={isSignIn ? "/sign-up" : "/sign-in"}
            className="font-bold text-user-primary ml-1"
          >
            {isSignIn ? "Sign up" : "Sign in"}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AuthForm;
