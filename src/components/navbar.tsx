import Link from "next/link"; // Import Link from next/link

const registrationLinks = (
  <>
    <li className="lock-focus">
      <Link href="/login">
        <button className="btn rounded-md hover:scale-105 active:scale-95 transition-transform duration-300">
          <span>Login</span>
        </button>
      </Link>
    </li>
    <li className="lock-focus">
      <Link href="/register">
        <button className="btn rounded-md hover:scale-105 active:scale-95 transition-transform duration-300">
          <span>Register</span>
        </button>
      </Link>
    </li>
  </>
);

const userLinks = (
  <>
    <li className="lock-focus">
      <Link href="/all-cards">
        <button className="btn rounded-md hover:scale-105 active:scale-95 transition-transform duration-300">
          <span>All Cards</span>
        </button>
      </Link>
    </li>
    <li className="lock-focus">
      <Link href="/home">
        <button className="btn rounded-md hover:scale-105 active:scale-95 transition-transform duration-300">
          <span>Home</span>
        </button>
      </Link>
    </li>
  </>
);

const Navbar = ({loggedIn} : {loggedIn: boolean}) => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-2xl font-bold">
        <Link href="/">
          <img src="logo.png" alt="" className="w-12 inline-block mr-4" />
          High Card
        </Link>
      </div>
      <ul className="flex space-x-6">
        <li className="lock-focus">
          <Link href="/about">
            <button className="btn rounded-md hover:scale-105 active:scale-95 transition-transform duration-300">
              <span> About </span>
            </button>
          </Link>
        </li>
        {loggedIn ? userLinks : registrationLinks}
      </ul>
    </nav>
  );
};

export default Navbar;
