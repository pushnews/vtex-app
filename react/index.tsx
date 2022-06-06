import {canUseDOM} from 'vtex.render-runtime'

import type {PixelMessage} from './typings/events'

window.IlabsPush = window.IlabsPush || []

export function handleEvents(e: PixelMessage) {
  switch (e.data.eventName) {
    case 'vtex:addToCart': {
      window.IlabsPush.push(["ecommerce.itemAddedToCart"])
      break
    }
    case 'vtex:pageView': {
      if (e.data.pageUrl.match("checkout/orderPlaced")) {
        window.IlabsPush.push(["ecommerce.checkoutCompleted"]);
      }
      break
    }
    case 'vtex:orderPlacedTracked':
    case 'vtex:orderPlaced': {
      window.IlabsPush.push(["ecommerce.checkoutCompleted"]);
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
