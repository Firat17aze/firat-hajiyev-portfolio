import DevIcon from "@/components/DevIcon"
import { normalizeTechName } from "@/lib/utils"

/**
 * Maps normalized tech names to their SVG icon filename when the two differ.
 * Any name not listed here is passed directly to DevIcon after normalization.
 * DevIcon falls back to FiCpu automatically if the SVG file does not exist.
 * The idea is to handle common abbreviations and variations that DevIcon does not recognize,
 * while still allowing for flexible input and gracefully resolving to a default icon when necessary.
 */
const iconExceptions: Record<string, string> = {
  ts: "typescript",
  js: "javascript",
  react: "reactjs",
  "react-native": "reactjs",
  reactnative: "reactjs",
  next: "nextjs",
  nuxt: "nuxtjs",
  node: "nodejs",
  "node-js": "nodejs",
  tailwind: "tailwindcss",
  springboot: "spring",
  "spring-boot": "spring",
  c: "c",
  csharp: "c-sharp",
  avr: "arduino",
  atmega328p: "arduino",
  stm32: "arduino",
  "hardware-registers": "arduino",
  uart: "arduino",
  adc: "arduino",
  eeprom: "arduino",
  "watchdog-timer": "arduino",
  imu: "arduino",
  cmake: "c",
  "sha-256": "c",
  "crc-8": "c",
  udp: "c",
  networking: "c",
  "real-time-systems": "c",
  "static-memory": "c",
  "kalman-filtering": "c",
  reliability: "c",
  "tensorflow-lite": "tensorflow",
  "edge-ai": "tensorflow",
  ai: "tensorflow",
  uav: "arduino",
  "hardware-integration": "arduino",
  "ai-evaluation": "tensorflow",
  "multimodal-ai": "tensorflow",
  "quality-assurance": "c",
  flask: "flask-dark",
  github: "github-dark",
  gcp: "google-cloud",
  "aws-iot": "aws",
  awsiot: "aws",
  vue: "vuejs",
  go: "golang",
  html: "html5",
  postgres: "postgresql",
  "robot-operating-system": "ros",
  "ros-robot-operating-system": "ros",
  "web3-js": "web3js",
  "oculus-sdk": "oculus",
}

/**
 * Maps a technology name to its corresponding icon component.
 * Normalizes the input, checks the exceptions map for icon filename overrides,
 * then delegates to DevIcon which falls back to FiCpu if the SVG is not found.
 * @param techName - Name of the technology (e.g., "TypeScript", "ts", "React Native").
 * @param iconClassName - Optional CSS class names for the icon.
 * @returns A React component representing the icon for the specified technology.
 */
export function techToIcon(techName: string, iconClassName?: string) {
  const normalized = normalizeTechName(techName)
  const iconName = techName === "C++" ? "c-plus-plus" : (iconExceptions[normalized] ?? normalized)
  return <DevIcon name={iconName} iconClassName={iconClassName} />
}
