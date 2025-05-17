// app/updatetask/page.tsx
import UpdateTaskPage from "@/components/UpdateTaskPage";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <UpdateTaskPage />
    </Suspense>
  );
}
