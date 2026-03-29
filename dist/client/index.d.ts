import type { FunctionReference, FunctionArgs, FunctionReturnType } from "convex/server";
import type { ComponentApi } from "../component/_generated/component.js";
import type { InboundEmail, OutboundEmail, EmailOptions, InboundOptions, Attachment, InboundAttachment, EmailEvent, DeliveryEvent } from "../component/shared.js";
import { vEmailEvent } from "../component/shared.js";
export type { InboundEmail, OutboundEmail, EmailOptions, InboundOptions, Attachment, InboundAttachment, EmailEvent, DeliveryEvent };
export { vEmailEvent };
export type RunQueryCtx = {
    runQuery: <Query extends FunctionReference<"query", "internal">>(query: Query, args: FunctionArgs<Query>) => Promise<FunctionReturnType<Query>>;
};
export type RunMutationCtx = RunQueryCtx & {
    runMutation: <Mutation extends FunctionReference<"mutation", "internal">>(mutation: Mutation, args: FunctionArgs<Mutation>) => Promise<FunctionReturnType<Mutation>>;
};
export type RunActionCtx = RunMutationCtx & {
    runAction: <Action extends FunctionReference<"action", "internal">>(action: Action, args: FunctionArgs<Action>) => Promise<FunctionReturnType<Action>>;
};
export interface InboundClientOptions extends InboundOptions {
    onEmailEvent?: FunctionReference<"mutation", "internal", {
        emailId: string;
        event: EmailEvent;
    }>;
}
export declare class Inbound {
    private component;
    private config;
    private onEmailEvent?;
    constructor(component: ComponentApi, config?: InboundClientOptions);
    /**
     * Handles an incoming webhook from Inbound.new.
     * This should be called from an httpAction in your app.
     *
     * Verification is done by comparing X-Webhook-Verification-Token header
     * with the INBOUND_WEBHOOK_SECRET environment variable.
     */
    handleInboundWebhook(ctx: RunMutationCtx | RunActionCtx, request: Request): Promise<Response>;
    /**
     * Sends an email via Inbound.new.
     * This queues the email for durable background sending.
     *
     * In testMode (default true), only test addresses are allowed.
     */
    send(ctx: RunMutationCtx | RunActionCtx, options: EmailOptions): Promise<string>;
    /**
     * Alias for send() - matches common email API patterns.
     */
    sendEmail(ctx: RunMutationCtx | RunActionCtx, options: EmailOptions): Promise<string>;
    /**
     * Sends multiple emails in a batch.
     * More efficient than calling send() multiple times.
     *
     * Returns an array of email IDs for tracking.
     *
     * In testMode (default true), only test addresses are allowed.
     */
    sendBatch(ctx: RunMutationCtx | RunActionCtx, emails: EmailOptions[]): Promise<string[]>;
    /**
     * Replies to an existing inbound email.
     */
    reply(ctx: RunMutationCtx | RunActionCtx, args: {
        inboundEmailId: string;
        text?: string;
        html?: string;
        attachments?: Attachment[];
    }): Promise<string>;
    /**
     * Lists received emails.
     */
    listInboundEmails(ctx: RunQueryCtx | RunActionCtx, args?: {
        limit?: number;
    }): Promise<InboundEmail[]>;
    /**
     * Lists sent (outbound) emails.
     */
    listOutboundEmails(ctx: RunQueryCtx | RunActionCtx, args?: {
        limit?: number;
    }): Promise<OutboundEmail[]>;
    /**
     * Gets details of an outbound email.
     */
    getOutboundEmail(ctx: RunQueryCtx | RunActionCtx, emailId: string): Promise<OutboundEmail | null>;
    /**
     * Gets the status of an email including tracking information.
     * Returns null if the email doesn't exist.
     */
    status(ctx: RunQueryCtx | RunActionCtx, emailId: string): Promise<{
        status: "queued" | "processing" | "sent" | "failed" | "cancelled";
        failed: boolean;
        bounced: boolean;
        complained: boolean;
        opened: boolean;
        clicked: boolean;
        deliveryDelayed: boolean;
        errorMessage: string | null;
        finalizedAt?: number;
    } | null>;
    /**
     * Cancels a queued email.
     * Throws if the email has already been sent or failed.
     */
    cancelEmail(ctx: RunMutationCtx | RunActionCtx, emailId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    /**
     * Validates if an email address is allowed in testMode.
     * In testMode, only @inbnd.dev and @example.com addresses are allowed.
     */
    private isTestAddress;
    /**
     * Checks if testMode is enabled and validates all recipient addresses.
     */
    private validateTestMode;
    /**
     * Lists delivery events for an email or all emails.
     */
    listDeliveryEvents(ctx: RunQueryCtx | RunActionCtx, args?: {
        emailId?: string;
        limit?: number;
    }): Promise<DeliveryEvent[]>;
}
//# sourceMappingURL=index.d.ts.map