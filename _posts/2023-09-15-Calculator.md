---
comments: True
layout: post
title: Calculator.md
description: Calculator
type: ccc
courses: {'csse': {'week': 4}, 'csp': {'week': 0}, 'csa': {'week': 0}}
---

%%html
<!DOCTYPE html>
<html lang="en-US"><head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">

<!-- Begin Jekyll SEO tag v2.8.0 -->
<title>JS Calculator | Compci Blogs</title>
<meta name="generator" content="Jekyll v3.9.3" />
<meta property="og:title" content="JS Calculator" />
<meta property="og:locale" content="en_US" />
<meta name="description" content="A common way to become familiar with a language is to build a calculator. This calculator shows off button with actions." />
<meta property="og:description" content="A common way to become familiar with a language is to build a calculator. This calculator shows off button with actions." />
<link rel="canonical" href="http://localhost:4000/teacher/techtalk/home_style" />
<meta property="og:url" content="http://localhost:4000/teacher/techtalk/home_style" />
<meta property="og:site_name" content="Compci Blogs" />
<meta property="og:type" content="article" />
<meta property="article:published_time" content="2023-08-23T00:00:00+00:00" />
<meta name="twitter:card" content="summary" />
<meta property="twitter:title" content="JS Calculator" />
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"BlogPosting","dateModified":"2023-08-23T00:00:00+00:00","datePublished":"2023-08-23T00:00:00+00:00","description":"A common way to become familiar with a language is to build a calculator. This calculator shows off button with actions.","headline":"JS Calculator","mainEntityOfPage":{"@type":"WebPage","@id":"http://localhost:4000/teacher/techtalk/home_style"},"url":"http://localhost:4000/teacher/techtalk/home_style"}</script>
<!-- End Jekyll SEO tag -->

  <link rel="stylesheet" href="/teacher/assets/css/style.css?v=e778c15d187796d21c1ff018884e22a693670a0a">
  <script src="https://code.jquery.com/jquery-1.12.4.min.js" integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ=" crossorigin="anonymous"></script>

  <script src="/teacher/assets/js/respond.js"></script>

    
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
  <!-- start custom head snippets, customize with your own _includes/head-custom.html file -->

<!-- Setup theme-color -->
<!-- start theme color meta headers -->
<meta name="theme-color" content="#353535">
<meta name="msapplication-navbutton-color" content="#353535">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<!-- end theme color meta headers -->


<!-- Setup Google Analytics -->



<!-- You can set your favicon here -->
<!-- link rel="shortcut icon" type="image/x-icon" href="/teacher/favicon.ico" -->

<!-- end custom head snippets -->

</head><body>

  <div class="wrapper">
    <header><header class="site-header">

  <div id="header">
    <nav>
      <ul>
        <li class="fork"><a href="/teacher/">Home</a></li>
        <li class="fork"><a href="/teacher/csse">CSSE</a></li>
        <li class="fork"><a href="/teacher/csp">CSP</a></li>
        <li class="fork"><a href="/teacher/csa">CSA</a></li>
        <li class="fork"><a href="/teacher/blogs">Blogs</a></li>
        <li class="title"><a href="https://github.com/nighthawkcoders/teacher#readme">View On GitHub</a></li>
      </ul>
    </nav>
  </div><!-- end header -->
</header></header>


    <section>
      <!-- 
Hack 0: Right justify result
Hack 1: Test conditions on small, big, and decimal numbers, report on findings. Fix issues.
Hack 2: Add the common math operation that is missing from calculator
Hack 3: Implement 1 number operation (ie SQRT) 
-->

<!-- 
HTML implementation of the calculator. 
-->

<table>
    <tr>
        <td><img src="/teacher//images/logo.png" height="60" title="Frontend" alt="" /></td>
        <td><a href="/teacher/index">Course</a></td>
        <td><a href="/teacher/techtalk/home_style">CalcStyle</a></td>
        <td><a href="/teacher/frontend/home_table">MusicAPI</a></td>
        <td><a href="/teacher/frontend/home_motion">Animation</a></td>
        <td><a href="/teacher/devops/cloud_database">Users</a></td>
    </tr>
</table>

<!-- 
    Style and Action are aligned with HRML class definitions
    style.css contains majority of style definition (number, operation, clear, and equals)
    - The div calculator-container sets 4 elements to a row
    Background is credited to Vanta JS and is implemented at bottom of this page
-->
<style>
  .calculator-output {
    /* calulator output 
      top bar shows the results of the calculator;
      result to take up the entirety of the first row;
      span defines 4 columns and 1 row
    */
    grid-column: span 4;
    grid-row: span 1;
  
    border-radius: 10px;
    padding: 0.25em;
    font-size: 20px;
    border: 5px solid black;
  
    display: flex;
    align-items: center;
  }
</style>

