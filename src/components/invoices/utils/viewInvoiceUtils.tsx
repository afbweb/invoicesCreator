import { SectionViewInvoice, TableHeaderProps, TableItemProps } from "../interfaces/interfaces";

export const TableItem = ({ data }: TableItemProps) => (
  <tr>
    {data.map((item) => (
      <td key={item} className='border text-center text-sm text-gray-500'>
        {item}
      </td>
    ))}
  </tr>
);

export const TableHeader = ({ headers }: TableHeaderProps) => (
  <tr>
    {headers.map((header) => (
      <th key={header} className='border'>
        {header}
      </th>
    ))}
  </tr>
);

export const Section = ({ fields }: SectionViewInvoice) => (
  <>
    {fields.map((field) => (
      <div key={field.title} className='w-full sm:w-1/3 grid pb-4'>
        <p className='text-base font-semibold leading-7 text-gray-900'>{field.title}</p>
        <p className='mt-1 max-w-2xl text-sm leading-6 text-gray-500'>{field.value}</p>
      </div>
    ))}
  </>
);