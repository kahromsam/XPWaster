interface TotalLevelProps {
  total: number;
  maxTotal: number;
}

export function TotalLevel({ total, maxTotal }: TotalLevelProps) {
  return (
    <div className="total-level">
      <span className="total-level-label">TOTAL</span>
      <span className="total-level-value">{total}</span>
      <span className="total-level-max">/{maxTotal}</span>
    </div>
  );
}
