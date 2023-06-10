import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = ({ label, name, type, ...rest }: InputProps) => {
  return (
    <div className="sm:col-span-3 pb-2">
              <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-400">
                {label}
              </label>
              <div>
                <input
                  type={type}
                  name={name}
                  id={name}
                  className="h-10 p-2 block w-full rounded-md border-0 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#3b83f6eb] outline-none sm:text-sm sm:leading-6"
                  {...rest}
                />
              </div>
            </div>
  );
};

export default Input;
