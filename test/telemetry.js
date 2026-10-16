const assert = require("assert");

global.window = {};

let rejectRequest = true;
const requests = [];
global.fetch = (_url, options) => {
  requests.push(options);
  return rejectRequest
    ? Promise.reject(new Error("network unavailable"))
    : Promise.resolve({ ok: true });
};

const PnPTelemetry = require("../dist/index.js").default;
const telemetry = PnPTelemetry.getInstance();
const unhandledRejections = [];
process.on("unhandledRejection", (error) => unhandledRejections.push(error));

telemetry.trackEvent("first");
setTimeout(() => {
  assert.deepStrictEqual(unhandledRejections, []);
  assert.strictEqual(telemetry.events.length, 1);

  rejectRequest = false;
  telemetry.trackEvent("second");
  setTimeout(() => {
    assert.deepStrictEqual(unhandledRejections, []);
    assert.deepStrictEqual(
      JSON.parse(requests[1].body).map((event) => event.name),
      ["first", "second"],
    );
    assert.strictEqual(telemetry.events.length, 0);
  }, 1100);
}, 1100);
