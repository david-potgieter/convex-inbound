import { v } from "convex/values";
export const vStatus = v.union(v.literal("queued"), v.literal("processing"), v.literal("sent"), v.literal("failed"), v.literal("cancelled"));
export const vAttachment = v.object({
    filename: v.string(),
    content: v.union(v.string(), v.any()), // Base64 string or Blob-like
    contentType: v.optional(v.string()),
});
export const vEmailOptions = v.object({
    from: v.string(),
    to: v.union(v.string(), v.array(v.string())),
    subject: v.string(),
    text: v.optional(v.string()),
    html: v.optional(v.string()),
    cc: v.optional(v.array(v.string())),
    bcc: v.optional(v.array(v.string())),
    replyTo: v.optional(v.union(v.string(), v.array(v.string()))),
    headers: v.optional(v.record(v.string(), v.string())),
    attachments: v.optional(v.array(v.any())), // Convex attachment if possible, or use our vAttachment
});
// Since v.attachment is specific to Convex, let's use a simpler version for the SDK call
export const vOutboundEmailOptions = v.object({
    from: v.string(),
    to: v.union(v.string(), v.array(v.string())),
    subject: v.string(),
    text: v.optional(v.string()),
    html: v.optional(v.string()),
    cc: v.optional(v.array(v.string())),
    bcc: v.optional(v.array(v.string())),
    replyTo: v.optional(v.union(v.string(), v.array(v.string()))),
    headers: v.optional(v.record(v.string(), v.string())),
    attachments: v.optional(v.array(vAttachment)),
    apiKey: v.optional(v.string()),
});
export const vInboundAttachment = v.object({
    filename: v.optional(v.string()),
    contentType: v.optional(v.string()),
    size: v.optional(v.number()),
    contentId: v.optional(v.string()),
    contentDisposition: v.optional(v.string()),
    downloadUrl: v.string(),
});
export const vInboundOptions = v.object({
    apiKey: v.optional(v.string()),
    webhookSecret: v.optional(v.string()),
    testMode: v.optional(v.boolean()),
});
// Email event types (from inbound.new webhooks)
export const EMAIL_EVENT_TYPES = [
    "email.sent",
    "email.delivered",
    "email.delivery_delayed",
    "email.bounced",
    "email.complained",
    "email.opened",
    "email.clicked",
];
export const vEmailEvent = v.object({
    type: v.string(),
    emailId: v.optional(v.string()), // Our internal email ID
    inboundId: v.string(), // Inbound.new's ID
    createdAt: v.number(),
    message: v.optional(v.string()),
});
//# sourceMappingURL=shared.js.map