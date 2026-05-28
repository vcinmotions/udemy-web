import { Suspense } from "react";
import InstructorListPage from "./components/InstructorListPage";

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-16">
        <Suspense fallback={<div>Loading...</div>}>
        <InstructorListPage />
        </Suspense>
      </main>
    </div>
  )
}

