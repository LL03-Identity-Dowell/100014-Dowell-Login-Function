import Iframe from "react-iframe";

const Policy = () => {
  return (
    <div className="max-w-3xl space-y-2 flex flex-col items-center">
      <h2 className="font-semibold text-lg text-white bg-green-500 px-6 py-1 rounded-3xl">
        Legal, Privacy, Safety, Security Policies
      </h2>
      <Iframe
        url="https://100087.pythonanywhere.com/legalpolicies/FB1010000000167475042357408025/website-privacy-policy/policies/?redirect_url=https://100014.pythonanywhere.com/legalpolicy1?s=roshan_tester&session_id=roshan_tester"
        width="100%"
        height="350px"
        id="myFrame"
        className="py-1"
        display="initial"
        position="relative"
      />
    </div>
  );
};

export default Policy;
