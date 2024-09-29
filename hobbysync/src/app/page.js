"use client";
import Footer from './components/Footer.js';
import InteractiveBlock from './components/SingleCalendar.js';

export default function Home() {
  return (
    <div className ="container w-full">
    <main>
      <p>Hello World</p>
      <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Interactive Block Component</h1>
      <InteractiveBlock />
    </div>

    </main>
   <footer className="container w-full p-4">
      {/* Other page content */}
      <Footer />
    </footer>
    </div>
  );
}
