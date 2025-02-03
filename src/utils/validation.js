import Joi from 'joi';

const receiptSchema = Joi.object({
  retailer: Joi.string().pattern(/^[\w\s\-&]+$/).required(),
  purchaseDate: Joi.date().iso().required(),
  purchaseTime: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).required(),
  items: Joi.array().min(1).items(
    Joi.object({
      shortDescription: Joi.string().pattern(/^[\w\s\-]+$/).required(),
      price: Joi.string().pattern(/^\d+\.\d{2}$/).required(),
    })
  ).required(),
  total: Joi.string().pattern(/^\d+\.\d{2}$/).required(),
});

const validateReceipt = (receipt) => receiptSchema.validate(receipt);

export { validateReceipt };