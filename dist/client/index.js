import { vEmailEvent } from "../component/shared.js";
export { vEmailEvent };
export class Inbound {
    component;
    config;
    onEmailEvent;
    constructor(component, config = {}) {
        this.component = component;
        this.config = config;
        this.onEmailEvent = config.onEmailEvent;
    }
    /**
     * Handles an incoming webhook from Inbound.new.
     * This should be called from an httpAction in your app.
     *
     * Verification is done by comparing X-Webhook-Verification-Token header
     * with the INBOUND_WEBHOOK_SECRET environment variable.
     */
    async handleInboundWebhook(ctx, request) {
        // Optional webhook verification using custom header
        // In inbound.new dashboard, add a Custom Header: X-Webhook-Secret = your_secret
        // Then set: npx convex env set INBOUND_WEBHOOK_SECRET your_secret
        const webhookSecret = this.config.webhookSecret ?? process.env.INBOUND_WEBHOOK_SECRET;
        if (webhookSecret) {
            const headerValue = request.headers.get("X-Webhook-Secret");
            if (headerValue !== webhookSecret) {
                return new Response("Unauthorized", { status: 401 });
            }
        }
        // If no secret configured, allow the webhook (inbound.new doesn't provide built-in verification)
        const payload = (await request.json());
        // Check if it's an email received event
        if (payload.email) {
            const { email } = payload;
            // Save to component's database
            await ctx.runMutation(this.component.lib.saveInboundEmail, {
                messageId: email.id,
                from: email.from?.text ?? "unknown",
                to: email.to?.text ?? "unknown",
                subject: email.subject ?? "(no subject)",
                text: email.parsedData.textBody ?? undefined,
                html: email.parsedData.htmlBody ?? undefined,
                cc: email.parsedData.cc?.addresses.map(a => a.address).filter((a) => !!a),
                bcc: email.parsedData.bcc?.addresses.map(a => a.address).filter((a) => !!a),
                receivedAt: Date.now(),
                attachments: email.parsedData.attachments.map(a => ({
                    filename: a.filename,
                    contentType: a.contentType,
                    size: a.size,
                    contentId: a.contentId,
                    contentDisposition: a.contentDisposition,
                    downloadUrl: a.downloadUrl,
                })),
            });
        }
        return new Response("OK", { status: 200 });
    }
    /**
     * Sends an email via Inbound.new.
     * This queues the email for durable background sending.
     *
     * In testMode (default true), only test addresses are allowed.
     */
    async send(ctx, options) {
        // Validate testMode for all recipients
        this.validateTestMode(options.to, options.cc, options.bcc);
        const apiKey = this.config.apiKey ?? process.env.INBOUND_API_KEY;
        const args = { ...options, apiKey };
        return (await ctx.runMutation(this.component.lib.sendEmail, args));
    }
    /**
     * Alias for send() - matches common email API patterns.
     */
    async sendEmail(ctx, options) {
        return this.send(ctx, options);
    }
    /**
     * Sends multiple emails in a batch.
     * More efficient than calling send() multiple times.
     *
     * Returns an array of email IDs for tracking.
     *
     * In testMode (default true), only test addresses are allowed.
     */
    async sendBatch(ctx, emails) {
        const emailIds = [];
        for (const options of emails) {
            // Validate testMode for each email
            this.validateTestMode(options.to);
            const apiKey = this.config.apiKey ?? process.env.INBOUND_API_KEY;
            const args = { ...options, apiKey };
            const emailId = (await ctx.runMutation(this.component.lib.sendEmail, args));
            emailIds.push(emailId);
        }
        return emailIds;
    }
    /**
     * Replies to an existing inbound email.
     */
    async reply(ctx, args) {
        const apiKey = this.config.apiKey ?? process.env.INBOUND_API_KEY;
        const callArgs = { ...args, apiKey };
        return (await ctx.runMutation(this.component.lib.replyEmail, callArgs));
    }
    /**
     * Lists received emails.
     */
    async listInboundEmails(ctx, args = {}) {
        return (await ctx.runQuery(this.component.lib.listInboundEmails, args));
    }
    /**
     * Lists sent (outbound) emails.
     */
    async listOutboundEmails(ctx, args = {}) {
        return (await ctx.runQuery(this.component.lib.listOutboundEmails, args));
    }
    /**
     * Gets details of an outbound email.
     */
    async getOutboundEmail(ctx, emailId) {
        return (await ctx.runQuery(this.component.lib.getEmailById, { emailId }));
    }
    /**
     * Gets the status of an email including tracking information.
     * Returns null if the email doesn't exist.
     */
    async status(ctx, emailId) {
        const email = await this.getOutboundEmail(ctx, emailId);
        if (!email)
            return null;
        return {
            status: email.status,
            failed: email.status === "failed",
            bounced: email.bounced ?? false,
            complained: email.complained ?? false,
            opened: email.opened ?? false,
            clicked: email.clicked ?? false,
            deliveryDelayed: email.deliveryDelayed ?? false,
            errorMessage: email.error ?? null,
            finalizedAt: email.finalizedAt,
        };
    }
    /**
     * Cancels a queued email.
     * Throws if the email has already been sent or failed.
     */
    async cancelEmail(ctx, emailId) {
        return (await ctx.runMutation(this.component.lib.cancelEmail, { emailId }));
    }
    /**
     * Validates if an email address is allowed in testMode.
     * In testMode, only @inbnd.dev and @example.com addresses are allowed.
     */
    isTestAddress(email) {
        const addresses = Array.isArray(email) ? email : [email];
        const testDomains = ["inbnd.dev", "example.com"];
        return addresses.every((addr) => {
            const domain = addr.split("@").pop()?.toLowerCase();
            return domain && testDomains.includes(domain);
        });
    }
    /**
     * Checks if testMode is enabled and validates all recipient addresses.
     */
    validateTestMode(to, cc, bcc) {
        // testMode defaults to true for safety
        const testMode = this.config.testMode ?? true;
        if (!testMode)
            return;
        const allRecipients = [
            ...(Array.isArray(to) ? to : [to]),
            ...(cc ?? []),
            ...(bcc ?? []),
        ];
        for (const addr of allRecipients) {
            if (!this.isTestAddress(addr)) {
                throw new Error(`testMode is enabled. Email address "${addr}" is not a valid test address. ` +
                    "Only @inbnd.dev and @example.com addresses are allowed. " +
                    "Set testMode: false in your Inbound options to send to real addresses.");
            }
        }
    }
    /**
     * Lists delivery events for an email or all emails.
     */
    async listDeliveryEvents(ctx, args = {}) {
        return (await ctx.runQuery(this.component.lib.listDeliveryEvents, args));
    }
}
//# sourceMappingURL=index.js.map