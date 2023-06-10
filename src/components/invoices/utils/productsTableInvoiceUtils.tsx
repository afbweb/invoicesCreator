import { handleQuantityChangeProps } from "../interfaces/interfaces";

export const TableFooterItem = ({ label, value }: { label: string, value: number }) => (
    <div className="px-2 py-1 sm:w-auto">
        <div className="table-cell text-right bg-gray-100 font-normal">{label}</div>
        <div className="table-cell text-right bg-slate-50 font-bold">${value}</div>
    </div>
);

export const handleQuantityChange = ({itemId, action, items, setSelectedItems}: handleQuantityChangeProps) => {
    const updatedItems = items.map((item) => {
        if (item.id === Number(itemId)) {
            if (action === 'increase') {
                return {
                    ...item,
                    quantity: item.quantity + 1,
                };
            } else if (action === 'decrease' && item.quantity > 1) {
                return {
                    ...item,
                    quantity: item.quantity - 1,
                };
            }
        }
        return item;
    });

    setSelectedItems(updatedItems);
};