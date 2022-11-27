let outputUpper = document.querySelector('#upper'); //表达式
let outputLower = document.querySelector('#lower'); //结果
math.config({
  number: 'BigNumber'
});

// 输入
function totalfun() {
  if (totcon == 3) lenfun();
  if (totcon == 4) weifun();
  if (totcon == 5) tempfun();
  if (totcon == 6) timefun();
}
let totcon = 0;
function pressNum(e) {
  if (outputLower.innerHTML === '0') outputLower.innerHTML = e.innerHTML;
  else outputLower.innerHTML += e.innerHTML;
  totalfun();
}
// 弹出导航栏
let onset = 1;
let hamburger = document.querySelector(".hamburger");
hamburger.addEventListener("click", function() {
  hamburger.classList.toggle("is-active");
  let cir = document.getElementById("nav");
  if (onset == 1) {
    onset = 0;
    cir.style.left = "0px";
    return;
  }
  if (cir.style.left === "0px") cir.style.left = "-300px";
  else cir.style.left = "0px";
});
// 清空
function pressAllClear() {
  outputUpper.innerHTML = '';
  outputLower.innerHTML = '0';
}
// 删除一位
function pressClear() {
  console.log(outputLower.innerHTML.length);
  if (outputLower.innerHTML.length === 1) outputLower.innerHTML = '0';
  else outputLower.innerHTML = outputLower.innerHTML.slice(0, -1);
  totalfun();
}
// 等于计算
function pressEqual() {
  let exp = outputLower.innerHTML;
  outputUpper.innerHTML = exp;
  exp = exp.replace(/×/g, '*').replace(/÷/g, '/');
  let result;
  try {
    result = eval(exp);
    // 最小到小数点后8位
    if (result.toString().indexOf('.') !== -1) {
      result = result.toFixed(8);
    }
  }
  catch (e) {
    result = 'Error';
  }
  outputLower.innerHTML = result;
}
function clearFluence() {
  hamburger.classList.toggle("is-active");
  document.getElementById("nav").style.left = "-300px"; // 关闭导航栏
  document.getElementsByClassName("output")[0].style.height = "180px"; // 拉高显示框
  document.getElementById("bmi-cover").style.display = "none";
  document.getElementsByClassName("len-cover")[0].style.display = "none"; // 长度转换模块1
  document.getElementsByClassName("len-cover")[1].style.display = "none"; // 长度转换模块2
  document.getElementById("len-grid-cover").style.display = "none"; // 长度转换遮罩
  document.getElementsByClassName("bmi-word")[0].style.display = "none"; // bmi提示信息
  document.getElementsByClassName("wei-cover")[0].style.display = "none"; // 重量转换模块1
  document.getElementsByClassName("wei-cover")[1].style.display = "none"; // 重量转换模块2
  document.getElementsByClassName("temp-cover")[0].style.display = "none"; // 温度转换模块1
  document.getElementsByClassName("temp-cover")[1].style.display = "none"; // 温度转换模块2
  document.getElementsByClassName("time-cover")[0].style.display = "none"; // 时间转换模块1
  document.getElementsByClassName("time-cover")[1].style.display = "none"; // 时间转换模块2
  let equalv = document.getElementById("equal");
  equalv.onclick = pressEqual; // 更改“=”按钮
  equalv.textContent = "=";
}
/*----------------------常规计算器------------------------*/
function normal() {
  totcon = 1;
  clearFluence();
  document.getElementsByClassName("output")[0].style.height = "80px"; //缩短显示框
  outputUpper.innerHTML = ""; outputLower.innerHTML = "0";
}
/*----------------------BMI计算------------------------*/
function bmicalc() {
  totcon = 2;
  clearFluence();
  document.getElementById("bmi-cover").style.display = "block"; // 打开bmi遮罩
  document.getElementsByClassName("output")[0].style.height = "80px"; // 缩短显示框
  document.getElementsByClassName("bmi-word")[0].style.display = "block";
  let equalv = document.getElementById("equal");
  equalv.onclick = bmifun;
  equalv.textContent = "BMI"; // 更改“=”按钮
  pressAllClear(); outputUpper.innerHTML = "";
}
function bmifun() {
  totcon = 2;
  outputUpper.innerHTML = outputLower.innerHTML;
  let tmp = outputLower.innerHTML, pos, result;
  for (let i = 0; i < tmp.length; i++)
    if (tmp[i] === '+') {
      pos = i;
      break;
    }
  let num1 = parseFloat(tmp.slice(0, pos)), num2 = parseFloat(tmp.slice(pos + 1, tmp.length));
  try {
    result = num2 / (num1 * num1);
    if (result.toString().indexOf('.') !== -1) result = result.toFixed(2);
  }
  catch (e) {
    result = 'Error';
  }
  outputLower.innerHTML = result;
}
/*----------------------长度转换------------------------*/
function lenchange() {
  totcon = 3;
  clearFluence();
  document.getElementsByClassName("len-cover")[0].style.display = "block";
  document.getElementsByClassName("len-cover")[1].style.display = "block";
  document.getElementById("len-grid-cover").style.display = "block"; //打开长度转换遮罩
  document.getElementById("bmi-cover").style.display = "block";
  pressAllClear(); outputUpper.innerHTML = "0";
}
function lenfun() {
  totcon = 3;
  let tmp = parseFloat(outputLower.innerHTML);
  let con_former = document.getElementById("len-former"), con_later = document.getElementById("len-later");
  let value_former = con_former.value, value_later = con_later.value;
  let result = length(tmp, value_later).to(value_former);
  outputUpper.innerHTML = result.value;
}
/*----------------------重量转换------------------------*/
function weichange() {
  totcon = 4;
  clearFluence();
  document.getElementsByClassName("wei-cover")[0].style.display = "block";
  document.getElementsByClassName("wei-cover")[1].style.display = "block";
  document.getElementById("len-grid-cover").style.display = "block"; //打开长度转换遮罩
  document.getElementById("bmi-cover").style.display = "block";
  pressAllClear(); outputUpper.innerHTML = "0";
}
function weifun() {
  totcon = 4;
  let tmp = parseFloat(outputLower.innerHTML);
  let con_former = document.getElementById("wei-former"), con_later = document.getElementById("wei-later");
  outputUpper.innerHTML = getWeight(tmp, con_former.value, con_later.value);
}
function getWeight(num, unitname, outunitname) {
  var fRate = {
  ng: { ng: 1, ug: 0.001, mg: 0.001 * 0.001, g: 0.001 * 0.001 * 0.001, kg: 0.001 * 0.001 * 0.001 * 0.001, t: 0.001 * 0.001 * 0.001 * 0.001 * 0.001, ul: 0.001 * 0.001, ml: 0.001 * 0.001 * 0.001, L: 0.001 * 0.001 * 0.001 * 0.001 },
  ug: { ng: 1000, ug: 1, mg: 0.001, g: 0.001 * 0.001, kg: 0.001 * 0.001 * 0.001, t: 0.001 * 0.001 * 0.001 * 0.001, ul:0.001, ml:0.001 * 0.001, L:0.001 * 0.001 * 0.001 },
  mg: { ng: 1000 * 1000, ug: 1000, mg: 1, g: 0.001, kg: 0.001 * 0.001, t:0.001 * 0.001 * 0.001, ul:1, ml: 0.001, L: 0.001 * 0.001 },
  g: { ng: 1000 * 1000 * 1000, ug: 1000*1000, mg: 1000, g: 1, kg: 0.001, t: 0.001 * 0.001, ul: 1000 , ml: 1, L: 0.001 },
  kg: { ng: 1000 * 1000 * 1000 * 1000, ug: 1000 * 1000, mg: 1000, g: 1000, kg: 1, t: 0.001 , ul: 1000 * 1000 , ml: 1000, L: 1 },
  t: { ng: 1000 * 1000 * 1000 * 1000 * 1000, ug: 1000 * 1000 * 1000, mg: 1000 * 1000, g: 1000 * 1000, kg: 1000, t: 1, ul: 1000 * 1000 * 1000, ml: 1000 * 1000, L: 1000 },
  ml: { ng: 1000 * 1000 * 1000, ug: 1000 * 1000, mg: 1000, g: 1, kg: 0.001, t: 0.001 * 0.001, ml: 1, ul: 1000 , L: 0.001 },
  ul: { ng: 1000 * 1000, ug: 1000, ml: 1, g: 0.001, kg: 0.001 * 0.001, t: 0.001 * 0.001 * 0.001, ml: 0.001, ul: 1, L: 0.001 * 0.001 },
  L: { ng: 1000 * 1000 * 1000 * 1000, ug: 1000 * 1000, mg: 1000, g: 1000, kg: 1, t: 0.001, ul: 1000 * 1000, ml: 1000, L: 1 },
  };
  return (num * fRate[outunitname][unitname]).toFixed(4);
};
/*----------------------温度转换------------------------*/
function tempchange() {
  totcon = 5;
  clearFluence();
  document.getElementsByClassName("temp-cover")[0].style.display = "block";
  document.getElementsByClassName("temp-cover")[1].style.display = "block";
  document.getElementById("len-grid-cover").style.display = "block"; //打开长度转换遮罩
  document.getElementById("bmi-cover").style.display = "block";
  pressAllClear(); outputUpper.innerHTML = "0";
}
function tempfun() {
  totcon = 5;
  let tmp = parseFloat(outputLower.innerHTML);
  let con_former = document.getElementById("temp-former"), con_later = document.getElementById("temp-later");
  console.log(con_former.value); console.log(con_later.value);
  if (con_later.value === 'C') {
    if (con_former.value === 'C') {outputUpper.innerHTML = tmp; return;}
    if (con_former.value === 'F') {outputUpper.innerHTML = parseFloat(tmp * 1.8 + 32); return;}
    if (con_former.value === 'K') {outputUpper.innerHTML = parseFloat(tmp + 273.15); return;}
  }
  if (con_later.value === 'F') {
    if (con_former.value === 'C') {outputUpper.innerHTML = parseFloat((tmp - 32) / 1.8); return;}
    if (con_former.value === 'F') {outputUpper.innerHTML = tmp; return;}
    if (con_former.value === 'K') {outputUpper.innerHTML = parseFloat((tmp - 32) / 1.8 + 273.15); return;}
  }
  if (con_later.value === 'K') {
    if (con_former.value === 'C') {outputUpper.innerHTML = parseFloat(tmp - 273.15); return;}
    if (con_former.value === 'F') {outputUpper.innerHTML = parseFloat((tmp - 273.15) * 1.8 + 32); return;}
    if (con_former.value === 'K') {outputUpper.innerHTML = tmp; return;}
  }
}
/*----------------------时间转换------------------------*/
function timechange() {
  totcon = 6;
  clearFluence();
  document.getElementsByClassName("time-cover")[0].style.display = "block";
  document.getElementsByClassName("time-cover")[1].style.display = "block";
  document.getElementById("len-grid-cover").style.display = "block"; //打开长度转换遮罩
  document.getElementById("bmi-cover").style.display = "block";
  pressAllClear(); outputUpper.innerHTML = "0";
}
function timefun() {
  totcon = 6;
  let tmp = parseFloat(outputLower.innerHTML);
  let con_former = document.getElementById("time-former"), con_later = document.getElementById("time-later");
  outputUpper.innerHTML = getTime(tmp, con_former.value, con_later.value);
}
function getTime(num, unit1, unit2) {
  let f = {
    us: {us: 1, ms: 0.001, s: 0.001 * 0.001, min: 0.001 * 0.001 / 60, h: 0.001 * 0.001 / 60 / 60, day: 0.001 * 0.001 / 60 / 60 / 24, week: 0.001 * 0.001 / 60 / 60 / 24 / 7, year: 0.001 * 0.001 / 60 / 60 / 24 / 7 / 365},
    ms: {us: 1000, ms: 1, s: 0.001, min: 0.001 / 60, h: 0.001 / 60 / 60, day: 0.001 / 60 / 60 / 24, week: 0.001 / 60 / 60 / 24 / 7, year: 0.001 / 60 / 60 / 24 / 7 / 365},
    s: {us: 1000 * 1000, ms: 1000, s: 1, min: 60, h: 60 / 60, day: 60 / 60 / 24, week: 60 / 60 / 24 / 7, year: 60 / 60 / 24 / 7.0 / 365},
    min: {us: 1000 * 1000 * 60, ms: 1000 * 60, s: 60, min: 1, h: 60, day: 60 / 24, week: 60 / 24 / 7, year: 60 / 24 / 7.0 / 365},
    h: {us: 1000 * 1000 * 60 * 60, ms: 1000 * 60 * 60, s: 60 * 60, min: 60, h: 1, day: 24, week: 24 / 7, year: 24 / 7.0 / 365},
    day: {us: 1000 * 1000 * 60 * 60 * 24, ms: 1000 * 60 * 60 * 24, s: 60 * 60 * 24, min: 60 * 24, h: 24, day: 1, week: 7, year: 7.0 / 365},
    week: {us: 1000 * 1000 * 60 * 60 * 24 * 7, ms: 1000 * 60 * 60 * 24 * 7, s: 60 * 60 * 24 * 7, min: 60 * 24 * 7, h: 24 * 7, day: 7, week: 1, year: 365},
    year: {us: 1000 * 1000 * 60 * 60 * 24 * 7 * 365, ms: 1000 * 60 * 60 * 24 * 7 * 365, s: 60 * 60 * 24 * 7 * 365, min: 60 * 24 * 7 * 365, h: 24 * 7 * 365, day: 365, week: 365 / 7, year: 1},
  };
  return (num * f[unit2][unit1]).toFixed(4);
}

