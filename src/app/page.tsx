import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Footer from "@/components/layouts/footer";

export default function Home() {
  return (
    <section className=" h-screen flex items-center justify-center ">
      <div className="grid gap-2">
        {/* <h1 className="tracking-tight text-xl">Welcome to starkwager</h1>
        <Link
          className={cn(buttonVariants({ variant: "default" }))}
          href="/auth"
        >
          Login to continue
        </Link> */}
      </div>
      <Footer />
    </section>
  );
}
