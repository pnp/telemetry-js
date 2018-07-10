import "whatwg-fetch";

const PNP_TELEMETRY_URL = "https://pnptelemetryproxy.azurewebsites.net/track";

/**
 * PnP Telemetry class
 *
 * This can be used to track PnP client-side events
 */
export default class PnPTelemetry {
  private events: any[] = [];
  private timeout: number = null;

  /**
   * Initialize the telemetry class and return the instance
   */
  public static getInstance(): PnPTelemetry {
    if (typeof (window as any).pnpTelemetry === "undefined") {
      (window as any).pnpTelemetry = new PnPTelemetry();
    }
    return (window as any).pnpTelemetry;
  }

  /**
   * Track the event information
   *
   * @param name
   * @param props
   */
  public trackEvent(name: string, properties?: any) {
    this.events.push({ name, properties});
    this.debounceTracking();
  }

  /**
   * Delay event tracking
   */
  private async debounceTracking() {
    // Check if timeout was defined
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    // Set a new timeout
    this.timeout = setTimeout(async () => {
      await fetch(PNP_TELEMETRY_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.events)
      });
      // Reset the events
      this.events = [];
    }, 1000);
  }
}