import { z } from 'zod';

export const zstUnknownRecordSchema = z.record(z.string(), z.unknown());
export type ZstUnknownRecord = z.infer<typeof zstUnknownRecordSchema>;

export const zstResponseSchema = z.union([
  z.array(z.unknown()),
  zstUnknownRecordSchema,
  z.string(),
  z.number(),
  z.boolean(),
  z.null(),
]);
export type ZstResponse = z.infer<typeof zstResponseSchema>;
