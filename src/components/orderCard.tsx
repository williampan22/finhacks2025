export default function orderCard({ country }: { country: string }) {
  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-lg bg-white">
      <div className="country-icon mt-3 ml-3">
        <img
          className="w-20 border rounded-full mx-auto inline-block"
          src="flags/japan.png"
          alt="Image Alt Text"
        />
        <h5 className="inline-block text-gray-700 ml-3"> {country} </h5>
      </div>

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Card Title</div>
        <p className="text-gray-700 text-base">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
      </div>
      <div className="px-6 py-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Learn More
        </button>
      </div>
    </div>
  );
}
