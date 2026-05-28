import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { Search } from 'lucide-react';

export default function SearchPage() {
  return (
    <>
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-3">
            Search Courses
          </h1>
          <p className="text-muted-foreground">
            Find the perfect course for your learning journey.
          </p>
        </div>

        <div className="relative mb-10">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          />

          <input
            type="text"
            placeholder="Search for courses..."
            className="w-full h-14 pl-12 pr-4 rounded-2xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="bg-white rounded-2xl border border-border p-5 hover:shadow-lg transition-shadow"
            >
              <div className="aspect-video rounded-xl bg-muted mb-4" />

              <h3 className="font-semibold text-lg mb-2">
                Course Title {item}
              </h3>

              <p className="text-sm text-muted-foreground mb-4">
                Learn modern web development with real-world projects.
              </p>

              <button className="w-full py-3 rounded-xl bg-primary text-white font-semibold">
                View Course
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
    </>
  );
}