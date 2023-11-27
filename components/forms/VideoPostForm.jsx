"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { VideoPostValidation } from "@/lib/validations";
import { useUserContext } from "@/context/AuthContext";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import {
  useCreateVideoPost,
  useUpdateVideoPost,
} from "@/lib/react-query/queryAndMutation";
import { VideoFileUploader } from "../uploaders/VideoFileUploader";
import { FileUploader } from "../uploaders/FileUploader";
import { EmojiBar } from "../shared/EmojiBar";

export const VideoPostForm = ({ videoPost, action }) => {

  const router = useRouter();
  const { toast } = useToast();
  const { user } = useUserContext();

  const { mutateAsync: createVideoPost, isPending: isLoadingCreate } =
    useCreateVideoPost();
  const { mutateAsync: updateVideoPost, isPending: isLoadingUpdate } =
    useUpdateVideoPost();

  const form = useForm({
    resolver: zodResolver(VideoPostValidation),
    defaultValues: {
      caption: videoPost ? videoPost?.caption : "",
      videoFile: [],
      location: videoPost ? videoPost?.location : "",
      tags: videoPost ? videoPost.tags.join(",") : "",
      imageFile: [],
    },
  });

  const onSubmit = async (values) => {
    if (videoPost && action === "update") {
      const updatedVideoPost = await updateVideoPost({
        ...values,
        videoPostId: videoPost.$id,
        videoUrl: videoPost?.videoUrl,
        videoId: videoPost?.videoId,
        imageId: videoPost?.imageId,
        imageUrl: videoPost?.imageUrl,
      });

      if (!updatedVideoPost) {
        toast({ title: "please try again" });
      }

      return router.push(`/post/${videoPost.$id}`);
    }
    const newPost = await createVideoPost({
      ...values,
      userId: user.id,
    });

    if (!newPost) {
      toast({
        title: "Please try again",
      });
    }

    router.push("/");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl p-3">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <div className="relative">
                  <Textarea
                    placeholder="caption"
                    {...field}
                    className="shad-textarea custom-scrollbar"
                  />
                  <div className="absolute top-7 right-4 z-10">
                    <EmojiBar
                      onChange={(emoji) =>
                        field.onChange(`${field.value} ${emoji}`)
                      }
                    />
                  </div>
                </div>
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="videoFile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Videos</FormLabel>
              <FormControl>
                <VideoFileUploader
                  fieldChange={field.onChange}
                  mediaUrl={videoPost?.videoUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageFile"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Thumbnail</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={videoPost?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
                <Input
                   type="text"
                   className="shad-input"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label"> Add Tags (separated by comma &quot; , &quot;)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  className="shad-input"
                  placeholder="Cats, Dogs, Birds..."
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <div className="flex items-center flex-row gap-2">
          <Button onClick={() => router.back()}
           type="button" 
           variant="ghost"
           >
            Cancel
          </Button>
          <Button
            onSubmit={onSubmit}
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            disabled={isLoadingCreate || isLoadingUpdate}>
            {isLoadingCreate || (isLoadingUpdate && "Loading...")}
            {action} Post
          </Button>
        </div>
      </form>
    </Form>
  );
};
