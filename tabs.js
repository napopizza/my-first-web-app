// ここからコードを書いてください
// js/tabs.js
export function setupTabs() {
  // ここから要素の取得
  const homeLink = document.querySelector('[data-tab="home"]');
  const converterTab = document.querySelector('[data-tab="converter"]');

  const homeSection = document.getElementById("home");
  const converterSection = document.getElementById("converter");
  // ここまで要素の取得

  // ここからイベントリスナーの設定
  homeLink.addEventListener("click", () => {
    converterSection.classList.add("hidden");
    homeSection.classList.remove("hidden");
  });

  converterTab.addEventListener("click", () => {
    homeSection.classList.add("hidden");
    converterSection.classList.remove("hidden");
  });
  // ここまでイベントリスナーの設定
}
