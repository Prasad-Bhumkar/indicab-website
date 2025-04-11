import React from 'react';

export interface TourPackageCardProps {
  title: string;
  description: string;
  price: number;
  discount?: string;
}

const TourPackageCard: React.FC<TourPackageCardProps> = ({ title, description, price, discount }) => {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-xl font-bold">{title}</h2>
      <p>{description}</p>
      <p className="text-lg font-semibold">Price: ${price}</p>
      {discount && <p className="text-red-500">Discount: {discount}</p>}
    </div>
  );
};

export default TourPackageCard;
