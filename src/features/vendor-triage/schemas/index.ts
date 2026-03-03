import { z } from "zod";

export const vendorDispatchSchema = z.object({
  vendorName: z.string().min(2, "Vendor name is required."),
  taskReference: z.string().min(2, "Task reference is required."),
});

export type VendorDispatchValues = z.infer<typeof vendorDispatchSchema>;
