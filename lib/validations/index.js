import * as z from "zod";

export const SignUpForm = z.object({
    username: z.string().min(4),
    name: z.string().min(2, { message: "Too Short" }),
    email: z.string().email(),
    password: z.string().min(8, { message: "password must be of 8 characters" }),
  });

export const LoginForm = z.object({
    email: z.string().email(),
    password: z.string().min(8, { message: "password must be of 8 characters" }),
  });

export const NormalPostValidation = z.object({
   caption: z.string().min(5).max(2200),
   file: z.custom(),
   location: z.string().min(2).max(100),
   tags: z.string(),
})
export const VideoPostValidation = z.object({
   caption: z.string().min(5).max(2200),
   videoFile: z.custom(),
   location: z.string().min(2).max(100),
   tags: z.string(),
   imageFile: z.custom(),
})