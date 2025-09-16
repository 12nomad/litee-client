import Link from "next/link";
import Image from "next/image";
import SignUpForm from "@/app/authentication/sign-up/components/sign-up-form";
import Button from "@/components/shared/button";
import Google from "@/public/assets/google.png";
// import Github from "@/public/assets/github.png";

function SignUpPage() {
  return (
    <div className="w-[375px]">
      <h3 className="text-lg font-bold">Get Started Now</h3>
      <p className="text-sm font-medium">Create your free account</p>
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

      <SignUpForm />

      <p className="text-sm font-medium mt-8">
        Already have an account?{" "}
        <Link href={"/authentication/sign-in"}>
          <span className="text-caribbean font-bold">Sign in.</span>
        </Link>
      </p>
    </div>
  );
}

export default SignUpPage;
