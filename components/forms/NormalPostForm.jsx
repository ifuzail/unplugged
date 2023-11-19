"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Textarea } from "../ui/textarea"
import { FileUploader } from "../shared/FileUploader"
import {NormalPostValidation } from "@/lib/validations"
import { useUserContext } from "@/context/AuthContext"
import { useToast } from "../ui/use-toast"
import { useRouter } from "next/navigation"
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queryAndMutation"
import { EmojiBar } from "../shared/EmojiBar"

export const NormalPostForm = ({ post, action}) => {

  const router = useRouter();
  const { toast } = useToast()
  const { user } = useUserContext();
  const {mutateAsync: createPost , isPending: isLoadingCreate } = useCreatePost();
  const {mutateAsync: updatePost , isPending: isLoadingUpdate } = useUpdatePost();

  const form = useForm({
    resolver: zodResolver(NormalPostValidation),
    defaultValues: {
      caption: post ? post?.caption : '',
      file: [],
      location: post ? post?.location : '',
      tags: post ? post.tags.join(',') : ''
    },
  })


  const onSubmit = async (values) => {
    if(post && action === 'update') {
      const updatedPost = await updatePost({
        ...values,
        postId: post.$id,
        imageId: post?.imageId,
        imageUrl: post?.imageUrl,
      })

      if(!updatedPost) {
        toast({ title: 'please try again'})
      }

      return router.push(`/post/${post.$id}`)
    }

     const newPost = await createPost({
      ...values,
      userId: user.id,
     })

     if(!newPost) {
      toast({
        title: "Please try again"
      })
     }
      
     router.push('/');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl p-3">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Caption</FormLabel>
              <FormControl>
                <div className="relative">
                  <Textarea placeholder='caption' {...field}  className='bg-zinc-800 border-none'/>
                  <div className="absolute top-7 right-4 z-10">
                        <EmojiBar
                          onChange={(emoji) => field.onChange(`${field.value} ${emoji}`)}
                        />
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Photos</FormLabel>
              <FormControl>
               <FileUploader
                 fieldChange={field.onChange}
                 mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Location</FormLabel>
              <FormControl>
             <Input type='text' className='bg-zinc-800 border-none'
             {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Tags (separated by comma " , ")</FormLabel>
              <FormControl>
             <Input 
             {...field}
             type='text' 
             className='bg-zinc-800 border-none'
             placeholder='Cats, Dogs, Birds...'
             />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row gap-2 ">
        <Button 
        onClick={() => router.back()}
        type="button" 
        variant='ghost'
        >Cancel</Button>
        <Button
            onSubmit={onSubmit}
            type="submit"
            variant='green'
            className='hover:text-white hover:bg-zinc-800'
            disabled={isLoadingCreate || isLoadingUpdate}
        >
          {isLoadingCreate || isLoadingUpdate && 'Loading...'}
          {action} Post
        </Button>
        </div>
      </form>
    </Form>
  )
}
