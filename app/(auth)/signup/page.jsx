"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/components/ui/form";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";

import { useToast } from "@/app/components/ui/use-toast";
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queryAndMutation";
import { useUserContext } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { SignUpForm } from "@/lib/validations";
import { Loading } from "@/app/components/shared/Loading";


const SignUpPage = () => {

  const router = useRouter();
  const { toast } = useToast();

  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  //mutations//
  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } =
    useCreateUserAccount();

  const { mutateAsync: signInAccount, isPending: isSigningIn } =
    useSignInAccount();
  //mutations//

  const form = useForm({
    resolver: zodResolver(SignUpForm),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    const newUser = await createUserAccount(values);

    if (!newUser) {
      return toast({
        title: "Sign up failed. Please try again",
      });
    }

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
      <Form {...form}>
        <div className="flex justify-center my-5">
          <div className="sm:w-420 flex-center flex-col p-7 bg-dark-3">
              <Image 
                src="/logo.svg"
                width={160}
                height={200}
                alt="logo"
                className="bg-primary-500 p-3"
              />
              <h2 className="h3-bold md:h2-bold mt-5 ">Create a new account</h2>
              <p className="text-light-4 small-medium md:base-regular mt-2 text-center">Welcome to Unplugged, Please enter your details</p>

            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4" >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="shad-form_label">name</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} className="shad-input" />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="shad-form_label">username</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} className="shad-input"/>
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
                    <FormLabel className="shad-form_label">email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} className="shad-input" />
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
                      <Input type="password" {...field}  className="shad-input"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
        
              <Button type="submit" className="shad-button_primary" onSubmit={onSubmit}>
                {isCreatingAccount || isSigningIn || isUserLoading ? (
                  <div  className="flex-center gap-2">
                    <Loading /> Loading...
                  </div>
                  ) : (
                    "Sign Up"
                  )}
              </Button>
            
              <p className="text-small-regular text-light-2 text-center mt-2">
              Already have an account?
              <Link
                href="/login"
                className="text-primary-500 text-small-semibold ml-1">
                Log in
              </Link>
            </p>
            </form>
          </div>
        </div>
      </Form>
  );
};

export default SignUpPage;
