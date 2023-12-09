"use client";


import { AiInputFormValidation } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/app/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/components/ui/form";
import { Textarea } from "../ui/textarea";
import {openai} from "@/lib/openai/config";


export const AiChatInput = () => {

  const form = useForm({
    resolver: zodResolver(AiInputFormValidation),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = async (values) => {
   try {
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ 
            role: "system", 
            content: values }],
            model: "gpt-3.5-turbo",
      });

      console.log(chatCompletion.choices[0]);

   } catch (error) {
     console.log(error);
   }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex flex-col gap-2 w-full">
                  <Textarea
                    placeholder="ask Anything..."
                    {...field}
                    className="bg-dark-3 border-none"
                  />
                    <Button
                      onSubmit={onSubmit}
                      type="submit"
                      className='shad-button_gradient'
                      disabled="">
                        Generate
                    </Button>
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
