import { Suspense } from "react";
import CategoryContent from "../components/CategoryContent";

export default function CategoryPage() {
  return (
    <div className="min-h-screen bg-background">
          <main className="pt-16">
            <Suspense fallback={<div>Loading...</div>}>
            <CategoryContent />
            </Suspense>
          </main>
        </div>
  );
}