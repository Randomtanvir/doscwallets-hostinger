export default function Home() {
  return (
    <>
      <div className="bg-[#555555] text-white px-[2%] ">
        <h2 className="text-[26.88px] font-['Trebuchet_MS',Verdana,sans-serif] font-bold">
          Server Error
        </h2>
      </div>
      <div className="bg-white p-2.5 mt-2 w-[96%] mx-auto">
        <div className="border font-[Verdana,Helvetica,sans-serif] border-black px-3 text-[0.7em]">
          <h3 className="text-[19px] font-bold text-[#CC0000]">
            403 - Forbidden: Access is denied.
          </h3>
          <p className="text-sm mt-2.5 pb-3 font-bold text-black">
            You do not have permission to view this directory or page using the
            credentials that you supplied.
          </p>
        </div>
      </div>
    </>
  );
}
