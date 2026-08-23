import { closeProjectDatabase, openProjectDatabase, storageHealth } from "./database.mjs";
import { importLegacyHelpSessions, loadHelpSessions, saveHelpSessions } from "./repositories/help.mjs";

export async function initializeHelpStorage(context) {
  const storage = await openProjectDatabase(context);
  try {
    const migration = await importLegacyHelpSessions(storage, context.files.helpSessions);
    return { migration, health: storageHealth(storage) };
  } finally {
    closeProjectDatabase(storage);
  }
}

export async function readProjectHelpSessions(context) {
  const storage = await openProjectDatabase(context);
  try {
    await importLegacyHelpSessions(storage, context.files.helpSessions);
    return loadHelpSessions(storage);
  } finally {
    closeProjectDatabase(storage);
  }
}

export async function writeProjectHelpSessions(context, sessions) {
  const storage = await openProjectDatabase(context);
  try {
    await importLegacyHelpSessions(storage, context.files.helpSessions);
    saveHelpSessions(storage, sessions);
    return loadHelpSessions(storage);
  } finally {
    closeProjectDatabase(storage);
  }
}

export async function projectStorageHealth(context) {
  const storage = await openProjectDatabase(context);
  try {
    return storageHealth(storage);
  } finally {
    closeProjectDatabase(storage);
  }
}
