declare const _default: import("convex/server").SchemaDefinition<{
    inbound_emails: import("convex/server").TableDefinition<import("convex/values").VObject<{
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
    }, {
        messageId: import("convex/values").VString<string, "required">;
        from: import("convex/values").VString<string, "required">;
        to: import("convex/values").VString<string, "required">;
        subject: import("convex/values").VString<string, "required">;
        text: import("convex/values").VString<string | undefined, "optional">;
        html: import("convex/values").VString<string | undefined, "optional">;
        cc: import("convex/values").VArray<string[] | undefined, import("convex/values").VString<string, "required">, "optional">;
        bcc: import("convex/values").VArray<string[] | undefined, import("convex/values").VString<string, "required">, "optional">;
        receivedAt: import("convex/values").VFloat64<number, "required">;
        attachments: import("convex/values").VArray<{
            filename?: string | undefined;
            contentType?: string | undefined;
            size?: number | undefined;
            contentId?: string | undefined;
            contentDisposition?: string | undefined;
            downloadUrl: string;
        }[] | undefined, import("convex/values").VObject<{
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
        }, "required", "filename" | "contentType" | "size" | "contentId" | "contentDisposition" | "downloadUrl">, "optional">;
    }, "required", "messageId" | "attachments" | "html" | "text" | "bcc" | "cc" | "from" | "receivedAt" | "subject" | "to">, {
        by_messageId: ["messageId", "_creationTime"];
    }, {}, {}>;
    outbound_emails: import("convex/server").TableDefinition<import("convex/values").VObject<{
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
        status: import("convex/values").VUnion<"queued" | "processing" | "sent" | "failed" | "cancelled", [import("convex/values").VLiteral<"queued", "required">, import("convex/values").VLiteral<"processing", "required">, import("convex/values").VLiteral<"sent", "required">, import("convex/values").VLiteral<"failed", "required">, import("convex/values").VLiteral<"cancelled", "required">], "required", never>;
        inboundId: import("convex/values").VString<string | undefined, "optional">;
        error: import("convex/values").VString<string | undefined, "optional">;
        segment: import("convex/values").VFloat64<number, "required">;
        finalizedAt: import("convex/values").VFloat64<number | undefined, "optional">;
        bounced: import("convex/values").VBoolean<boolean | undefined, "optional">;
        complained: import("convex/values").VBoolean<boolean | undefined, "optional">;
        opened: import("convex/values").VBoolean<boolean | undefined, "optional">;
        clicked: import("convex/values").VBoolean<boolean | undefined, "optional">;
        deliveryDelayed: import("convex/values").VBoolean<boolean | undefined, "optional">;
    }, "required", "inboundId" | "attachments" | "html" | "text" | "bcc" | "cc" | "from" | "subject" | "to" | "headers" | "replyTo" | `headers.${string}` | "status" | "finalizedAt" | "bounced" | "complained" | "opened" | "clicked" | "deliveryDelayed" | "error" | "segment">, {
        by_status_segment: ["status", "segment", "_creationTime"];
        by_finalizedAt: ["finalizedAt", "_creationTime"];
        by_inboundId: ["inboundId", "_creationTime"];
    }, {}, {}>;
    delivery_events: import("convex/server").TableDefinition<import("convex/values").VObject<{
        emailId?: import("convex/values").GenericId<"outbound_emails"> | undefined;
        message?: string | undefined;
        rawEvent?: any;
        eventType: string;
        inboundId: string;
        createdAt: number;
    }, {
        emailId: import("convex/values").VId<import("convex/values").GenericId<"outbound_emails"> | undefined, "optional">;
        inboundId: import("convex/values").VString<string, "required">;
        eventType: import("convex/values").VString<string, "required">;
        createdAt: import("convex/values").VFloat64<number, "required">;
        message: import("convex/values").VString<string | undefined, "optional">;
        rawEvent: import("convex/values").VAny<any, "optional", string>;
    }, "required", "emailId" | "eventType" | "inboundId" | "message" | "rawEvent" | "createdAt" | `rawEvent.${string}`>, {
        by_emailId: ["emailId", "_creationTime"];
        by_inboundId: ["inboundId", "_creationTime"];
    }, {}, {}>;
    nextBatchRun: import("convex/server").TableDefinition<import("convex/values").VObject<{
        runId: import("convex/values").GenericId<"_scheduled_functions">;
    }, {
        runId: import("convex/values").VId<import("convex/values").GenericId<"_scheduled_functions">, "required">;
    }, "required", "runId">, {}, {}, {}>;
}, true>;
export default _default;
//# sourceMappingURL=schema.d.ts.map