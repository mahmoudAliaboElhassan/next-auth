import Link from "next/link";
import React from "react";

function Home() {
  return (
    <section>
      <h1 className="text-slate-800 font-bold text-5xl">Home Page</h1>
      <div className="mt-4">
        <Link href="/login" className="text-blue-500 rounded-lg text-2xl">
          Go to Login Page
        </Link>
      </div>
    </section>
  );
}

export default Home;

// 1. Server-Side Rendering (SSR) with the App Router

// In the App Router, you can use the fetch function directly within a
//  React component to perform server-side data fetching.
//  By default, fetch requests are executed on the server during
// the initial render

// export default async function Page() {
//   const res = await fetch('https://api.example.com/data');
//   const data = await res.json();

//   return (
//     <div>
//       <h1>Server-Side Rendered Data</h1>
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </div>
//   );
// }
// In this example, the data is fetched on the server during the initial render, ensuring that the user receives fully rendered HTML.

// To implement SSG, you can use the fetch function with the
//  { cache: 'force-cache' } option,
//  which ensures the data is fetched at build time and cached for
//  subsequent requests.

// export default async function Page() {
//   const res = await fetch('https://api.example.com/data', { cache: 'force-cache' });
//   const data = await res.json();

//   return (
//     <div>
//       <h1>Static Site Generated Data</h1>
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </div>
//   );
// }

// 3. Incremental Static Regeneration (ISR) with the App Router

//  ISR allows you to update static pages after a certain period without
//  rebuilding the entire site. You can achieve this by using
//  the fetch function with the next.revalidate option.

// export default async function Page() {
//   const res = await fetch('https://api.example.com/data', { next: { revalidate: 60 } });
//   const data = await res.json();

//   return (
//     <div>
//       <h1>Incremental Static Regenerated Data</h1>
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </div>
//   );
// }
