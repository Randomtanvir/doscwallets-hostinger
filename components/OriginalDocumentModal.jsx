import { waitAndReturnFalse } from "@/utils";
import React, { useEffect, useState } from "react";

const OriginalDocumentModal = ({ verificationData, setShowModal }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getResult = async () => {
      const result = await waitAndReturnFalse(500);
      setLoading(result);
    };

    getResult();
  }, []);

  return (
    <>
      <div
        className="min-w-full relative bg-[#f6f7fa] flex items-center justify-center z-50 p-4"
        // className="fixed inset-0 bg-[#f6f7fa] flex items-center justify-center z-50 p-4"
      >
        {/* Modal container */}

        <div className="w-full max-w-5xl max-h-screen overflow-auto">
          {loading ? (
            <div className="flex items-center justify-center h-screen">
              <span className="loaders"></span>
            </div>
          ) : (
            verificationData?.map((doc, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-4 mb-4"
              >
                <img
                  src={doc}
                  alt={`Document ${index + 1}`}
                  className="w-full"
                />
              </div>
            ))
          )}

          <button
            onClick={() => setShowModal(false)}
            //   style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 700 }}
            className="px-3 z-50 absolute right-4 top-4 py-2 font-[calibri] font-semibold text-[16px] cursor-pointer bg-[#49AFCD] text-white rounded-[5px]"
          >
            Close / اغلاق
          </button>
        </div>
      </div>
    </>
  );
};

export default OriginalDocumentModal;
