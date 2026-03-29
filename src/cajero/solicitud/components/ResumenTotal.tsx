interface ResumenTotalProps {
  subtotal: number;
  igv: number;
  total: number;
}

export function ResumenTotal({ subtotal, igv, total }: ResumenTotalProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 mt-3 border border-gray-100">
      <div className="flex justify-between text-sm text-gray-500 mb-1">
        <span>Subtotal</span>
        <span>S/ {subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <span>IGV (18%)</span>
        <span>S/ {igv.toFixed(2)}</span>
      </div>
      <div className="border-t border-gray-200 pt-2 flex justify-between text-base font-extrabold text-gray-900">
        <span>TOTAL</span>
        <span>S/ {total.toFixed(2)}</span>
      </div>
    </div>
  );
}
