import Iframe from "react-iframe";

const FAQ = () => {
  return (
    <div className="max-w-3xl space-y-2 flex flex-col items-center overflow-hidden">
      <Iframe
        url="https://uxlivinglab.com/en/faq/"
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

export default FAQ;
