"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/app/components/ui/form";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";

import { useToast } from "@/app/components/ui/use-toast";
import {useSignInAccount } from "@/lib/react-query/queryAndMutation";
import { useUserContext } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "@/lib/validations";



const LoginPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();


  //mutations//
  const { mutateAsync: signInAccount } =
    useSignInAccount();

  const form = useForm({
    resolver: zodResolver(LoginForm),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });
    if (!session) {
      return toast({
        title: "Sign In failed. Please try again.",
      });
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      router.push("/");
    } else {
      return toast({
        title: "Sign up failed. Please try again",
      });
    }
  };

  return (
    <>
      <Form {...form}>
        <div className="flex-center">
          <div className="sm:w-420 flex-center flex-col p-5">
              <Image
                src="/eleevan-logo-white.svg"
                width={120}
                height={120}
                alt="logo"
              />
              <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
                Login to your account
              </h2>
              <p  className="text-light-3 small-medium md:base-regular mt-2">
              Welcome to Eleevan, Please enter your details
              </p>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="shad-form_label">email</FormLabel>
                    <FormControl>
                      <Input  type="text" className="shad-input" {...field} />
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
                    <FormLabel className="shad-form_label">password</FormLabel>
                    <FormControl>
                      <Input type="password" className="shad-input" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="py-2">
                <Button type="submit" className="shad-button_primary">
                  {isUserLoading ? (
                    <div>Loading...</div>
                  ) : (
                    "Log in"
                  )}
                </Button>
              </div>
              <p className="text-small-regular text-light-2 text-center mt-2">
              Don&apos;t have an account?
              <Link
                href="/signup"
                className="text-primary-500 text-small-semibold ml-1">
                Sign up
              </Link>
            </p>
            </form>
          </div>
          <Image 
            src='/cover-image.jpg'
            width={1000}
            height={1000}
            alt="image"
            className="hidden xl:block h-screen w-[70%] object-cover opacity-70"
            />
        </div>
      </Form>
    </>
  );
};

export default LoginPage;
