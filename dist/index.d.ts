import "whatwg-fetch";
/**
 * PnP Telemetry class
 *
 * This can be used to track PnP client-side events
 */
export default class PnPTelemetry {
    private events;
    private timeout;
    private tracking;
    /**
     * Initialize the telemetry class and return the instance
     */
    static getInstance(): PnPTelemetry;
    /**
     * Opt out of tracking
     */
    optOut(): void;
    /**
     * Track the event information
     *
     * @param name
     * @param props
     */
    trackEvent(name: string, properties?: any): void;
    /**
     * Delay event tracking
     */
    private debounceTracking;
}
