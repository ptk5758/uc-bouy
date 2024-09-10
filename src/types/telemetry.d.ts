// ID,VOL,G_LATITUDE,G_LONGITUDE,W_TEMPERATURE,W_DEPTH,WIND_SPEED,XBEE_ON
namespace Telemetry {
    type Column = "ID" | "VOL" | "G_LATITUDE" | "G_LONGITUDE" |
    "W_TEMPERATURE"|"W_DEPTH"|"WIND_SPEED"|"XBEE_ON"

    interface TelemetryData
    {
        ID: string;
        VOL: string;
        G_LATITUDE: number;
        G_LONGITUDE: number;
        W_TEMPERATURE: number;
        W_DEPTH: number;
        WIND_SPEED: number;
        XBEE_ON: boolean;
    }
}