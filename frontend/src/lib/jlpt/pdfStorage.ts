// Client-side IndexedDB helper for storing & retrieving JLPT PDF exam files

const DB_NAME = "ANH_SENSEI_JLPT_PDF_DB";
const STORE_NAME = "pdf_files";
const DB_VERSION = 1;

function openPdfDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      return reject(new Error("IndexedDB not available"));
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function savePdfToIndexedDb(key: string, file: Blob): Promise<void> {
  try {
    const db = await openPdfDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(file, key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn("[pdfStorage] Failed to save to IndexedDB:", err);
  }
}

export async function getPdfFromIndexedDb(key: string): Promise<Blob | null> {
  try {
    const db = await openPdfDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn("[pdfStorage] Failed to get from IndexedDB:", err);
    return null;
  }
}

/**
 * Checks whether a URL actually points to a valid PDF file.
 * Returns false if it 404s or returns text/html (Next.js fallback page).
 */
export async function verifyPdfUrl(url: string): Promise<boolean> {
  if (!url) return false;
  if (url.startsWith("blob:") || url.startsWith("data:application/pdf")) return true;

  try {
    const res = await fetch(url, { method: "HEAD" });
    if (!res.ok) return false;
    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("text/html")) {
      return false; // Next.js fallback page, not a real PDF!
    }
    return true;
  } catch {
    return false;
  }
}
