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
