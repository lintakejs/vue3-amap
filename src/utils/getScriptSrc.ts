import { MapConfig } from "../@types/common";

export function getScriptSrc(config: MapConfig) {
  const paramKeys = ["v", "key", "plugin", "callback"];

  const params = Object.keys(config)
    .filter((k) => ~paramKeys.indexOf(k))
    .filter((k) => config[k as keyof MapConfig] != null)
    .filter((k) => {
      return (
        !Array.isArray(config[k as keyof MapConfig]) ||
        (Array.isArray(config[k as keyof MapConfig]) &&
          (config[k as keyof MapConfig] as []).length > 0)
      );
    })
    .map((k) => {
      const v = config[k as keyof MapConfig];
      if (Array.isArray(v)) return { key: k, value: v.join(",") };
      return { key: k, value: v };
    })
    .map((entry) => `${entry.key}=${entry.value}`)
    .join("&");

  return `${config.protocol}://${config.hostAndPath}?${params}`;
}
