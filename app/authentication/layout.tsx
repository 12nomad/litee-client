import { ReactNode } from "react";
import Image from "next/image";
import Project from "@/public/assets/project.svg";
import CloudLeft from "@/public/assets/cloud_left.svg";
import CloudRight from "@/public/assets/cloud_right.svg";
import Logo from "@/public/assets/logo.png";

interface Props {
  children: ReactNode;
}

function AuthenticationLayout({ children }: Props) {
  return (
    <div className="h-screen grid place-items-center overflow-hidden bg-caribbean relative">
      <div className="w-6xl mx-auto">
        <div className="h-[750px] flex shadow rounded-lg bg-white">
          <div className="h-full basis-1/2 m-4 relative">
            <Image
              src={Logo}
              alt="logo"
              className="w-12 h-12 object-contain absolute top-0 left-0"
              priority
            />
            <div className="h-full grid place-items-center p-12">
              {children}
            </div>
          </div>
          <div className="basis-1/2 m-4 bg-caribbean text-white rounded-lg">
            <div className="h-full grid place-items-center">
              <div>
                <Image
                  src={Project}
                  alt="project"
                  className="w-[80%] mx-auto object-contain"
                  priority
                />
                {/* !FIXME: change this description */}
                <div className="text-center">
                  <h2 className="text-lg font-bold">
                    Take Charge of Your Finances with Ease!
                  </h2>
                  <p className="text-sm max-w-[70%] mx-auto mt-1">
                    Simplify Budgeting and Expense Tracking with a Powerful Yet
                    Intuitive Finance Management Tool
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clouds */}
      <Image
        src={CloudLeft}
        alt="cloud_left"
        className="w-96 absolute -left-45 -bottom-45 rotate-45"
      />
      <Image
        src={CloudRight}
        alt="cloud_right"
        className="w-96 absolute -left-15 -bottom-60 -rotate-12"
      />
      <Image
        src={CloudRight}
        alt="cloud_right"
        className="w-96 absolute -right-30 -bottom-50 -rotate-12"
      />
    </div>
  );
}

export default AuthenticationLayout;
