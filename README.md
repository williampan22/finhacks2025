# FinHacks 2025 Best Startup Potential Submission.

## What is FinHacks?
FinHacks is a fintech-themed, 24 hours hackathon hosted by NEU Disrupt at Northeastern University with over $2000 in cash prizes. Each projects were judged in a science-fair-style presentation, with the top 10 teams advancing to a second round of pitching. Each project is scored by judges from major financial banking companies, investment firms, ventures, and some are major hackathon winners.

link: https://finhacks.org/

## Inspiration
You're about to pay for something, whether for dining, groceries, travel, or etc. But wait? What credit card do you use to pay? Nowadays, there are hundreds of credit cards out there, each with different rewards, with some cards even having rotating reward categories that change every quarter. Some cards  reward you in pure cashback, while others reward you in points. But now, how much is a point worth in terms of money? Each bank, hotel, and airline's point are valued differently. For example, let's consider Hyatt vs Marriot. 1 Hyatt (hotel) point usually goes for 2.2 cents, with you being able to book a one night hotel stay for only 6.5k Hyatt points (equivalent to $108 stay) in Braintree. On the other hand, 1 Marriot point usually only goes for 0.9 cents, with one Marriot stay costing to about 35k Marriot points (equivalent to a $169 stay) in the same area, same time! When you compare how much money you end up saving by paying with Hyatt points instead of money compared to Marriot points, it's obvious that Hyatt points are much more important! **When you have multiple cards, it's hard to keep track of all these rotating categories, reward multipliers, reward categories, and different point values. If only there was a tool to just tell you what card to use for what purchase!**

## What it does
High Card lets you select which credit cards you currently have (and it remembers), choose a category/merchant type of purchase (ie: dining, groceries, travel, gym), and then it tells you which credit card gives you the best reward for that purchase at that exact time! It gives you a detailed explanation of why that card is the best, compares it to other cards you already have, and also reminds you of how much point and/or money value you're getting back from that category! Now you longer have to worry about which card to use when and where, and you'll always get the biggest bang for your buck! Who doesn't love to get money for spending money :) We also implemented a card recommendation feature, which recommends a card to cover a missing reward category or a card to upgrade a weak reward category you have. For example, if you have no card that gives rewards for streaming services, it may recommend the U.S. Bank Altitude® Go Visa Signature® Card for 2% back on streaming services!

## How we built it
We built the frontend using React.js combined with Tailwind CSS to create a sleek, animated, responsive, and visually engaging user interface. Tailwind CSS allowed us to efficiently craft consistent and elegant designs, while React.js provided the dynamic and modular framework needed to build an intuitive user experience. For our backend, we utilized Node.j which enabled us to develop a fast and scalable server environment and Next.js, which provided server-side rendering and optimized routing. For our database, we chose MongoDB, leveraging its flexibility and scalability to store and manage our application’s data effectively. MongoDB’s document-oriented structure made it ideal for handling the dynamic data requirements of our project. 

## The Journey
With this project being both of our first time working together and fully developing a full-stack project in next.js, implementing the server-side API proved to be quite a challenge. Not to mention, but 6 hours in, we completely pivoted and changed our project into something that would fit better into the realm of fintech. Completely frazzled, however, as time went on, we managed to get a hang of the project structure and were able to develop a clean credit card management and recommendation system. In addition to learning a new tech stack, neither of us are UI/UX designers; frankly, we are terrible at frontend design. But, we forced ourselves to try making something appealing. Now, we weren't going to be able to draw every component designs from scratch, so a good portion was borrowed from free resources, but both of us have gotten quite comfortable working with tailwind css. We are very proud of what we have developed today.

## What's next for High Card
- Develop an app integrated with Mobile (Apple/Google/Samsung) Tap to Pay - Manually choose which category or automatically recognize merchant category and allow user to pay on mobile with that card in one swipe
- Accepting Sponsorships + Monetization - Allow banks to pay for a featured card 
- Work with credit unions & smaller banks - Promote credit cards from smaller banks
- Affiliate links - Allow users to apply for a card via our website with our affiliated link (and be open about it!)
- Algorithmic optimization - take into user's credit score, recurring debt, and credit cards already owned

# Development & Technologies

- TypeScript
- Next.js
- React.js
- Node.js
- MongoDB
- Tailwind CSS

1. Downoad the repo using HTTPS/SSH.
2. Clone the repo in your folder using ```git clone https://github.com/williampan22/finhacks2025```.
3. Make sure you are in the project directory using ```cd```. Install dependencies using ```npm install```.
4. Create an account for MongoDB and register for a cluster. Downloading Mongo Compass is not necessary, but helpful. 
5. Create an .env.local file to hold your secrets for MongoDB.
6. Put these secrets into MongoDB
```
MONGODB_URI=<FILLOUT>
MONGODB_DB=<FILLOUT>
NODE_ENV=development
```
7. Run the environment by typing ```npm run dev``` in your terminal. It should be hosted at localhost:3000 (or something similar).
These are also acceptable:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
