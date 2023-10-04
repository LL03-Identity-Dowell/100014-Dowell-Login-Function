import Iframe from "react-iframe";

const FAQ = () => {
  return (
    <div className="max-w-3xl space-y-2 flex flex-col items-center">
      <Iframe
        url="https://uxlivinglab.com/en/faq/"
        id="myFrame"
        className="py-1 w-full h-[500px] md:h-[350px]"
        display="initial"
        position="relative"
      />
    </div>
  );
};

export default FAQ;
