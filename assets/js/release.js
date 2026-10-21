// GitHub の直近のリリースからバージョン名と公開日を取得し、
// data-release-meta を付けた要素に書き込む。
// 取得に失敗した場合は HTML に書いた文言のまま表示する。
(function () {
  var API_URL =
    "https://api.github.com/repos/azimicat/web_site_translate_knitting_pattern_pdf/releases/latest";

  var targets = document.querySelectorAll("[data-release-meta]");
  if (targets.length === 0 || !window.fetch) return;

  fetch(API_URL, { headers: { Accept: "application/vnd.github+json" } })
    .then(function (response) {
      if (!response.ok) throw new Error("GitHub API status " + response.status);
      return response.json();
    })
    .then(function (release) {
      // リリース名は「v1.0.0 (580b820)」の形なので、括弧のコミット ID を外す
      var version = String(release.name || release.tag_name).replace(/\s*\(.*\)\s*$/, "");
      var published = new Date(release.published_at);
      var date =
        published.getFullYear() + " 年 " + (published.getMonth() + 1) + " 月 " + published.getDate() + " 日";

      var asset = (release.assets || []).filter(function (item) {
        return item.name === "KnittingTranslator.zip";
      })[0];
      var size = asset ? "、" + (asset.size / 1024 / 1024).toFixed(1) + " MB" : "";

      var text = "バージョン " + version + "（" + date + "公開" + size + "）";
      targets.forEach(function (element) {
        element.textContent = text;
      });
    })
    .catch(function () {
      // GitHub API の回数制限などで取得できなかったときは何も書き換えない
    });
})();
