"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useToast } from "@/components/ui/use-toast";
import {
  useSignInAccount,
} from "@/lib/react-query/queryAndMutation";
import { useUserContext } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "@/lib/validations";



const LoginPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  // we are getting mutation function and isloading parameter from usecreateuserAccount func. and we rename mutateasync to createuseraccount.

  //mutations//
  const { mutateAsync: signInAccount } =
    useSignInAccount();
  //mutations//

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
        <div className="p-10 md:absolute md:z-10 md:top-16 top-16 md:left-[30%] bg-zinc-950 rounded-lg mx-10 md:my-0 my-4">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <Image
              src="/eleevan-logo-white.svg"
              width={170}
              height={170}
              alt="logo"
              className="md:mx-[100px] mx-auto"
            />
            <h2 className="text-center md:text-3xl font-bold mt-5 text-primary-Eleevan">
              Login to your account
            </h2>
            <p className="text-center text-xs text-zinc-300 mt-1 ">
             Welcome to Eleevan, Please enter your details
            </p>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} className='text-zinc-900'/>
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
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="py-2">
              <Button type="submit" variant="green">
                {isUserLoading ? (
                  <div>Loading...</div>
                ) : (
                  "Login"
                )}
              </Button>
            </div>
            <p className="text-small-regular text-light-2 text-center mt-2">
            Not registered?
            <Link
              href="/signup"
              className="text-blue-300 text-sm font-semibold ml-1 hover:text-blue-500">
              Sign up
            </Link>
          </p>
          </form>
        </div>
      </Form>

      <div className="md:w-full md:relative ">
        <img
          className="object-cover w-full md:block hidden h-screen opacity-20"
          src="/login-image.jpg"
        />
      </div>
    </>
  );
};

export default LoginPage;
