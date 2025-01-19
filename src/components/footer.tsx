const footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-4 pt-4">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            Powered by{" "}
            <span className="font-semibold text-blue-400">High Card</span> • Built
            with <span className="font-semibold text-blue-400">Next.js</span>,{" "}
            <span className="font-semibold text-blue-400">Tailwind CSS</span>, and{" "}
            <span className="font-semibold text-blue-400">TypeScript</span>
          </p>
          <p className="text-sm">
            By <a href="https://github.com/williampan22" className="font-semibold text-blue-400">William Pan</a> and{" "}
            <a href="https://github.com/Bartavius" className="font-semibold text-blue-400">Jirath Lojanarungsiri</a>
          </p>
        </div>
      </footer>
    );
  };
  
  export default footer;
  