import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Gavel } from "lucide-react";
import Link from "next/link";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      className="transition-colors 
      duration-200 text-gray-400 
      hover:text-orange-400"
    >
      {children}
    </Link>
  );
};

export default function Header() {
  return (
    <nav
      className="container flex items-center
            justify-between px-8 py-4 mx-auto"
    >
      <div className="flex lg:flex-1">
        <NavLink href="/">
          <span
            className="flex items-center
            gap-2 shrink-0"
          >
            <Gavel
              className="hover:rotate-45
            transform transition duration-200
            ease-in-out"
            />
            <span className="font-extrabold text-lg">Final Word</span>
          </span>
        </NavLink>
      </div>
      <div
        className="flex
        lg:justify-center gap-2 lg:gap-12
        lg:items-center"
      >
        <NavLink href="/#pricing">Pricing</NavLink>
        <SignedIn>
          <NavLink href="/#posts">Your Posts</NavLink>
        </SignedIn>
      </div>

      <div
        className="flex
      lg:justify-end lg:flex-1"
      >
        <div className="flex gap-2 items-center">
          {/* User Profile */}
          <SignedIn>
            <NavLink href="/dashboard">Upload a Video</NavLink>
            <UserButton />
          </SignedIn>
        </div>

        <SignedOut>
          <SignInButton>
            <NavLink href="/sign-in">Sign In</NavLink>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
}
