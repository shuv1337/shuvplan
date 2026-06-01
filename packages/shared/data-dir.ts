/**
 * shuvplan data directory resolution.
 *
 * Priority:
 *   1. SHUVPLAN_DATA_DIR / PLANNOTATOR_DATA_DIR environment variable
 *   2. Default writes: ~/.shuvplan
 *   3. Default reads: ~/.shuvplan, falling back to ~/.plannotator
 *
 * The env override mirrors upstream PLANNOTATOR_DATA_DIR while keeping the
 * fork's compatibility window for existing local data.
 */

import { existsSync, mkdirSync } from "fs";
import { homedir } from "os";
import { dirname, join, resolve } from "path";

export const DATA_DIR_NAME = ".shuvplan";
export const LEGACY_DATA_DIR_NAME = ".plannotator";

function currentHomeDir(): string {
  return process.env.HOME || process.env.USERPROFILE || homedir();
}

function expandDataDir(raw: string): string {
  const home = currentHomeDir();
  if (raw === "~") return home;
  if (raw.startsWith("~/") || raw.startsWith("~\\")) {
    return join(home, raw.slice(2));
  }
  return resolve(raw);
}

export function getPlannotatorDataDir(): string {
  return getDataRootForWrite();
}

export function getDataRootForWrite(): string {
  const envDir = process.env.SHUVPLAN_DATA_DIR?.trim() || process.env.PLANNOTATOR_DATA_DIR?.trim();
  const dir = envDir ? expandDataDir(envDir) : join(currentHomeDir(), DATA_DIR_NAME);
  mkdirSync(dir, { recursive: true });
  return dir;
}

export function getDataRootForRead(): string {
  const envDir = process.env.SHUVPLAN_DATA_DIR?.trim() || process.env.PLANNOTATOR_DATA_DIR?.trim();
  if (envDir) return expandDataDir(envDir);

  const next = join(currentHomeDir(), DATA_DIR_NAME);
  if (existsSync(next)) return next;

  const legacy = join(currentHomeDir(), LEGACY_DATA_DIR_NAME);
  return existsSync(legacy) ? legacy : next;
}

export function getLegacyDataRoot(): string {
  return join(currentHomeDir(), LEGACY_DATA_DIR_NAME);
}

export function getDataDirForWrite(...segments: string[]): string {
  const dir = join(getDataRootForWrite(), ...segments);
  mkdirSync(dir, { recursive: true });
  return dir;
}

export function getDataDirForRead(...segments: string[]): string {
  const envDir = process.env.SHUVPLAN_DATA_DIR?.trim() || process.env.PLANNOTATOR_DATA_DIR?.trim();
  if (envDir) return join(expandDataDir(envDir), ...segments);

  const next = join(currentHomeDir(), DATA_DIR_NAME, ...segments);
  if (existsSync(next)) return next;

  const legacy = join(currentHomeDir(), LEGACY_DATA_DIR_NAME, ...segments);
  return existsSync(legacy) ? legacy : next;
}

export function getDataPathForWrite(...segments: string[]): string {
  const filePath = join(getDataRootForWrite(), ...segments);
  mkdirSync(dirname(filePath), { recursive: true });
  return filePath;
}

export function getDataPathForRead(...segments: string[]): string {
  const envDir = process.env.SHUVPLAN_DATA_DIR?.trim() || process.env.PLANNOTATOR_DATA_DIR?.trim();
  if (envDir) return join(expandDataDir(envDir), ...segments);

  const next = join(currentHomeDir(), DATA_DIR_NAME, ...segments);
  if (existsSync(next)) return next;

  const legacy = join(currentHomeDir(), LEGACY_DATA_DIR_NAME, ...segments);
  return existsSync(legacy) ? legacy : next;
}
