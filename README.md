Website is hosted on Vercel
https://flo-csv-parser.vercel.app

You may download sample-nem12.csv to test

Unit testing file: snaitizeSQL.test.ts
Component testing file: SQLPanel.test.tsx

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

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

Write-up Questions:
1. What is the rationale behind the technologies you chose to use?
2. What would you have done differently if you had more time?
3. What is the rationale behind your design decisions?

1. I used Nextjs, Tailwind. Nextjs is a really popular React framework, and it has real life uses like Server Side Rendering and Server Side Generation that improves performance and SEO. It also has built in router navigation that is modern and intuitive. I used tailwind because it is recommended by Nextjs, and it has global.css where I can combine several styles like radius, shadow, border-color, padding, into one named style and use it everywhere. Also it is easy to configure dark and light mode styles. For testing I did unit testing with vitest to test whether my function works, and I use react testing library for component test to test if the values appear correctly when data is fed.

2. I would have improved my layout of the components, make them more responsive, and improved the design and the page. I would have added a history tab to store pass records of uploaded CSV, probably in the localStorage or some cache. Also, account for more edge cases of invalid CSV files being uploaded.

3. I went to the company website and copied the colors and the logo. Also I copied the button effect where a shadow appears when it is hovered over. For the font, I used fontninja plugin and realised that its using System-UI medium so I copied it. Also, I tried to occupy as much screen as possible. I also think that having a preview of the CSV table is good, and also allowing users to drag and drop the CSV files will be helpful.
