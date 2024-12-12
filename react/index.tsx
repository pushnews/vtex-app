import {canUseDOM} from 'vtex.render-runtime'

import type {PixelMessage} from './typings/events'

window.IlabsPush = window.IlabsPush || []

export function handleEvents(e: PixelMessage) {
  switch (e.data.eventName) {
    case 'vtex:addToCart': {
      let product = e.data.items[0] ?? {};
      window.IlabsPush.push(["ecommerce.itemAddedToCart", {
        context: {
          name: product.name ?? '',
          imageUrl: product.imageUrl ?? '',
          price: product.price ? (product.price / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '',
          url: window.location.href,
        }
      }])
      break
    }
    case 'vtex:orderPlacedTracked':
    case 'vtex:orderPlaced': {
      window.IlabsPush.push(["ecommerce.checkoutCompleted", {
        context: {
          amount: e.data.transactionTotal,
          currency: e.data.transactionCurrency,
          totalProducts: e.data.transactionProducts.reduce((acc, product) => acc + product.quantity, 0),
          url: window.location.href,
        }
      }]);
      break
    }
    case 'vtex:cartChanged': {
      let isCartEmpty = e.data.items.length === 0;
      if (isCartEmpty) {
        window.IlabsPush.push(["ecommerce.cartEmptied"]);
      }
      break
    }

    default: {
      break
    }
  }
}

if (canUseDOM) {
  window.addEventListener('message', handleEvents)
}
