import { z } from "zod";

export const settingsUpdateSchema = z.object({
  organizationName: z.string().min(2, "Organization name is required."),
  timezone: z.string().min(2, "Timezone is required."),
});

export type SettingsUpdateValues = z.infer<typeof settingsUpdateSchema>;
