function show(){
  document.querySelector('#s1').style.display='inline-block'
  document.querySelector('#s2').style.display='inline-block'
  document.querySelector('#s3').style.display='inline-block'
  document.querySelector('#s4').style.display='inline-block'
  document.querySelector('#s5').style.display='inline-block'
  document.querySelector('#s6').style.display='inline-block'
  document.querySelector('#s7').style.display='inline-block'
  document.querySelector('#s8').style.display='inline-block'
  document.querySelector('#s9').style.display='inline-block'
}

let p1
let p2
function exec() {
  let step=0
  let currPlayer
  let value
  let exit = false
  let arr = new Array(9)
  let player = p1
  let spanArr = document.querySelectorAll('#parent span')
  spanArr.forEach((elem, idx) => {
    elem.addEventListener('click', ev => {
      if (!exit) {
        if (player === p1) {
          value = ev.target.innerText = 'X'
          currPlayer = p1
          player = p2
        }
        else {
          value = ev.target.innerText = 'O'
          currPlayer = p2
          player = p1
        }
        arr.push(value)
        elem.style.backgroundColor = '#f1f1f1'

        if (spanArr[0].innerText===value && spanArr[1].innerText===value && spanArr[2].innerText===value){
          addStyle(currPlayer, spanArr[0], spanArr[1], spanArr[2])
        }
        if (spanArr[3].innerText===value && spanArr[4].innerText===value && spanArr[5].innerText===value){
          addStyle(currPlayer, spanArr[3], spanArr[4], spanArr[5])
        }
        if (spanArr[6].innerText===value && spanArr[7].innerText===value && spanArr[8].innerText===value){
          addStyle(currPlayer, spanArr[6], spanArr[7], spanArr[8])
        }
        if (spanArr[0].innerText===value && spanArr[3].innerText===value && spanArr[6].innerText===value){
          addStyle(currPlayer, spanArr[0], spanArr[3], spanArr[6])
        }
        if (spanArr[1].innerText===value && spanArr[4].innerText===value && spanArr[7].innerText===value){
          addStyle(currPlayer, spanArr[1], spanArr[4], spanArr[7])
        }
        if (spanArr[2].innerText===value && spanArr[5].innerText===value && spanArr[8].innerText===value){
          addStyle(currPlayer, spanArr[2], spanArr[5], spanArr[8])
        }
        if (spanArr[0].innerText===value && spanArr[4].innerText===value && spanArr[8].innerText===value){
          addStyle(currPlayer, spanArr[0], spanArr[4], spanArr[8])
        }
        if (spanArr[2].innerText===value && spanArr[4].innerText===value && spanArr[6].innerText===value){
          addStyle(currPlayer, spanArr[2], spanArr[4], spanArr[6])
        }
      }
      else {
        ev.preventDefault()
      }
      step++
      if (step===9 && !exit) { 
        setTimeout(() => document.querySelector('#draw').style.display = 'block', 1000)
      }
    }, {once: true})
  })
}
  
function addStyle(currPlayer, ...args){
  args.forEach(v => v.style.backgroundColor = '#8d0d0d')
  exit = true
  setTimeout(() => {
    document.getElementById("pik").innerText = `Congratulations!!!   ${currPlayer} won the game`
    document.getElementById("winner").style.display = "block"
  }, 1500)
}

function preLoad(){
  setTimeout(() => {
    document.getElementById("StartAnim").style.display = "none"
    document.getElementById("modal1").style.display = "block"
  }, 1500)
}


let thx_cnt=0
let thanks=document.querySelector('#continue')
let thx_span=document.querySelector('#continue span')
let modal1=document.querySelector('#modal1')
let input1=document.querySelector('#modal1 input')
let modal2=document.querySelector('#modal2')
let input2=document.querySelector('#modal2 input')

input1.addEventListener('keyup', (ev)=>{
  p1=ev.target.value
})
let span1=document.querySelector('#modal1 span')

span1.addEventListener('click', (ev)=>{
  if (!p1) {
    ev.target.style.backgroundColor='rgba(0,0,0,.7)'
    ev.target.innerText='Value is empty'
  }
  else {
    thx_cnt++
    modal1.style.display='none'
    thanks.style.display='block'
  }
})

input2.addEventListener('keyup', (ev)=>{
  p2=ev.target.value
})
let span2=document.querySelector('#modal2 span')

span2.addEventListener('click', (ev)=>{
  if (!p2) {
      ev.target.style.backgroundColor='rgba(0,0,0,.7)'
      ev.target.innerText='Value is empty'
    }
  else {
    if (p2===p1) {
      ev.target.innerText = 'You entered first player name'
      ev.target.style.backgroundColor='rgba(0,0,0,.7)'
    }
    else {
      thx_cnt++
      modal2.style.display='none'
      thanks.style.display='block'
    }
  }
})

thx_span.addEventListener('click', (ev)=>{
  ev.target.style.backgroundColor='rgba(0,0,0,.7)'
  ev.target.innerText='Continue'
  if (thx_cnt===1) {
    thanks.style.display='none'
    modal2.style.display='block'
  }
  else if (thx_cnt===2) {
    thanks.style.display='none'
    exec()
    setTimeout(show, 1500)
  }
})