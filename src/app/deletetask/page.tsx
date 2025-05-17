// app/deletetask/page.tsx

import DeleteTaskPage from "@/components/DeleteTaskPage";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <DeleteTaskPage />
    </Suspense>
  );
}
