import React from 'react';
import { IProductsTableInvoice, ProductOption } from './interfaces/interfaces';
import { TableFooterItem, handleQuantityChange } from './utils/productsTableInvoiceUtils';
import { MinusIcon } from '../ui/icons/minusIcon';
import { PlusIcon } from '../ui/icons/plusIcon';


const ProductsTableInvoice = ({ selectedItems, removeSelectedItem, subtotal, discount, total, setSelectedItems }: IProductsTableInvoice) => {
  const tableHeaders = [
    { label: 'Title', className: 'table-cell', property: 'title' },
    { label: 'Brand', className: 'table-cell', property: 'brand' },
    { label: 'Image', className: 'table-cell', property: 'thumbnail' },
    { label: 'Discount (%)', className: 'table-cell', property: 'discountPercentage' },
    { label: 'Quantity', className: 'table-cell', property: 'quantity' },
    { label: 'Price', className: 'table-cell', property: 'price' },
  ];

  const tableFooterItems = [
    { label: 'DISCOUNT:', value: discount },
    { label: 'SUBTOTAL:', value: subtotal },
    { label: 'TOTAL:', value: total },
  ];

  return (
    <section>
      <div className="table-responsive">
        <div className="table-header text-sm font-semibold overflow-x-hidden">
          {tableHeaders.map((header) => (
            <div key={header.label} className={`${header.className} text-center`}>
              {header.label}
            </div>
          ))}
          <div className="table-cell text-center">Remove</div>
        </div>
        <div className="text-sm">
          {selectedItems.map((item: ProductOption) => (
            <div key={item.id} className="table-row">
              {tableHeaders.map((header) => {
                const renderContent = () => {
                  if (header.property === 'thumbnail') {
                    return <img src={item[header.property]} alt="Thumbnail" />;
                  } else if (header.property === 'quantity') {
                    return (
                      <div className="flex gap-2 justify-center">
                        <button
                          type="button"
                          onClick={() =>
                            handleQuantityChange({
                              itemId: item.id.toString(),
                              action: 'decrease',
                              items: selectedItems,
                              setSelectedItems: setSelectedItems
                            })
                          }
                          disabled={item[header.property] <= 1}
                        >
                          <MinusIcon />
                        </button>
                        {item[header.property]}
                        <button
                          type="button"
                          onClick={() =>
                            handleQuantityChange({
                              itemId: item.id.toString(),
                              action: 'increase',
                              items: selectedItems,
                              setSelectedItems: setSelectedItems
                            })
                          }
                        >
                          <PlusIcon />
                        </button>
                      </div>
                    );
                  } else {
                    return header.property && item[header.property];
                  }
                };

                return (
                  <div key={header.label} className={`${header.className} text-center`}>
                    {renderContent()}
                  </div>
                );
              })}
              <div className="table-cell text-center">
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() => removeSelectedItem(item)}
                >
                  X
                </button>
              </div>
            </div>
          ))}
        </div>

        <footer className="flex flex-wrap justify-end">
          {tableFooterItems.map((item) => (
            <TableFooterItem key={item.label} {...item} />
          ))}
        </footer>
      </div>
    </section>
  );
};

export default ProductsTableInvoice;


