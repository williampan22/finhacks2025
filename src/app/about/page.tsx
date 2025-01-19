import CreditCard from "@/components/creditCard";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <p className="text-6xl font-bold text-gray-600 mb-6 mt-8">About us</p>
      <div className="grid grid-cols-[7fr,3fr] flex items-center">
        <div className="-rotate-[4deg] w-96 bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-9 space-y-3 relative overflow-hidden hover:scale-105 transition-all ease-in ease-out duration-700">
          <div className="w-24 h-24 bg-violet-500 rounded-full absolute -right-5 -top-7">
            <p className="absolute bottom-6 left-7 text-white text-xl">01</p>
          </div>
          <h1 className="font-bold text-2xl">What Purpose Do We Serve?</h1>
          <p className="text-xl text-zinc-500 leading-6">
            <b>High Card</b> is a credit card management system that helps you
            maximize rewards by recommending the credit card offering the
            highest returns based on your purchasing category. With High Card,
            you can be confident you're optimizing your spending and discover
            cards that provide even greater benefits and rewards!
          </p>
        </div>

        <div className="card-stack-1 ml-auto">
          <a href="https://linkedin.com/in/williamlpan">
            <CreditCard
              cardNumber={"1234 5678 9012 3456"}
              name="John Doe"
              expiration="12/25"
              card="1"
            />
          </a>
          <a href="https://www.linkedin.com/in/jlojanarungsiri">
            <CreditCard
              cardNumber={"9876 5432 1098 7654"}
              name="John Doe"
              expiration="11/26"
              card="2"
            />
          </a>
          <a href="https://linkedin.com/in/williamlpan">
            <CreditCard
              cardNumber={"4567 8901 2345 6789"}
              name="John Doe"
              expiration="10/24"
              card="3"
            />
          </a>
        </div>
      </div>

      <div className="idle-card -rotate-[20deg]">
        <div className="card">
          <div className="card__info">
            <div className="card__logo">MasterCard</div>
            <div className="card__chip">
              <svg
                className="card__chip-lines"
                role="img"
                width="20px"
                height="20px"
                viewBox="0 0 100 100"
                aria-label="Chip"
              >
                <g opacity="0.8">
                  <polyline
                    points="0,50 35,50"
                    fill="none"
                    stroke="#000"
                    stroke-width="2"
                  ></polyline>
                  <polyline
                    points="0,20 20,20 35,35"
                    fill="none"
                    stroke="#000"
                    stroke-width="2"
                  ></polyline>
                  <polyline
                    points="50,0 50,35"
                    fill="none"
                    stroke="#000"
                    stroke-width="2"
                  ></polyline>
                  <polyline
                    points="65,35 80,20 100,20"
                    fill="none"
                    stroke="#000"
                    stroke-width="2"
                  ></polyline>
                  <polyline
                    points="100,50 65,50"
                    fill="none"
                    stroke="#000"
                    stroke-width="2"
                  ></polyline>
                  <polyline
                    points="35,35 65,35 65,65 35,65 35,35"
                    fill="none"
                    stroke="#000"
                    stroke-width="2"
                  ></polyline>
                  <polyline
                    points="0,80 20,80 35,65"
                    fill="none"
                    stroke="#000"
                    stroke-width="2"
                  ></polyline>
                  <polyline
                    points="50,100 50,65"
                    fill="none"
                    stroke="#000"
                    stroke-width="2"
                  ></polyline>
                  <polyline
                    points="65,65 80,80 100,80"
                    fill="none"
                    stroke="#000"
                    stroke-width="2"
                  ></polyline>
                </g>
              </svg>
              <div className="card__chip-texture"></div>
            </div>
            <div className="card__type">credit</div>
            <div className="card__number">
              <span className="card__digit-group">0123</span>
              <span className="card__digit-group">4567</span>
              <span className="card__digit-group">8901</span>
              <span className="card__digit-group">2345</span>
            </div>
            <div className="card__valid-thru" aria-label="Valid thru">
              Valid
              <br />
              thru
            </div>
            <div className="card__exp-date">
              <time dateTime="2038-01">01/38</time>
            </div>
            <div className="card__name" aria-label="Dee Stroyer">
              John Doe
            </div>
            <div
              className="card__vendor"
              role="img"
              aria-labelledby="card-vendor"
            >
              <span id="card-vendor" className="card__vendor-sr">
                Mastercard
              </span>
            </div>
            <div className="card__texture"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[3fr,7fr] mt-10 flex items-center">
        <div className="card-stack-2 mr-auto">
          <a href="https://www.linkedin.com/in/jlojanarungsiri">
            <CreditCard
              cardNumber={"4567 8901 2345 6789"}
              name="John Doe"
              expiration="10/24"
              card="4"
            />
          </a>
          <a href="https://linkedin.com/in/williamlpan">
            <CreditCard
              cardNumber={"1234 5678 9012 3456"}
              name="John Doe"
              expiration="12/25"
              card="5"
            />
          </a>
          <a href="https://www.linkedin.com/in/jlojanarungsiri">
            <CreditCard
              cardNumber={"9876 5432 1098 7654"}
              name="John Doe"
              expiration="11/26"
              card="6"
            />
          </a>
        </div>
        <div className="w-96 ml-72 rotate-[3deg] bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-9 space-y-3 relative overflow-hidden hover:scale-105 transition-all ease-in ease-out duration-700">
          <div className="w-24 h-24 bg-violet-500 rounded-full absolute -right-5 -top-7">
            <p className="absolute bottom-6 left-7 text-white text-xl">02</p>
          </div>
          <h1 className="font-bold text-2xl">Who are we?</h1>
          <p className="text-xl text-zinc-500 leading-6">
          At the core, we are a passionate group of credit card aficionados who live and breathe finding the best deals. We are always on the lookout for ways to maximize rewards and save wherever we can—because why not make every dollar work harder for you? Join us on our mission to turn every swipe into a smarter, more rewarding experience!</p>
        </div>
      </div>
    </div>
  );
}
