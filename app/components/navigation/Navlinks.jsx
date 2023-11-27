import { navlinks } from "@/constants";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queryAndMutation";
import { useEffect } from "react";

export const Navlinks = () => {
  
  const router = useRouter();
  const { mutateAsync: signOut, isSuccess } = useSignOutAccount();
  const pathname = usePathname();

  useEffect(() => {
    if (isSuccess) {
      router.push("/login");
    }
  }, [isSuccess]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col space-y-1 ">
        {navlinks
          .filter((navlink) => navlink.Url !== null)
          .map((navlink) => {
            
            const isActive = pathname === navlink.Url;

            return (
              <div key={navlink.id}>
                <Link
                  href={navlink.Url}
                  className={`flex items-center gap-2 hover:bg-light-3 p-5 rounded-lg transition mx-2 text-zinc-300 ${
                    isActive && "font-bold text-primary-600"
                  }`}
                >
                  <i>{navlink.image}</i> <span>{navlink.Title}</span>
                </Link>
              </div>
            );
          })}

        {navlinks
          .filter((navlink) => navlink.Url === null)
          .map((navlink) => {
            return (
              <Popover key={navlink.id}>
                <PopoverTrigger
                  asChild
                  className="flex items-center gap-2 hover:bg-zinc-950 p-5 rounded-lg transition mx-2 text-zinc-300"
                >
                  <div>
                    <i>{navlink.image}</i>
                    <span>{navlink.Title}</span>
                  </div>
                </PopoverTrigger>
                <PopoverContent className='bg-zinc-700 border-none '>
                  <Button
                    onClick={() => signOut()} 
                  >
                    <h1 className="base-regular text-zinc-100 ">Logout</h1>
                  </Button>
                </PopoverContent>
              </Popover>
            );
          })}
      </div>
    </div>
  );
};
