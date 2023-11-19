"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { CommentFormValidation } from "@/lib/validations";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

import { EmojiBar } from "../shared/EmojiBar";
import { SendIcon } from "lucide-react";
import Image from "next/image";
import { useCreateComment } from "@/lib/react-query/queryAndMutation";
import { useUserContext } from "@/context/AuthContext";

export const CommentForm = ({post}) => {

  const {user} = useUserContext();
  const { toast } = useToast();
  const {mutateAsync: createComment, isPending} = useCreateComment();

  const form = useForm({
    resolver: zodResolver(CommentFormValidation),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = async (values) => {
    const newComment = await createComment({
      ...values,
      postId: post.$id,
      userId: user.id,
    });

    if (!newComment) {
      toast({
        title: "Please try again",
      });

      form.reset();
    }

    else {
        form.reset();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-row gap-4 w-full items-center">
        <div>
           <Image
            width={500}
            height={500}
            src={user?.imageUrl || '/default-user.png'}
            className="w-16 h-16 rounded-xl object-cover object-top"
           />
        </div>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Textarea
                    placeholder="comment here"
                    {...field}
                    className="bg-zinc-900 border-none md:w-[500px] w-[250px]"
                  />
                  <div className="absolute top-8 right-4 z-10 flex gap-2  items-center">
                    <EmojiBar
                      onChange={(emoji) =>
                        field.onChange(`${field.value} ${emoji}`)
                      }
                    />
                    <Button
                      onSubmit={onSubmit}
                      type="submit"
                      variant="ghost"
                      size="icon"
                      disabled="">
                      <SendIcon className="w-5 h-5 text-zinc-500" />
                    </Button>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
