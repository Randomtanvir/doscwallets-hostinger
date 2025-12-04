const DocumentDetails = ({ handleClick, toggle }) => {
  return (
    <>
      {toggle && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          {/* Modal container */}
          <div className="w-full max-w-3xl rounded-2xl shadow-lg overflow-hidden transform transition-all scale-100">
            <div className="flex items-center justify-center h-screen">
              <span className="loader"></span>
            </div>
          </div>
        </div>
      )}

      <div className="inline-block md:px-14 px-1 pr-7 container font-[Calibri] text-[16px] font-bold mx-auto md:text-[13px] mb-4 ">
        <table className="w-full border-collapse">
          <tbody>
            <tr className="border-b-2 border-[#aeaeae]">
              <td className="border border-[#aeaeae] leading-5 text-[16px] italic text-[#aeaeae] font-bold ">
                Document Details
              </td>
              <td style={{ border: "none" }}></td>
            </tr>

            <tr className="border-b-2 border-[#212529]">
              <td className="border leading-5 border-r-[#aeaeae] border-l-[#aeaeae] w-[35%] font-[Calibri] text-[16px] font-normal text-black ">
                Original Document
              </td>
              <td className="border p-[1px_5px_1px_2px] text-[16px] font-bold border-r-[#aeaeae] border-l-[#aeaeae] italic text-[#1b6394] ">
                <button onClick={() => handleClick(false)}>
                  View Document
                </button>
              </td>
            </tr>

            <tr className="border-b-[#aeaeae]">
              <td className="border border-b-[#aeaeae] leading-4 border-r-[#aeaeae] border-l-[#aeaeae] w-[35%]  p-[3px] text-[16px] font-normal text-black ">
                Attested Document
              </td>
              <td className="border p-[1px_5px_1px_2px] border-b-[#aeaeae] border-r-[#aeaeae] border-l-[#aeaeae] text-[#1b6394] text-[16px] font-bold italic ">
                <button onClick={() => handleClick(true)}>View Document</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DocumentDetails;
