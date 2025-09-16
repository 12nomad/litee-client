import Link from "next/link";
import Image from "next/image";
import SignInForm from "@/app/authentication/sign-in/components/sign-in-form";
import Button from "@/components/shared/button";
import Google from "@/public/assets/google.png";
// import Github from "@/public/assets/github.png";

function SignInPage() {
  return (
    <div className="w-[375px]">
      <h3 className="text-lg font-bold">Get Started Now</h3>
      <p className="text-sm font-medium">Please sign in to continue</p>
      <div className="flex items-center gap-2 my-8">
        <Button variant="outline" fullWidth>
          <Image
            src={Google}
            alt="google"
            className="w-4 h-4 mr-1 object-contain"
          />
          <p>Continue with Google</p>
        </Button>
        {/* <Button variant="outline">
          <Image src={Github} alt="github" className="w-4 h-4 object-contain" />
          <p>Log in with Github</p>
        </Button> */}
      </div>
      <div className="flex items-center gap-2">
        <div className="w-full h-[1px] bg-black/40 rounded-lg"></div>
        <p className="text-sm font-bold pb-1 text-black/60 text-nowrap">
          or continue with email
        </p>
        <div className="w-full h-[1px] bg-black/40 rounded-lg"></div>
      </div>

      <SignInForm />

      <p className="text-sm font-medium mt-8">
        Don&apos;t have an account yet?{" "}
        <Link href={"/authentication/sign-up"}>
          <span className="text-caribbean font-bold">Sign up.</span>
        </Link>
      </p>
    </div>
  );
}

export default SignInPage;
