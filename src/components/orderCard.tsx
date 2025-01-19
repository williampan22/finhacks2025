export default function creditCard({ card }: { card: any }) {
  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-lg bg-white transition-all duration-500 transform hover:scale-105 hover:shadow-xl">
      <div className="card-logo mt-5 ml-5">
        <img
          className="w-40 rounded mx-auto inline-block"
          src={card.imageLink}
          alt="Image Alt Text"
        />
        <h5 className="inline-block text-gray-700 text-3xl ml-5">
          {" "}
          {`${card.bank} ${card.name}`}{" "}
        </h5>
      </div>

      <div className="px-6 py-4">
        <span className="font-bold text-xl mb-2 text-gray-700"> Rewards</span>

        <div className="text-gray-700 text-base">
          {card.rewards.map((reward: any, index: number) => (
            <div key={index}>
              <span className="text-gray-600 text-lg">{reward.category}</span>
              <span className="ml-5">
                <span className="text-gray-400 text-lg mr-3">
                  + {reward.pointsPerDollar} Pts, 
                </span>
                <span className="text-gray-400 text-lg">
                  + {reward.centsPerDollar}% Cashback
                </span>
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3">
          <span className="font-bold text-xl mb-2 text-gray-700"> Perks</span>
          <p className="text-lg text-gray-700">{card.perks}</p>
        </div>
        <div className="mt-3">
          <p className="text-lg text-gray-700"><span className="font-bold">Annual Fee:</span> ${card.annualFee}</p>
        </div>
      </div>
    </div>
  );
}
