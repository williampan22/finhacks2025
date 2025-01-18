export default function creditCard({ card }: { card: any }) {
  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-lg bg-white">
      <div className="card-logo mt-5 ml-5">
        <img
          className="w-40 border rounded mx-auto inline-block"
          src={`${card.bank}/${card.name}.png`}
          alt="Image Alt Text"
        />
        <h5 className="inline-block text-gray-700 text-3xl ml-5">
          {" "}
          {`${card.bank} ${card.name}`}{" "}
        </h5>
      </div>

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-700"> Rewards</div>

        <div className="text-gray-700 text-base">
          {card.rewards.map((reward: any) => (
            <div>
              <span className="text-gray-600 text-lg">
                {reward.category}
              </span>
              <span className="ml-5">
              <span className="text-gray-400 text-lg">
                + {reward.pointsPerDollar} Pts
              </span>
              <span className="text-gray-400 text-lg">
                + {reward.centsPerDollar}%
              </span></span>
            </div>
          ))}
        </div>
      </div>
      <div className="px-6 py-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Learn More
        </button>
      </div>
    </div>
  );
}
