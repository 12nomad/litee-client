import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/24/outline";
import { ArrowUpRight } from "lucide-react";
import Button from "@/components/app/shared/Button";
import Customer1 from "@/public/assets/customer-1.jpg";
import Customer2 from "@/public/assets/customer-2.jpg";
import Customer3 from "@/public/assets/customer-3.jpg";
import Customer4 from "@/public/assets/customer-4.jpg";
import Customer5 from "@/public/assets/customer-5.jpg";
import Customer6 from "@/public/assets/customer-6.jpg";
import Card from "@/public/assets/card.svg";
import Vector1 from "@/public/assets/Vector1.svg";
import Vector2 from "@/public/assets/Vector2.svg";
import Vector3 from "@/public/assets/Vector3.svg";
import WelcomeNavbar from "@/components/app/welcome/WelcomeNavbar";

const customers = [
  Customer1,
  Customer2,
  Customer3,
  Customer4,
  Customer5,
  Customer6,
] as const;

function WelcomePage() {
  return (
    <div className="max-w-7xl w-full mx-auto">
      <WelcomeNavbar />

      <div className="h-[calc(100vh-64px)] flex flex-col justify-between">
        <div className="h-[80%] grid grid-cols-2 items-center justify-center gap-10">
          <div className="h-full grid place-items-center">
            <div>
              <div>
                <h1 className="text-5xl font-bold leading-14">
                  Finally Take Complete Charge of Your Finances, Without the
                  Overwhelm
                </h1>
                <h4 className="text-lg mt-4 mb-8">
                  Discover Our Powerful Yet Incredibly Simple Finance Management
                  Tool Designed to Make Budgeting and Expense Tracking
                  Effortless for Everyone
                </h4>
              </div>
              <div className="mb-8">
                <Button variant="primary" rounded>
                  <Link href="/authentication/sign-in" className="font-medium">
                    <p>Get Started</p>
                  </Link>
                  <ArrowUpRight className="size-4" />
                </Button>
                <div className="flex items-center gap-4 mt-4">
                  <ul className="flex items-center ml-2">
                    {customers.map((el) => (
                      <li
                        key={el.src}
                        className="w-10 h-10 border-2 border-white rounded-full -ml-2"
                      >
                        <Image
                          src={el}
                          alt="user1"
                          className="w-full h-full rounded-full"
                        />
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col items-start text-sm">
                    <p>
                      <span className="text-caribbean font-bold">
                        250.000+{" "}
                      </span>{" "}
                      <span>Active user</span>
                    </p>
                    <p className="text-left">accross the world!</p>
                  </div>
                </div>
              </div>
              <div className="text-caribbean">
                <div className="flex items-center gap-2">
                  <StarIcon className="size-5" />
                  <p className="font-medium">
                    Your Top Financial Ally for 2025
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <Image src={Card} alt="credit_card" className="w-full h-full" />
            <Image
              src={Vector1}
              alt="vertor_1"
              className="absolute bottom-[20%] -left-[15%] scale-x-[-1] -rotate-[20deg] size-32"
            />
            <Image
              src={Vector2}
              alt="vertor_2"
              className="absolute top-[10%] left-[20%] -rotate-[20deg] size-8"
            />
            <Image
              src={Vector3}
              alt="vertor_3"
              className="absolute top-[30%] -right-0 rotate-[20deg] size-8"
            />
          </div>
        </div>

        <div className="h-[20%] grid place-items-center">
          <div className="w-full grid grid-cols-4 justify-items-end">
            <p>What Makes Our Users So Happy About Our App?</p>
            <div>
              <p className="text-xl font-black uppercase text-nowrap font-stroke">
                01.
              </p>
              <p className="text-3xl font-bold">Generous Free Tier</p>
            </div>
            <div>
              <p className="text-xl font-black uppercase text-nowrap font-stroke">
                02.
              </p>
              <p className="text-3xl font-bold">Valuable Insights</p>
            </div>
            <div>
              <p className="text-xl font-black uppercase text-nowrap font-stroke">
                03.
              </p>
              <p className="text-3xl font-bold">Simple Of Use</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
