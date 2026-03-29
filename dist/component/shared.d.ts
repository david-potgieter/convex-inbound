import { type Infer } from "convex/values";
export declare const vStatus: import("convex/values").VUnion<"queued" | "processing" | "sent" | "failed" | "cancelled", [import("convex/values").VLiteral<"queued", "required">, import("convex/values").VLiteral<"processing", "required">, import("convex/values").VLiteral<"sent", "required">, import("convex/values").VLiteral<"failed", "required">, import("convex/values").VLiteral<"cancelled", "required">], "required", never>;
export type Status = Infer<typeof vStatus>;
export declare const vAttachment: import("convex/values").VObject<{
    contentType?: string | undefined;
    filename: string;
    content: any;
}, {
    filename: import("convex/values").VString<string, "required">;
    content: import("convex/values").VUnion<any, [import("convex/values").VString<string, "required">, import("convex/values").VAny<any, "required", string>], "required", string>;
    contentType: import("convex/values").VString<string | undefined, "optional">;
}, "required", "filename" | "content" | "contentType" | `content.${string}`>;
export type Attachment = Infer<typeof vAttachment>;
export declare const vEmailOptions: import("convex/values").VObject<{
    attachments?: any[] | undefined;
    html?: string | undefined;
    text?: string | undefined;
    bcc?: string[] | undefined;
    cc?: string[] | undefined;
    headers?: Record<string, string> | undefined;
    replyTo?: string | string[] | undefined;
    from: string;
    subject: string;
    to: string | string[];
}, {
    from: import("convex/values").VString<string, "required">;
    to: import("convex/values").VUnion<string | string[], [import("convex/values").VString<string, "required">, import("convex/values").VArray<string[], import("convex/values").VString<string, "required">, "required">], "required", never>;
    subject: import("convex/values").VString<string, "required">;
    text: import("convex/values").VString<string | undefined, "optional">;
    html: import("convex/values").VString<string | undefined, "optional">;
    cc: import("convex/values").VArray<string[] | undefined, import("convex/values").VString<string, "required">, "optional">;
    bcc: import("convex/values").VArray<string[] | undefined, import("convex/values").VString<string, "required">, "optional">;
    replyTo: import("convex/values").VUnion<string | string[] | undefined, [import("convex/values").VString<string, "required">, import("convex/values").VArray<string[], import("convex/values").VString<string, "required">, "required">], "optional", never>;
    headers: import("convex/values").VRecord<Record<string, string> | undefined, import("convex/values").VString<string, "required">, import("convex/values").VString<string, "required">, "optional", string>;
    attachments: import("convex/values").VArray<any[] | undefined, import("convex/values").VAny<any, "required", string>, "optional">;
}, "required", "attachments" | "html" | "text" | "bcc" | "cc" | "from" | "subject" | "to" | "headers" | "replyTo" | `headers.${string}`>;
export declare const vOutboundEmailOptions: import("convex/values").VObject<{
    apiKey?: string | undefined;
    attachments?: {
        contentType?: string | undefined;
        filename: string;
        content: any;
    }[] | undefined;
    html?: string | undefined;
    text?: string | undefined;
    bcc?: string[] | undefined;
    cc?: string[] | undefined;
    headers?: Record<string, string> | undefined;
    replyTo?: string | string[] | undefined;
    from: string;
    subject: string;
    to: string | string[];
}, {
    from: import("convex/values").VString<string, "required">;
    to: import("convex/values").VUnion<string | string[], [import("convex/values").VString<string, "required">, import("convex/values").VArray<string[], import("convex/values").VString<string, "required">, "required">], "required", never>;
    subject: import("convex/values").VString<string, "required">;
    text: import("convex/values").VString<string | undefined, "optional">;
    html: import("convex/values").VString<string | undefined, "optional">;
    cc: import("convex/values").VArray<string[] | undefined, import("convex/values").VString<string, "required">, "optional">;
    bcc: import("convex/values").VArray<string[] | undefined, import("convex/values").VString<string, "required">, "optional">;
    replyTo: import("convex/values").VUnion<string | string[] | undefined, [import("convex/values").VString<string, "required">, import("convex/values").VArray<string[], import("convex/values").VString<string, "required">, "required">], "optional", never>;
    headers: import("convex/values").VRecord<Record<string, string> | undefined, import("convex/values").VString<string, "required">, import("convex/values").VString<string, "required">, "optional", string>;
    attachments: import("convex/values").VArray<{
        contentType?: string | undefined;
        filename: string;
        content: any;
    }[] | undefined, import("convex/values").VObject<{
        contentType?: string | undefined;
        filename: string;
        content: any;
    }, {
        filename: import("convex/values").VString<string, "required">;
        content: import("convex/values").VUnion<any, [import("convex/values").VString<string, "required">, import("convex/values").VAny<any, "required", string>], "required", string>;
        contentType: import("convex/values").VString<string | undefined, "optional">;
    }, "required", "filename" | "content" | "contentType" | `content.${string}`>, "optional">;
    apiKey: import("convex/values").VString<string | undefined, "optional">;
}, "required", "apiKey" | "attachments" | "html" | "text" | "bcc" | "cc" | "from" | "subject" | "to" | "headers" | "replyTo" | `headers.${string}`>;
export type EmailOptions = Infer<typeof vOutboundEmailOptions>;
export declare const vInboundAttachment: import("convex/values").VObject<{
    filename?: string | undefined;
    contentType?: string | undefined;
    size?: number | undefined;
    contentId?: string | undefined;
    contentDisposition?: string | undefined;
    downloadUrl: string;
}, {
    filename: import("convex/values").VString<string | undefined, "optional">;
    contentType: import("convex/values").VString<string | undefined, "optional">;
    size: import("convex/values").VFloat64<number | undefined, "optional">;
    contentId: import("convex/values").VString<string | undefined, "optional">;
    contentDisposition: import("convex/values").VString<string | undefined, "optional">;
    downloadUrl: import("convex/values").VString<string, "required">;
}, "required", "filename" | "contentType" | "size" | "contentId" | "contentDisposition" | "downloadUrl">;
export type InboundAttachment = Infer<typeof vInboundAttachment>;
export interface InboundEmail {
    _id: string;
    _creationTime: number;
    messageId: string;
    from: string;
    to: string;
    subject: string;
    text?: string;
    html?: string;
    cc?: string[];
    bcc?: string[];
    receivedAt: number;
    attachments?: InboundAttachment[];
}
export interface OutboundEmail extends EmailOptions {
    _id: string;
    _creationTime: number;
    status: Status;
    inboundId?: string;
    error?: string;
    segment: number;
    finalizedAt?: number;
    bounced?: boolean;
    complained?: boolean;
    opened?: boolean;
    clicked?: boolean;
    deliveryDelayed?: boolean;
}
export declare const vInboundOptions: import("convex/values").VObject<{
    apiKey?: string | undefined;
    webhookSecret?: string | undefined;
    testMode?: boolean | undefined;
}, {
    apiKey: import("convex/values").VString<string | undefined, "optional">;
    webhookSecret: import("convex/values").VString<string | undefined, "optional">;
    testMode: import("convex/values").VBoolean<boolean | undefined, "optional">;
}, "required", "apiKey" | "webhookSecret" | "testMode">;
export type InboundOptions = Infer<typeof vInboundOptions>;
export declare const EMAIL_EVENT_TYPES: readonly ["email.sent", "email.delivered", "email.delivery_delayed", "email.bounced", "email.complained", "email.opened", "email.clicked"];
export type EmailEventType = typeof EMAIL_EVENT_TYPES[number];
export declare const vEmailEvent: import("convex/values").VObject<{
    emailId?: string | undefined;
    message?: string | undefined;
    inboundId: string;
    type: string;
    createdAt: number;
}, {
    type: import("convex/values").VString<string, "required">;
    emailId: import("convex/values").VString<string | undefined, "optional">;
    inboundId: import("convex/values").VString<string, "required">;
    createdAt: import("convex/values").VFloat64<number, "required">;
    message: import("convex/values").VString<string | undefined, "optional">;
}, "required", "emailId" | "inboundId" | "message" | "type" | "createdAt">;
export type EmailEvent = Infer<typeof vEmailEvent>;
export interface DeliveryEvent {
    _id: string;
    _creationTime: number;
    emailId?: string;
    inboundId: string;
    eventType: string;
    createdAt: number;
    message?: string;
    rawEvent?: any;
}
//# sourceMappingURL=shared.d.ts.map