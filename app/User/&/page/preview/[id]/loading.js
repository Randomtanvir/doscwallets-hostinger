import React from "react";

const loading = () => {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      {/* Modal container */}
      <div className="w-full max-w-3xl rounded-2xl shadow-lg overflow-hidden transform transition-all scale-100">
        <div className="flex items-center justify-center h-screen">
          <span className="loader"></span>
        </div>
      </div>
    </div>
  );
};

export default loading;
