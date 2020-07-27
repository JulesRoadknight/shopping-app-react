import React from 'react';

const ShoppingFeed = () => {
  const defaultRecommendedItem = {'title': 'A Free Sample', 'price': '10.00', 'currency': '£'};

  return(
    <div>
      <div data-testid='recommendedItem' value={defaultRecommendedItem.title}>
        {defaultRecommendedItem.title} - {defaultRecommendedItem.currency}{defaultRecommendedItem.price}
      </div>
    </div>
  )
}

export default ShoppingFeed;