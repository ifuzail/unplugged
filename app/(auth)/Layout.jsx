import { useUserContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function AuthLayout({ children }) {
  const router = useRouter();
  const { isAuthenticated, user } = useUserContext();
  return (
    <>
      {isAuthenticated || user ? (
        router.push("/")
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            {children}
          </section>
        </>
      )}
    </>
  );
}
