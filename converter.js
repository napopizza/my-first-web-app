// ここからコードを書いてください
export function setupConverter() {
  // フォーム全体を取得するのじゃ
  const converterForm = document.querySelector(".converter-form");

  // 入力フィールド（変換したい値）を取得するのじゃ
  const inputValue = document.querySelector(".converter-input");

  // 変換元の単位を選ぶセレクトボックスを取得するのじゃ
  const fromUnit = document.querySelector(".converter-from");

  // 変換先の単位を選ぶセレクトボックスを取得するのじゃ
  const toUnit = document.querySelector(".converter-to");

  // 変換結果を表示する要素を取得するのじゃ
  const result = document.querySelector(".converter-result");

  // 変換できる長さの単位とその基準値を定義するのじゃ
  const lengthUnit = [
    { name: "meter", base: 1 },
    { name: "kilometer", base: 1000 },
    { name: "centimeter", base: 0.01 },
    { name: "millimeter", base: 0.001 },
    { name: "inch", base: 0.0254 },
    { name: "foot", base: 0.3048 },
    { name: "yard", base: 0.9144 },
    { name: "mile", base: 1609.344 },
  ];

  // FromとToのセレクトボックスの選択肢を一度空にするのじゃ
  fromUnit.innerHTML = "";
  toUnit.innerHTML = "";

  // 定義した単位のリストを使って、セレクトボックスに選択肢を追加していくのじゃ
  for (const unit of lengthUnit) {
    fromUnit.innerHTML += `<option value="${unit.base}">${unit.name}</option>`;
    toUnit.innerHTML += `<option value="${unit.base}">${unit.name}</option>`;
  }
  // 最初のオプションを選択するのじゃ（例: Fromをmeter、Toをkilometerに）
  if (fromUnit.options.length > 0) {
    fromUnit.selectedIndex = 0; // 最初の単位を選択
  }
  if (toUnit.options.length > 0) {
    toUnit.selectedIndex = 1; // 2番目の単位を選択
  }
  // 変換を実行する関数を定義するのじゃ
  function convert() {
    // 入力された値を取得し、数値に変換するのじゃ
    const value = parseFloat(inputValue.value);

    // もし入力された値が数値でなければ、エラーメッセージを表示して処理を中断するのじゃ
    if (isNaN(value)) {
      result.textContent = "Please enter a valid number";
      return; // ここで関数を終了する
    }

    // 変換元の単位の基準値（value属性に設定した値）を取得するのじゃ
    const fromBase = fromUnit.value;
    // 変換先の単位の基準値を取得するのじゃ
    const toBase = toUnit.value;

    // 変換計算を行うのじゃ
    // (入力値 * 変換元の基準値) / 変換先の基準値
    const converted = (value * fromBase) / toBase;

    // 結果を小数点以下3桁まで丸めて表示するのじゃ
    // 例: 1000 meter = 1.000 kilometer
    result.textContent = `${value} ${
      lengthUnit[fromUnit.selectedIndex].name
    } = ${converted.toFixed(3)} ${lengthUnit[toUnit.selectedIndex].name}`;

    // フォームのいずれかの入力が変更されたときに、変換関数を実行するのじゃ
    converterForm.addEventListener("input", convert);
  }
  // 初期表示時に一度変換を実行しておくのじゃ
  convert();
}
