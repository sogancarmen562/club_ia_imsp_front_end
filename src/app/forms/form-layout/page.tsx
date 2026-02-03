import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import FormLayout from "@/components/form-layout/page";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const FormElementsPage = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  if(!token) redirect("/auth/signin");
  return (
    <DefaultLayout>
      <FormLayout />
    </DefaultLayout>
  );
};

export default FormElementsPage;
