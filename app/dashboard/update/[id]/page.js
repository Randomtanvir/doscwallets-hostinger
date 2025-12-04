import React from "react";

import { getSingleVerificationData } from "@/utils/fetcher";
import VerificationForm from "../../create/_component/VerificationForm";

const EditPage = async ({ params }) => {
  const { id } = await params;
  const verifactionData = await getSingleVerificationData(id);
  if (!verifactionData) {
    return <div>Loading...</div>;
  }
  return <VerificationForm isEdit={true} verifactionData={verifactionData} />;
};

export default EditPage;
