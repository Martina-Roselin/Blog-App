import { SpinnerOne } from "@mynaui/icons-react";

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-screen min-w-full bg-gray-100">
      <div className="border-slate-200 bg-white rounded-lg border justify-center items-center ">
        <div className="flex flex-col items-center py-24 px-44">
           <SpinnerOne size={24} className="animate-spin"/>
          <p className="mt-2 text-slate-950 font-geist font-medium">Loading...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;