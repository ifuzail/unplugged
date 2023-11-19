"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";
import { ProfileValidation } from "@/lib/validations";
import { useGetUserById, useUpdateUser } from "@/lib/react-query/queryAndMutation";
import { Loading } from "@/components/shared/Loading";
import { Edit2Icon } from "lucide-react";
import { ProfileUploader } from "@/components/shared/ProfileUploader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EmojiBar } from "@/components/shared/EmojiBar";

const UpdateProfile = () => {
    const router = useRouter();
    const { toast } = useToast();
    const {profileId} = useParams();
    const {user, setUser} = useUserContext();
    
    const form = useForm({
        resolver: zodResolver(ProfileValidation),
        defaultValues: {
          file: [],
          name: user ? user?.name : '',
          username: user ? user?.username : '',
          email: user ? user?.email : '',
          bio: user ? user.bio || "" : '',
        },
      });

      const { data: currentUser } = useGetUserById(profileId || "");
      const { mutateAsync: updateUser, isLoading: isLoadingUpdate } =
        useUpdateUser()

        if (!currentUser)
        return (
          <div className="flex-center w-full h-full">
            <Loading />
          </div>
        );

        const handleUpdate = async (value) => {
            const updatedUser = await updateUser({
              userId: currentUser.$id,
              name: value.name,
              bio: value.bio,
              file: value.file,
              imageUrl: currentUser.imageUrl,
              imageId: currentUser.imageId,
            });
        
            if (!updatedUser) {
              toast({
                title: `Update user failed. Please try again.`,
              });
            }
        
            setUser({
              ...user,
              name: updatedUser?.name,
              bio: updatedUser?.bio,
              imageUrl: updatedUser?.imageUrl,
            });
            return router.push(`/profile/${profileId}`);
          }; 

  return (
    <ScrollArea className="bg-zinc-900 w-full h-screen p-3">
         <div className="p-5">
        <div className="flex items-center gap-2 mt-10 justify-start">
          <Edit2Icon size={28}/>
          <h2 className='font-bold text-2xl text-zinc-200'>Edit Profile</h2>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdate)}
            className="flex flex-col gap-9 w-full max-w-5xl p-3 mt-5">
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem className="flex">
                  <FormControl>
                    <ProfileUploader
                      fieldChange={field.onChange}
                      mediaUrl={currentUser.imageUrl}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" className='bg-zinc-800 border-none' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className='bg-zinc-800 border-none'
                      {...field}
                      disabled
                    />
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
                    <Input
                      type="text"
                      className='bg-zinc-800 border-none'
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                  <div className="relative">
                  <Textarea {...field}  className='bg-zinc-800 border-none'/>
                  <div className="absolute top-7 right-4 z-10">
                        <EmojiBar
                          onChange={(emoji) => field.onChange(`${field.value} ${emoji}`)}
                        />
                  </div>
                </div>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <div className="flex gap-4 items-center justify-end">
              <Button
                type="button"
                className="shad-button_dark_4"
                onClick={() => router.back()}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="shad-button_primary whitespace-nowrap"
                disabled={isLoadingUpdate}>
                {isLoadingUpdate && <Loading />}
                Update Profile
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </ScrollArea>
  )
}
export default UpdateProfile;