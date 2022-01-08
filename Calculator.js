let line = document.querySelector('#line p')
let res = ''+0
let root = document.querySelector('#root')
let maximize = document.querySelector('#maximize')
let menu = document.querySelector('#menu')
let standart_i = document.querySelector('#standart i')
let f5 = document.querySelector('#closeCalc')

document.querySelector('#close i.fa-close').addEventListener('click', 
  function close(ev){
    if (off) ev.preventDefault()
    root.style.display = 'none'
    f5.style.display = 'block'
})

document.querySelector('#close i.fa-window-minimize').addEventListener('click', (ev) => {
  if (off) ev.preventDefault()
  root.style.display = 'none'
  root.style.opacity = 0
  maximize.style.display = 'flex'
})

document.querySelector('#maximize').addEventListener('click', (ev) => {
  root.style.display = 'block'
  root.style.opacity = 1
  maximize.style.display = 'none'
})

function back(){
  if (off) return
  let l=line.innerText
  if (l.length===1) {
    res = line.innerText = '0'
    return
  }
  res = line.innerText = line.innerText.substring(0, line.innerText.length-1)
}

let saveRes='', saveCnt=0
function save(field) {
  if (off) return
  if (++saveCnt%2===1) {
    field.style.backgroundColor = 'burlywood'
    saveRes=solve()
  }
  else {
    field.style.backgroundColor = '#fff'
    line.innerText = !saveRes ? '0' : saveRes
  }
}

function func() {
  if (line.innerText) res=line.innerText='0'
}

let off=true
function on() {
  off=false
  res=line.innerText='0'
}

function isOff() {
  off=true
  res=line.innerText=''
}

function op_menu1() {
  let d=document.querySelector('#menu_1')
  d.style.display='block'
  d.style.opacity='1'
}

function op_menu2() {
  let d=document.querySelector('#menu_2')
  d.style.display='block'
  d.style.opacity='1'
}

function menu1() {
  let d=document.querySelector('#menu_1')
  d.style.display='none'
}

function menu2() {
  let d=document.querySelector('#menu_2')
  d.style.display='none'
}

function append(val) {
  if (off) return
  let unit=['+','-','/','*','%','.']
  if (res==='0') 
    if (!(val.match(/[0-9]/))) return
    else res=val
  else {
    if (unit.includes(res[res.length-1]) && unit.includes(val)) {
      res[res.length-1]=val
    }
    else res+=val
  }
  line.innerText=res
}

function prod_2() {
  if (off) return
  let res = solve()
  line.innerText = res*res
}

function sqrt() {
  if (off) return
  let res = Math.sqrt(solve())
  if (res === Math.floor(res))
    line.innerText = res
  else
    line.innerText = res.toFixed(10)
}

function equal() {
  if (off) return
  line.innerText = solve()
}

let findNums = (a,b) => {
  let curr=parseFloat(a)
  b.push(curr)
  if (a == curr) return
  findNums(a.substring(a.search(/[+-/*^%]/g)+1), b)
}

function solve() {
  if (off) return
  let numArr=[]
  res=line.innerText
  if (res.search(/[+-/*^%]/g)===-1) return res
  else {
    findNums(res, numArr)
    for(let i=0; i<res.length; i++) {
      if (res[i]==='+') {
        numArr.unshift(numArr.shift()+numArr.shift())
      }
      if (res[i]==='-') {
        numArr.unshift(numArr.shift()-numArr.shift())
      }
      if (res[i]==='*') {
        numArr.unshift(numArr.shift()*numArr.shift())
      }
      if (res[i]==='/') {
        numArr.unshift(numArr.shift()/numArr.shift())
      }
      if (res[i]==='%') {
        numArr.unshift(numArr.shift()%numArr.shift())
      }
      if (res[i]==='^') {
        numArr.unshift(numArr.shift()**numArr.shift())
      }
    }
  }
  return numArr.pop()
}

let menuClick_1=0
let menuClick_2=0
let menu_1=document.querySelector('#menu_1')
let menu_2=document.querySelector('#menu_2')
menu_1.addEventListener('click', function menu_1(ev) {
  if (off) ev.preventDefault()
  menu_1.classList.toggle('disp')
})

menu_2.addEventListener('click', function menu_2(ev) {
  if (off) ev.preventDefault()
  menu_2.classList.toggle('disp')
})

let menuClick=0
document.querySelector('#standart i.fa-bars').addEventListener('click', function menu(ev){
  if (off) ev.preventDefault()
  if (++menuClick%2 === 0) {
    menu.style.marginLeft = '0'
    menu.style.opacity = '0'
    standart_i.classList.add('rotateBack')
    standart_i.classList.remove('rotate')
    }
  else {
    menu.style.marginLeft = '40px'
    menu.style.opacity = '1'
    standart_i.classList.add('rotate')
    standart_i.classList.remove('rotateBack')
  }    
})