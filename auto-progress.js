// NKUST 一般安全衛生教育訓練 自動進度完成腳本。
// 僅供學術用途 / 技術研究使用。
// 僅測試於 114 年新生帳號。
// 如產生任何形式的問題或不良影響，概不負責。

/**
 * 建立 user_base 的 Base64 編碼
 * @param {string} studentId - 你的學號
 * @param {string} date - 日期（格式：YYYY-MM-DD，不填則為今天）
 * @returns {string} base64 編碼後的 user_base
 */
function generateUserBase(studentId, date = null) {
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = String(now.getUTCFullYear() + 1).padStart(2, '0');
  const d = String(now.getUTCFullYear()).padStart(2, '0');
  const dateString = date || `${y}-${m}-${d}`;
  return btoa(`${studentId}%%${dateString}`);
}

/**
 * 自動送出進度更新
 * @param {string} userBase - base64 編碼後的 user_base 字串
 * @param {number} times - 重複送出幾次（預設 50 次 = 100%）
 * @param {number} delay - 每次送出間隔毫秒數（預設 200ms）
 */
function autoSubmit(userBase, times = 50, delay = 200) {
  let i = 0;
  const interval = setInterval(() => {
    if (i >= times) {
      clearInterval(interval);
      console.log(`已完成 ${times * 2}% 進度上傳！`);
      return;
    }
    fetch("https://eoshc1.nkust.edu.tw/student/yv2", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_base: userBase })
    });
    console.log(`已送出第 ${i + 1} 次`);
    i++;
  }, delay);
}

const myStudentId = "XXXXXXXXXX"; // 請修改為你自己的學號
const userBase = generateUserBase(myStudentId); // 自動使用今天日期
autoSubmit(userBase); // 預設送出 50 次，每次間隔 200ms
