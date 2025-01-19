export default function creditCard({ card }: { card: any }) {
    return (
      <div className="w-full rounded-2xl overflow-hidden shadow-lg bg-white transition-all duration-500 transform hover:scale-105 hover:shadow-xl">
        <div className="grid grid-cols-3 items-center p-5">
          <img
            className="w-60 rounded mx-auto inline-block mr-4"
            src={card.imageLink}
            alt={`${card.bank} logo`}
          />
          <h5 className="col-span-2 text-3xl text-gray-700 font-semibold">
            {`${card.bank} ${card.name}`}
          </h5>
        </div>
  
        <div className="px-6 py-4">
          <div className="mb-4">
            <span className="font-bold text-xl text-gray-700">Rewards</span>
            <div className="space-y-3 mt-2">
              {card.rewards.map((reward: any, index: number) => (
                <div key={index} className="flex justify-between items-center text-gray-700">
                  <span className="text-lg text-gray-600">{reward.category}</span>
                  <div className="ml-5 flex gap-4">
                    <span className="text-gray-400 text-lg">+ {reward.pointsPerDollar} Pts</span>
                    <span className="text-gray-400 text-lg">+ {reward.centsPerDollar}% Cashback</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          <div className="mb-4">
            <span className="font-bold text-xl text-gray-700">Perks</span>
            <p className="text-lg text-gray-700">{card.perks}</p>
          </div>
  
          <div>
            <p className="text-lg text-gray-700">
              <span className="font-bold">Annual Fee:</span> ${card.annualFee}
            </p>
          </div>
        </div>
      </div>
    );
  }
  