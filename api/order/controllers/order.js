'use strict';
const stripe=require('stripe')('sk_test_piT2DwEpx013wZpIBGSdsCbu00T9ZJomev')


/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  create:async context=>{
    const {name,total,items,stripeTokenId}=context.request.body
    const {id}=context.state.user

    const charge=await stripe.charges.create({
      amount:Math.round(total*100),
      currency:"usd",
      source:stripeTokenId,
      description:`Order ${new Date()} by ${context.state.user.userName}`
    })

    const order=await strapi.services.order.create({
      name,
      total,
      items,
      user:id
    })
    return order


  }
};
