"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { StoryValidation } from "@/lib/validations";
import { useUserContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { StoryFileUploader } from "@/components/uploaders/StoryFileUploader";
import { useCreateStory } from "@/lib/react-query/queryAndMutation";


const CreateStoryForm = () => {
  const router = useRouter();
  const { user } = useUserContext();
  const { mutateAsync: createStory, isPending: isStoryLoading } =
    useCreateStory();

  const form = useForm({
    resolver: zodResolver(StoryValidation),
    defaultValues: {
      file: [],
    },
  });

  const onSubmit = async (values) => {
    await createStory({
      ...values,
      userId: user.id,
    });
    router.push("/");
  };

  return (
    <section className="bg-dark-3 w-full container-scroll p-3 ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-9 w-full max-w-5xl p-3">
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='shad-form_label'>Add Photo To Story</FormLabel>
                <FormControl>
                  <StoryFileUploader fieldChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row gap-2 ">
            <Button onClick={() => router.back()} type="button" variant="ghost">
              Cancel
            </Button>
            <Button
              onSubmit={onSubmit}
              type="submit"
              className="shad-button_primary base-medium "
              disabled={isStoryLoading}>
              {isStoryLoading}
              upload
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default CreateStoryForm;
