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
  } from "@/app/components/ui/form";
import { useToast } from "@/app/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";
import { ProfileValidation } from "@/lib/validations";
import { useGetUserById, useUpdateUser } from "@/lib/react-query/queryAndMutation";
import { Loading } from "@/app/components/shared/Loading";
import { Edit2Icon } from "lucide-react";
import { ProfileUploader } from "@/app/components/uploaders/ProfileUploader";
import { Button } from "@/app/components/ui/button";
import { Textarea } from "@/app/components/ui/textarea";
import { Input } from "@/app/components/ui/input";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { EmojiBar } from "@/app/components/shared/EmojiBar";

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
    <ScrollArea className="bg-dark-3 w-full h-screen p-3">
         <div className="p-5">
        <div className="flex items-center gap-2 mt-10 justify-start">
          <Edit2Icon size={28}/>
          <h2 className='h2-bold text-light-2'>Edit Profile</h2>
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
                  <FormMessage className='shad-form_message'/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='shad-form_label'>Name</FormLabel>
                  <FormControl>
                    <Input type="text" className='shad-input' {...field} />
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
                  <FormLabel className='shad-form_label'>Username</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className='shad-input'
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
                  <FormLabel className='shad-form_label'>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className='shad-input'
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
                  <FormLabel className='shad-form_label'>Bio</FormLabel>
                  <FormControl>
                  <div className="relative">
                  <Textarea {...field}  className='shad-textarea'/>
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
                className='shad-button_ghost'
                onClick={() => router.back()}>
                Cancel
              </Button>
              <Button
                type="submit"
                className='shad-button_dark_4'
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