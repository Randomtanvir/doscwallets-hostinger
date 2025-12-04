const CandidateDetails = ({ verificationData }) => {
  return (
    <div className="inline-block md:px-14 px-1 pr-7 container font-[Calibri] text-[16px] font-bold mx-auto md:text-[13px] mb-4 ">
      <table className="w-full border-collapse">
        <tbody className="">
          <tr className="border-b-2 border-[#aeaeae]">
            <td className="border border-[#aeaeae] leading-5 text-[16px] italic text-[#aeaeae] font-bold ">
              Candidate Details
            </td>
            <td style={{ border: "none" }}></td>
          </tr>

          <tr className="border-b-2 border-[#212529]">
            <td className="border leading-5 border-r-[#aeaeae] border-l-[#aeaeae] w-[35%] font-[Calibri] text-[16px] font-normal text-black ">
              Document Type
            </td>
            <td className="border p-[1px_5px_1px_2px] text-[16px] font-bold border-r-[#aeaeae] border-l-[#aeaeae] text-[#1b6394] ">
              {verificationData?.documentType}
            </td>
          </tr>
          <tr className="border-b-2 border-[#212529]">
            <td className="border leading-4 border-r-[#aeaeae] border-l-[#aeaeae] w-[35%]   text-[16px] font-normal text-black ">
              Applicant Name
            </td>
            <td className="border p-[1px_5px_1px_2px] text-[16px] font-bold border-r-[#aeaeae] border-l-[#aeaeae] text-[#1b6394]  ">
              {verificationData?.applicantName}
            </td>
          </tr>
          <tr className="border-b-2 border-[#212529] ">
            <td className="border leading-5 border-r-[#aeaeae] border-l-[#aeaeae] w-[35%] text-[17px] font-normal text-black ">
              Email Id
            </td>
            <td className="border p-[1px_5px_1px_2px] text-[16px] font-bold border-r-[#aeaeae] border-l-[#aeaeae] text-[#1b6394]  ">
              {verificationData?.email}
            </td>
          </tr>
          <tr className="border-b-[#aeaeae]">
            <td className="border border-b-[#aeaeae] leading-4 border-r-[#aeaeae] border-l-[#aeaeae] w-[35%]  p-[3px] text-[16px] font-normal text-black ">
              Phone Number
            </td>
            <td className="border p-[1px_5px_1px_2px] border-b-[#aeaeae] border-r-[#aeaeae] border-l-[#aeaeae] text-[#1b6394] text-[16px] font-bold  ">
              {verificationData?.phoneNumber}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CandidateDetails;