/*----------------------符号操作------------------------*/
function pressOperator(e) {
  let lastOperator = outputLower.innerHTML.slice(-1);
  if (lastOperator === '+' || lastOperator === '-' || lastOperator === '×' || lastOperator === '÷') {
    output.innerHTML = outputLower.innerHTML.slice(0, -1) + e.innerHTML;
  } else {
    outputLower.innerHTML += e.innerHTML;
  }
  totalfun();
}
function pressDot() {
  outputLower.innerHTML += '.';
  totalfun();
}
function pressBracket(e) {
  outputLower.innerHTML += e.innerHTML;
}
/*----------------------连接键盘------------------------*/
document.addEventListener('keydown', function (e) {
  switch (e.key) {
    case '0': pressNum(document.querySelector('button:nth-child(2)')); break;
    case '1': pressNum(document.querySelector('button:nth-child(5)')); break;
    case '2': pressNum(document.querySelector('button:nth-child(6)')); break;
    case '3': pressNum(document.querySelector('button:nth-child(7)')); break;
    case '4': pressNum(document.querySelector('button:nth-child(9)')); break;
    case '5': pressNum(document.querySelector('button:nth-child(10)')); break;
    case '6': pressNum(document.querySelector('button:nth-child(11)')); break;
    case '7': pressNum(document.querySelector('button:nth-child(13)')); break;
    case '8': pressNum(document.querySelector('button:nth-child(14)')); break;
    case '9': pressNum(document.querySelector('button:nth-child(15)')); break;
    case '+': pressOperator(document.querySelector('button:nth-child(4)')); break;
    case '-': pressOperator(document.querySelector('button:nth-child(8)')); break;
    case '*': pressOperator(document.querySelector('button:nth-child(12)')); break;
    case '/': pressOperator(document.querySelector('button:nth-child(16)')); break;
    case '.': pressDot(); break;
    case '(': pressBracket(document.querySelector('button:nth-child(18)')); break;
    case ')': pressBracket(document.querySelector('button:nth-child(19)')); break;
    case 'Enter': e.preventDefault(); pressEqual(); break;
    case 'Backspace': pressClear(); break;
    case 'Escape': pressAllClear(); break;
  }
});