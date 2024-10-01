import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

const Nav = async () => {
  const session = await getServerSession(options);


  return (
    <header className="absolute top-4 right-4 z-10">
      <nav className="flex items-center gap-3">
        {session ? (
          <>
  
            <span className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-700 cursor-pointer">
               {session.user?.name || "User"}
            </span>
            <Link
              href="/api/auth/signout?callbackUrl=/"
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-700 cursor-pointer"
            >
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/CreateUser"
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-700 cursor-pointer"
            >
              Sign-In
            </Link>
            <Link
              href="/api/auth/signin"
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-700 cursor-pointer"
            >
              Login
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Nav;