<!-- Add a container for the animation -->
<div id="animation">
  <div class="calculator-container">
      <!--result-->
      <div class="calculator-output" id="output">0</div>
      <!--row 1-->
      <div class="calculator-number">1</div>
      <div class="calculator-number">2</div>
      <div class="calculator-number">3</div>
      <div class="calculator-operation">+</div>
      <!--row 2-->
      <div class="calculator-number">4</div>
      <div class="calculator-number">5</div>
      <div class="calculator-number">6</div>
      <div class="calculator-operation">-</div>
      <!--row 3-->
      <div class="calculator-number">7</div>
      <div class="calculator-number">8</div>
      <div class="calculator-number">9</div>
      <div class="calculator-operation">*</div>
      <!--row 4-->
      <div class="calculator-number">0</div>
      <div class="calculator-number">.</div>
      <div class="calculator-operation">/</div>
       <div class="calculator-clear">A/C</div>
      <!--row 5 -->
      <div class="calculator-equals">=</div>
  </div>
</div>

<!-- JavaScript (JS) implementation of the calculator. -->
<script>
// initialize important variables to manage calculations
var firstNumber = null;
var operator = null;
var nextReady = true;
// build objects containing key elements
const output = document.getElementById("output");
const numbers = document.querySelectorAll(".calculator-number");
const operations = document.querySelectorAll(".calculator-operation");
const clear = document.querySelectorAll(".calculator-clear");
const equals = document.querySelectorAll(".calculator-equals");

// Number buttons listener
numbers.forEach(button => {
  button.addEventListener("click", function() {
    number(button.textContent);
  });
});

// Number action
function number (value) { // function to input numbers into the calculator
    if (value != ".") {
        if (nextReady == true) { // nextReady is used to tell the computer when the user is going to input a completely new number
            output.innerHTML = value;
            if (value != "0") { // if statement to ensure that there are no multiple leading zeroes
                nextReady = false;
            }
        } else {
            output.innerHTML = output.innerHTML + value; // concatenation is used to add the numbers to the end of the input
        }
    } else { // special case for adding a decimal; can't have two decimals
        if (output.innerHTML.indexOf(".") == -1) {
            output.innerHTML = output.innerHTML + value;
            nextReady = false;
        }
    }
}

// Operation buttons listener
operations.forEach(button => {
  button.addEventListener("click", function() {
    operation(button.textContent);
  });
});

// Operator action
function operation (choice) { // function to input operations into the calculator
    if (firstNumber == null) { // once the operation is chosen, the displayed number is stored into the variable firstNumber
        firstNumber = parseInt(output.innerHTML);
        nextReady = true;
        operator = choice;
        return; // exits function
    }
    // occurs if there is already a number stored in the calculator
    firstNumber = calculate(firstNumber, parseFloat(output.innerHTML)); 
    operator = choice;
    output.innerHTML = firstNumber.toString();
    nextReady = true;
}

// Calculator
function calculate (first, second) { // function to calculate the result of the equation
    let result = 0;
    switch (operator) {
        case "+":
            result = first + second;
            break;
        case "-":
            result = first - second;
            break;
        case "*":
            result = first * second;
            break;
        case "/":
            result = first / second;
            break;
        case "√":
            result = Math.pow(first, 1/second);
            break;
        default: 
            break;
    }
    return result;
}

// Equals button listener
equals.forEach(button => {
  button.addEventListener("click", function() {
    equal();
  });
});

// Equal action
function equal () { // function used when the equals button is clicked; calculates equation and displays it
    firstNumber = calculate(firstNumber, parseFloat(output.innerHTML));
    output.innerHTML = firstNumber.toString();
    nextReady = true;
}

// Clear button listener
clear.forEach(button => {
  button.addEventListener("click", function() {
    clearCalc();
  });
});

// A/C action
function clearCalc () { // clears calculator
    firstNumber = null;
    output.innerHTML = "0";
    nextReady = true;
}
</script>

<!-- 
Vanta animations just for fun, load JS onto the page
-->
<script src="/teacher/assets/js/three.r119.min.js"></script>

<script src="/teacher/assets/js/vanta.halo.min.js"></script>

<script src="/teacher/assets/js/vanta.birds.min.js"></script>

<script src="/teacher/assets/js/vanta.net.min.js"></script>

<script src="/teacher/assets/js/vanta.rings.min.js"></script>

<script>
// setup vanta scripts as functions
var vantaInstances = {
  halo: VANTA.HALO,
  birds: VANTA.BIRDS,
  net: VANTA.NET,
  rings: VANTA.RINGS
};

// obtain a random vanta function
var vantaInstance = vantaInstances[Object.keys(vantaInstances)[Math.floor(Math.random() * Object.keys(vantaInstances).length)]];

// run the animation
vantaInstance({
  el: "#animation",
  mouseControls: true,
  touchControls: true,
  gyroControls: true
});
</script>


    </section>

  </div>

</body>


</html>