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
  useCreateUserAccount,
  useSignInAccount,
} from "@/lib/react-query/queryAndMutation";
import { useUserContext } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { SignUpForm } from "@/lib/validations";


const SignUpPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  // we are getting mutation function and isloading parameter from usecreateuserAccount func. and we rename mutateasync to createuseraccount.

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
    <>
      <Form {...form}>
        <div className="p-10 md:absolute md:z-10 md:top-10 top-16 bg-zinc-900 rounded-lg mx-10 md:my-0 my-4">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <Image
              src="/eleevan-logo.svg"
              width={170}
              height={100}
              alt="logo"
              className="md:mx-[100px] mx-auto"
            />
            <h2 className="text-center md:text-3xl font-bold  mt-5">
              Create a new account
            </h2>
            <p className="text-center text-xs text-zinc-300 mt-1 ">
              To use Eleevan, Please enter your details
            </p>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} className='text-zinc-900' />
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
                  <FormLabel>username</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} className='text-zinc-900'/>
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
                    <Input type="password" {...field} className='text-zinc-900'/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="py-2">
              <Button type="submit" variant="secondary">
                {isCreatingAccount || isSigningIn || isUserLoading ? (
                  <div>Loading...</div>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </div>
            <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link
              href="/login"
              className="text-blue-300 text-sm font-semibold ml-1 hover:text-blue-500">
              Log in
            </Link>
          </p>
          </form>
        </div>
      </Form>

      <div className="md:w-full md:relative ">
        <video
          className="object-cover w-full md:block hidden h-screen opacity-20"
          src="/eleevan-video.mp4"
          type="video/mp4"
          autoPlay
          loop
          muted
        />
      </div>
    </>
  );
};

export default SignUpPage;
