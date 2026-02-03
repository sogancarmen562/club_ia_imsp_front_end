import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import FormEditor from "@/components/FormEditor";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// export const metadata: Metadata = {
//   title: "Next.js Form Elements | TailAdmin - Next.js Dashboard Template",
//   description:
//     "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
// };

const FormElementsPage = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  if(!token) redirect("/auth/signin");
  return (
    <DefaultLayout>
      <FormEditor />
    </DefaultLayout>
  );
};

export default FormElementsPage;
