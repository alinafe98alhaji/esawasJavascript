import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/path/to/your/logo.png" // Replace with your logo path
          alt="esawas logo"
          width={180}
          height={38}
          priority
        />
        <h1 className="text-3xl font-bold text-center">
          Welcome to the esawas Survey Tool
        </h1>
        <p className="text-lg text-center">
          Your trusted tool for monitoring and evaluating organizational water
          and sanitation sectors.
        </p>
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by filling out our comprehensive survey.
          </li>
          <li>Save your progress and return at any time.</li>
          <li>Analyze results and contribute to better service delivery.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/datacollectionques" // Link to your survey page
            target="_self" // Change to _self if you want to navigate in the same tab
          >
            Start Survey
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="/documentation" // Replace with your documentation link
            target="_blank"
            rel="noopener noreferrer"
          >
            Read Documentation
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://your-esawas-website.com" // Replace with your esawas website URL
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Visit esawas Website →
        </a>
      </footer>
    </div>
  );
}
