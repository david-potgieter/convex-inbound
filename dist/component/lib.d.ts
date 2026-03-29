export declare const getInboundEmail: import("convex/server").RegisteredQuery<"public", {
    messageId: string;
}, Promise<{
    _id: import("convex/values").GenericId<"inbound_emails">;
    _creationTime: number;
    attachments?: {
        filename?: string | undefined;
        contentType?: string | undefined;
        size?: number | undefined;
        contentId?: string | undefined;
        contentDisposition?: string | undefined;
        downloadUrl: string;
    }[] | undefined;
    html?: string | undefined;
    text?: string | undefined;
    bcc?: string[] | undefined;
    cc?: string[] | undefined;
    messageId: string;
    from: string;
    receivedAt: number;
    subject: string;
    to: string;
} | null>>;
export declare const saveInboundEmail: import("convex/server").RegisteredMutation<"public", {
    attachments?: any[] | undefined;
    html?: string | undefined;
    text?: string | undefined;
    bcc?: string[] | undefined;
    cc?: string[] | undefined;
    messageId: string;
    from: string;
    receivedAt: number;
    subject: string;
    to: string;
}, Promise<import("convex/values").GenericId<"inbound_emails">>>;
export declare const sendEmail: import("convex/server").RegisteredMutation<"public", {
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
}, Promise<import("convex/values").GenericId<"outbound_emails">>>;
export declare const replyEmail: import("convex/server").RegisteredMutation<"public", {
    apiKey?: string | undefined;
    attachments?: {
        contentType?: string | undefined;
        filename: string;
        content: any;
    }[] | undefined;
    html?: string | undefined;
    text?: string | undefined;
    inboundEmailId: import("convex/values").GenericId<"inbound_emails">;
}, Promise<import("convex/values").GenericId<"outbound_emails">>>;
/**
 * The Singleton Worker.
 * Picks up queued emails and sends them to the workpool.
 * Re-schedules itself if there is more work.
 */
export declare const makeBatch: import("convex/server").RegisteredMutation<"internal", {
    apiKey?: string | undefined;
}, Promise<void>>;
export declare const onEmailComplete: import("convex/server").RegisteredMutation<"internal", import("@convex-dev/workpool").OnCompleteArgs, null>;
/**
 * Sends a batch of emails efficiently.
 * This reduces the number of action invocations by processing multiple emails at once.
 */
export declare const performBatchSend: import("convex/server").RegisteredAction<"internal", {
    apiKey?: string | undefined;
    emailIds: import("convex/values").GenericId<"outbound_emails">[];
}, Promise<void>>;
export declare const getEmailById: import("convex/server").RegisteredQuery<"public", {
    emailId: import("convex/values").GenericId<"outbound_emails">;
}, Promise<{
    _id: import("convex/values").GenericId<"outbound_emails">;
    _creationTime: number;
    inboundId?: string | undefined;
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
    finalizedAt?: number | undefined;
    bounced?: boolean | undefined;
    complained?: boolean | undefined;
    opened?: boolean | undefined;
    clicked?: boolean | undefined;
    deliveryDelayed?: boolean | undefined;
    error?: string | undefined;
    from: string;
    subject: string;
    to: string | string[];
    status: "queued" | "processing" | "sent" | "failed" | "cancelled";
    segment: number;
} | null>>;
export declare const updateEmailStatus: import("convex/server").RegisteredMutation<"internal", {
    inboundId?: string | undefined;
    error?: string | undefined;
    emailId: import("convex/values").GenericId<"outbound_emails">;
    status: "queued" | "processing" | "sent" | "failed" | "cancelled";
}, Promise<void>>;
export declare const listInboundEmails: import("convex/server").RegisteredQuery<"public", {
    limit?: number | undefined;
}, Promise<{
    _id: import("convex/values").GenericId<"inbound_emails">;
    _creationTime: number;
    attachments?: {
        filename?: string | undefined;
        contentType?: string | undefined;
        size?: number | undefined;
        contentId?: string | undefined;
        contentDisposition?: string | undefined;
        downloadUrl: string;
    }[] | undefined;
    html?: string | undefined;
    text?: string | undefined;
    bcc?: string[] | undefined;
    cc?: string[] | undefined;
    messageId: string;
    from: string;
    receivedAt: number;
    subject: string;
    to: string;
}[]>>;
export declare const listOutboundEmails: import("convex/server").RegisteredQuery<"public", {
    limit?: number | undefined;
}, Promise<{
    _id: import("convex/values").GenericId<"outbound_emails">;
    _creationTime: number;
    inboundId?: string | undefined;
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
    finalizedAt?: number | undefined;
    bounced?: boolean | undefined;
    complained?: boolean | undefined;
    opened?: boolean | undefined;
    clicked?: boolean | undefined;
    deliveryDelayed?: boolean | undefined;
    error?: string | undefined;
    from: string;
    subject: string;
    to: string | string[];
    status: "queued" | "processing" | "sent" | "failed" | "cancelled";
    segment: number;
}[]>>;
/**
 * Cancels a queued email if it hasn't been sent yet.
 */
export declare const cancelEmail: import("convex/server").RegisteredMutation<"public", {
    emailId: import("convex/values").GenericId<"outbound_emails">;
}, Promise<{
    success: boolean;
    message: string;
}>>;
/**
 * Cleans up old finalized emails (sent, failed, cancelled).
 * Default: older than 7 days.
 */
export declare const cleanupOldEmails: import("convex/server").RegisteredMutation<"internal", {
    olderThan?: number | undefined;
}, Promise<{
    deleted: number;
}>>;
/**
 * Cleans up abandoned emails (queued but never processed).
 * Default: older than 4 weeks.
 */
export declare const cleanupAbandonedEmails: import("convex/server").RegisteredMutation<"internal", {
    olderThan?: number | undefined;
}, Promise<{
    marked: number;
}>>;
/**
 * Cleans up old inbound emails.
 * Default: older than 30 days.
 */
export declare const cleanupOldInboundEmails: import("convex/server").RegisteredMutation<"internal", {
    olderThan?: number | undefined;
}, Promise<{
    deleted: number;
}>>;
/**
 * Handles an email event from inbound.new webhook.
 * Stores the event and updates email tracking status.
 */
export declare const handleEmailEvent: import("convex/server").RegisteredMutation<"public", {
    message?: string | undefined;
    rawEvent?: any;
    eventType: string;
    inboundId: string;
}, Promise<{
    eventId: import("convex/values").GenericId<"delivery_events">;
    emailId: import("convex/values").GenericId<"outbound_emails"> | undefined;
}>>;
/**
 * Lists delivery events for an email.
 */
export declare const listDeliveryEvents: import("convex/server").RegisteredQuery<"public", {
    emailId?: import("convex/values").GenericId<"outbound_emails"> | undefined;
    limit?: number | undefined;
}, Promise<{
    _id: import("convex/values").GenericId<"delivery_events">;
    _creationTime: number;
    emailId?: import("convex/values").GenericId<"outbound_emails"> | undefined;
    message?: string | undefined;
    rawEvent?: any;
    eventType: string;
    inboundId: string;
    createdAt: number;
}[]>>;
//# sourceMappingURL=lib.d.ts.map