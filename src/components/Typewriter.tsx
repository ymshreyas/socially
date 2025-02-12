"use client";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
export function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "Create,",
    },
    {
      text: "Share,",
    },
    {
      text: "Connect –",
    },
    {
      text: "Only on",
    },
    {
      text: "Socially.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[30rem]  ">
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
        The road to networking starts from here
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <SignInButton mode="modal">
          <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
            Sign in
          </button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
            Signup
          </button>
        </SignUpButton>
      </div>
    </div>
  );
}
