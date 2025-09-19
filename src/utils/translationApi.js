// src/utils/translationApi.js
import api from "./axiosInstance";

// 여러 텍스트 (resolve-batch)
export async function translateBatch(items, targetLang) {
  const res = await api.post("/resolve-batch", {
    target_lang: targetLang,
    items
  });
  return res.data;
}

// 단일 텍스트 (resolve)
export async function translateSingle(item, targetLang) {
  const res = await api.post("/resolve", {
    ...item,
    target_lang: targetLang
  });
  return res.data;
}
