import openai from "@/lib/openai/config";

export async function POST(req) {
  try {
    const { message } = await req.json();

   

  } catch (error) {
    console.log(error);
  }
}
