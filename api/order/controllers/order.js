"use strict";
/**
 * Order.js controller
 *
 * @description: A set of functions called "actions" for managing `Order`.
 */
// note that this needs to be a "private" key from STRIPE
const stripe = require("stripe")(
  "sk_test_51LVEEkIvBoYtH7tMHdHeCBkc7JylESbEJRB5M2vvHskjBM0EfBxlyTxVgiOeK0zye60Ej7UfYHdznZMndvjswYRx00STT0qLfD"
);
module.exports = {
  /**
   * Create a/an order record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    console.log("ctx", ctx)
    const { address, amount, dishes, token, city, state } = JSON.parse(
      ctx.request.body
    );
    const stripeAmount = Math.floor(amount * 100);
    // charge on stripe
    const charge = await stripe.charges.create({
      // Transform cents to dollars.
      amount: stripeAmount,
      currency: "usd",
      description: `Order ${new Date()} by ${ctx.state.user._id}`,
      source: token,
    });
    console.log("charge", charge)
    // Register the order in the database
    const order = await strapi.services.order.create({
      user: ctx.state.user.id,
      charge_id: charge.id,
      amount: stripeAmount,
      address,
      dishes,
      city,
      state,
    });
    console.log("order", order)
    return order;
  },
};
