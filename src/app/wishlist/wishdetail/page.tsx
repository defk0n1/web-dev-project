import React from 'react';
import WishDetails from '../../../components/wish/wishdetails';


const WishDetailPage: React.FC = () => {
    const dummyWish = {
        name: "Dreame D10 Plus Gen 2",
        price: 259.00,
        link: "https://www.amazon.com/example",
        image: "/images/dreame-d10.jpg",
        vendor: "Amazon",
        vendorlogo: "/images/amazon-logo.png"
    };

    return (
        <WishDetails {...dummyWish} />
    );
};

export default WishDetailPage;