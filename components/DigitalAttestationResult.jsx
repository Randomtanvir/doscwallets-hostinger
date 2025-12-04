"use client";
import React, { useState } from "react";
import CandidateDetails from "./CandidateDetails";
import VerificationDetails from "./VerificationDetails";
import DocumentDetails from "./DocumentDetails";
import TransactionDetails from "./TransactionDetails";

import OriginalDocumentModal from "./OriginalDocumentModal";
import { waitAndReturnFalse } from "@/utils";

const DigitalAttestationResult = ({ verificationData }) => {
  const [toggle, SetToggle] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAttModal, setShowAttModal] = useState(false);

  const handleClick = async (isTrue) => {
    SetToggle(true);
    const result = await waitAndReturnFalse();
    SetToggle(result);
    isTrue ? setShowAttModal(true) : setShowModal(true);
  };

  if (showAttModal) {
    return (
      <OriginalDocumentModal
        setShowModal={setShowAttModal}
        verificationData={verificationData?.attestedDocuments}
      />
    );
  }
  return (
    <>
      {showModal ? (
        <OriginalDocumentModal
          setShowModal={setShowModal}
          verificationData={verificationData?.originalDocuments}
        />
      ) : (
        <div className="relative py-16 md:px-10 font-[calibri] border-black  p-5 bg-white m-0 md:m-[0px_17%] ">
          <div className="border border-gray-900 p-2">
            {/* Header */}
            <div className="flex justify-between items-center">
              {/* Left Logo */}

              <img
                src="https://omanpost.docswellet.com/assets/logo-two-CUmuoeAo.png"
                alt="Oman Post"
                className="lg:w-[250px] md:w-[170px] w-[100px]"
                onError={(e) => (e.target.src = "/logo1.png")}
              />

              {/* Right Logo */}

              <img
                src="https://omanpost.docswellet.com/assets/logo-BVaWALue.png"
                alt="Ministry Logo"
                className="lg:w-[180px] md:w-[130px] w-20"
                onError={(e) => (e.target.src = "/logo2.png")}
              />
            </div>

            {/* Arabic Title */}
            <div className="flex justify-center items-center flex-col">
              <div className="text-right ml-20 md:ml-0 mb-2 text-[32px] font-semibold text-[#49afcd] font-[Calibri]">
                بيانات التصديق
                <br className="md:hidden" /> الرقمي
              </div>

              {/* English Title */}
              <div className="leading-[1.2] mr-20 text-left font-[Calibri] mb-3 md:hidden block text-[32px] text-[#49afcd] font-bold">
                Digital <br /> Attestation <br /> Result
              </div>
              <div className="leading-[1.2] text-center hidden md:block mb-5 text-[32px] text-[#49afcd] font-[Calibri]  font-bold">
                Digital Attestation Result
              </div>
            </div>

            <div className="absolute top-[450px] md:top-[400px] [writing-mode:vertical-rl] -left-2.5 md:left-0 text-[20px] font-[Calibri] font-medium tra text-[#49afcd] md:p-2 transform rotate-180 ">
              Powered by VFS Global
            </div>

            {/* Transaction Details Table */}
            <TransactionDetails verificationData={verificationData} />

            {/* Candidate Details Table */}
            <CandidateDetails verificationData={verificationData} />

            {/* Verification Details Table */}
            <VerificationDetails verificationData={verificationData} />

            {/* Document Details Table */}
            <DocumentDetails handleClick={handleClick} toggle={toggle} />

            {/* Footer */}
            <div className="text-center mt-5 text-gray-400 text-[12px]">
              {/* Copyright 2025, All Right Reserved */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DigitalAttestationResult;
