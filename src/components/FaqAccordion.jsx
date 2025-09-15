import React from "react";

const FaqAccordion = (props) => {
  let { faq, faqToggle, setFaqToggle } = props;
  const handleFaqToggle = () => {
    setFaqToggle(faqToggle ? -1 : null);
  };
  return (
    <div className="relative bg-[#303030] text-[#bababa] my-2 transition-all duration-500 ease-in-out rounded-lg w-full">
      <h1
        className="cursor-pointer rounded-lg px-[25px] hover:bg-[#434343] transition duration-300 py-6 border-b border-[#454545] text-[18px] max-sm:text-[15px] max-sm:leading-6 max-sm:pr-[40px]"
        onClick={handleFaqToggle}
      >
        {faq.question}
      </h1>
      <p className="absolute top-6 right-6 text-3xl max-sm:text-xl">
        {faqToggle ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
          </svg>
        )}
      </p>

      {faqToggle && (
        <p className="px-[23px] p-6 text-[18px] leading-8 max-sm:text-[15px] max-sm:leading-6">
          {faq.answer}
        </p>
      )}
    </div>
  );
};

export default FaqAccordion;
