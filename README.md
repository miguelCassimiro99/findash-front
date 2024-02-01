# Findash: A Dashboard with Next.js

A Dashboard with authentication, filters and Server Actions. This project works with the [Findash App](https://github.com/miguelCassimiro99/findash-app)

## Features 📜
- [x]  Authentication
- [x]  Form Validation with zod and react-hook-form
- [x]  Global State Managment
- [x]  Composition Pattern
- [x]  Steps visualization and responsive (better UX)
- [x]  Dashboard
- [x]  Cards
- [x]  Graphs (Chart.js)
- [x]  Filters
- [x]  Store for session and filter
- [x] Server actions (performance)

---

This project contains a Dashboard that process a list of Transactions from a JSON file and generate some data in format of Cards, Tables and Charts for analisys.

How does it works 🔍

This project actually works with a Backend for authentication constructed with Nest.js and the DB using PostgreSQL. You can clone the repo [Findash App](https://github.com/miguelCassimiro99/findash-app) and follow the instructions. It's pretty simple, it will go up a container with the application and the DB.

There's basically two routes: login and dashboard

After run the API container  you'll be able to Login or Create a user. The Dashboard route is protected using the NextAuth. For this I created two folder inside the /app dir: (admin-routes) and (auth-routes). These two have an layout that are used to check the user section and redirect for the correcty page depending on the user logged or not.

This project contains some of the best UX strategies for Display itens and show messages, and have a form validation that I can explain better with the project [Next Form Validation](https://github.com/miguelCassimiro99/next-form-validation)

To explain better about the Dashboard let's go understand the data that we are working on:
As this project is used for a job opportunity test, it was provided a JSON with a list of transactions os the format:

```json
{
  "date": 1682698259192,
  "amount": "5565",
  "transaction_type": "deposit",
  "currency": "brl",
  "account": "Baker Hughes",
  "industry": "Oil and Gas Equipment",
  "state": "TX"
},

```

Here started the most cool challenge of this project, deal with a 12,0MB of size. To heavy for the browser and maybe even for the Next server. So searching a while how about deal with that and considering use the Route Handlers too, I decide to put in action the 'Server Action' (awnful joke, sorry). But look, we need to keep perfomance, it's a big amount of data. You can check more details on the [Doc](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations).

So, use the Server Action seems to be the best approach for deal and solve this problem, because we can process all data on the server, leaving for the Client just Forms and buttons, right? But there's still a problem. I can't serve the JSON as an import file simply or a made a fetch request. The fetch can't cache a request heavier than 2MB. Searching a while a decided to use the File System library from Node [guide](https://vercel.com/guides/loading-static-file-nextjs-api-route), so I could simply read a file that could be cached by the server and improve a lot the performance of request a file of that size.

For receive the filters by quer string params, I just used the params received as a prop from the Page component, passing them to the function to get the Dashboard data (Server actions). You can see all the functions on the /actions/ dir on the file transactions.ts

After that it was symple to create a form to handle the filtering, selecting about Accounts, Industries, States and dates. Theese filter create a new query string and push it to the route (using the route/navigation hook).


### Tools 🛠️

🌐 [Next](https://nextjs.org/)

🌐 [Zustand](https://github.com/pmndrs/zustand)

🌐 [Tailwind](https://tailwindcss.com/)

🌐 [React Hook Form](https://react-hook-form.com/)

🌐 [Zod](https://zod.dev/)

🌐 [NextAuth.js](https://next-auth.js.org/)

🌐 [Chart.js]([https://zod.dev/](https://www.chartjs.org/))



---

## Setup 🏗️


## Getting Started

First you need to create the .env file and add this variables into:

```
NEXTAUTH_URL
NEXTAUTH_SECRET
```
The URL you can simply put the 'http://localhost:3001'. On secret, this var is used by the NextAuth in production, so if you want to deploy this app you need to create this secret to be able to authenticate.

After that you can install all dependencies:

```
npm install
# or
yarn

````

Then, run the development server:

```
npm run dev
# or
yarn dev

```

Open [http://localhost:3001](http://localhost:3001/) with your browser to see the result.


## Tags:

\#dashboard \#login \#auth \#data \#validation \#form-validation \#form \#next \#next14

