import { Suspense } from "react";
import InstructorDetailsPage from "../components/InstructorDetailsPage";

export default function Page() {
  return (
      <div className="min-h-screen bg-background">
        <main className="pt-16">
          <Suspense fallback={<div>Loading...</div>}>
          <InstructorDetailsPage />
          </Suspense>
        </main>
      </div>
    );
}