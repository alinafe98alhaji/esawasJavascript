// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="relative min-h-screen p-10 pb-24 bg-gradient-to-b from-teal-200 via-blue-200 to-blue-300 text-teal-900 flex flex-col items-center">
//       {/* Logo positioned at top-center */}
//       <div className="absolute top-6 flex justify-center w-full">
//         <div className="relative w-[140px] h-[100px] overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-110 duration-300">
//           <Image
//             src="/images/download.png" // Replace with your logo path
//             alt="ESAWAS logo"
//             layout="responsive"
//             width={140}
//             height={60}
//             priority
//             className="object-contain rounded-md"
//           />
//         </div>
//       </div>

//       {/* Main Content */}
//       <main className="flex flex-col gap-6 items-center mt-28 sm:items-start text-center sm:text-left bg-white bg-opacity-95 p-12 rounded-2xl shadow-2xl max-w-2xl w-full transition-transform transform hover:scale-[1.01] duration-300">
//         {/* Main Heading */}
//         <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-blue-700 drop-shadow-md leading-tight">
//           Welcome to the ESAWAS Data Maturity Assessment Tool
//         </h1>

//         {/* Subheading */}
//         <p className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-lg mt-2">
//           Your trusted platform for evaluating and enhancing data maturity in
//           the water and sanitation sectors.
//         </p>

//         {/* Steps List */}
//         <ol className="list-decimal list-inside text-lg text-gray-600 max-w-lg space-y-3 pl-6 sm:pl-8 mt-4">
//           <li>Get started by completing our comprehensive assessment.</li>
//           <li>Save your progress and return whenever you need.</li>
//           <li>Review insights and contribute to better service delivery.</li>
//         </ol>

//         {/* Call to Action Buttons */}
//         <div className="flex gap-4 items-center flex-col sm:flex-row mt-10">
//           <a
//             className="bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-full py-3 px-10 font-semibold text-lg transition-transform transform hover:scale-105 shadow-xl hover:shadow-2xl"
//             href="/datacollectionques"
//           >
//             Start Assessment
//           </a>
//           <a
//             className="bg-gray-50 border border-gray-300 text-gray-800 rounded-full py-3 px-10 font-semibold text-lg transition-transform transform hover:scale-105 shadow-lg hover:bg-gray-100"
//             href="/documentation"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read Documentation
//           </a>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="flex flex-col items-center justify-center text-gray-800 mt-24">
//         {/* Footer Text Link */}
//         <a
//           className="flex items-center gap-2 hover:text-blue-700 transition-colors"
//           href="https://www.esawas.org/"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             src="/images/download.png"
//             alt="Globe icon"
//             width={20}
//             height={20}
//           />
//           Visit ESAWAS Website →
//         </a>

//         {/* Bottom Image */}
//         <div className="mt-6">
//           <Image
//             src="/images/LETTERHEADS ELEMENTS- ESAWAS-17.png" // Replace with the image path
//             alt="Bottom Image"
//             width={10000} // Adjust the size as needed
//             height={100} // Adjust the size as needed
//             className="object-contain"
//           />
//         </div>
//       </footer>
//     </div>
//   );
// }

//--------------------------------
//--------------------------------
//--------------------------------

import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen p-6 bg-gradient-to-b from-teal-200 via-blue-200 to-blue-300 text-teal-900 flex flex-col items-center">
      {/* Logo positioned at top-center */}
      <div className="absolute top-4 flex justify-center w-full">
        <div className="relative w-[120px] h-[80px] overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-110 duration-300">
          <Image
            src="/images/download.png" // Replace with your logo path
            alt="ESAWAS logo"
            layout="responsive"
            width={120}
            height={60}
            priority
            className="object-contain rounded-md"
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex flex-col gap-4 items-center mt-24 sm:items-start text-center sm:text-left bg-white bg-opacity-95 p-8 rounded-2xl shadow-2xl max-w-2xl w-full transition-transform transform hover:scale-[1.01] duration-300">
        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-blue-700 drop-shadow-md leading-tight">
          Welcome to the ESAWAS Data Maturity Assessment Tool
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-lg mt-2">
          Your trusted platform for evaluating and enhancing data maturity in
          the water and sanitation sectors.
        </p>

        {/* Steps List */}
        <ol className="list-decimal list-inside text-lg text-gray-600 max-w-lg space-y-2 pl-6 sm:pl-8 mt-4">
          <li>Get started by completing our comprehensive assessment.</li>
          <li>Save your progress and return whenever you need.</li>
          <li>Review insights and contribute to better service delivery.</li>
        </ol>

        {/* Call to Action Buttons */}
        <div className="flex gap-4 items-center flex-col sm:flex-row mt-6">
          <a
            className="bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-full py-3 px-8 font-semibold text-lg transition-transform transform hover:scale-105 shadow-xl hover:shadow-2xl"
            href="/datacollectionques"
          >
            Start Assessment
          </a>
          <a
            className="bg-gray-50 border border-gray-300 text-gray-800 rounded-full py-3 px-8 font-semibold text-lg transition-transform transform hover:scale-105 shadow-lg hover:bg-gray-100"
            href="/documentation"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read Documentation
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex flex-col items-center justify-center text-gray-800 mt-8 mb-6">
        {/* Footer Text Link */}
        <a
          className="flex items-center gap-2 hover:text-blue-700 transition-colors"
          href="https://www.esawas.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit ESAWAS Website →
        </a>
      </footer>
    </div>
  );
}
