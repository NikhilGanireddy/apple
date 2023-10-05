import React from "react";

const Input = (props) => {
  return (
    <input
      {...props}
      className="w-full px-4 py-2 rounded-lg border outline-none focus:border-gray-600 transition-all durationn-200 palceholder:text-gray-600"
    />
  );
};

export default Input;
