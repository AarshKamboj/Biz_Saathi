import express from "express";
import Invoice from "../models/Invoice.js";

const router = express.Router();

// CREATE INVOICE
router.post("/", async (req, res) => {
  try {
    console.log("Invoice Data:", req.body);

    const count = await Invoice.countDocuments();

    const newInvoice = new Invoice({
      ...req.body,
      invoiceNumber: `INV-${1000 + count}`,
    });

    await newInvoice.save();

    res.json({
      success: true,
      invoice: newInvoice,
    });

  } catch (err) {
    console.error("INVOICE ERROR:", err);

    res.status(500).json({
      success: false,
      error: err.message,
      stack: err.stack,
    });
  }
});

// GET ALL INVOICES
router.get("/", async (req, res) => {
  const invoices = await Invoice.find().sort({ date: -1 });
  res.json(invoices);
});

export default router;