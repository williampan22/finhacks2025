import Link from "next/link";


const registrationLinks = (
  <>
    <li>
      <Link href="/login" className="hover:text-gray-300 transition-colors">
        Login
      </Link>
    </li>
    <li>
      <Link href="/register" className="hover:text-gray-300 transition-colors">
        Register
      </Link>
    </li>
  </>
);

const userLinks = (
  <>
    <li>
      <Link href="/home" className="hover:text-gray-300 transition-colors">
        Home
      </Link>
    </li>
  </>
);

const Navbar = () => {
  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <div className="text-2xl font-bold">
        <a href="/">
          <img src="logo.png" alt="" className="w-12 inline-block mr-4" />
          Travel Pouch
        </a>
      </div>
      <ul className="flex space-x-6">
        <li>
          <Link href="/about" className="hover:text-gray-300 transition-colors">
            About
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="hover:text-gray-300 transition-colors"
          >
            Contact
          </Link>
        </li>
        {userLinks}{registrationLinks}
      </ul>
    </nav>
  );
};

export default Navbar;
