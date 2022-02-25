<template>
    <div class="greeting show">
    <div class="greeting__first">
        <h2>Привет!</h2>
        <p>Спасибо, что заглянули на мою персональную страницу соискателя!</p>
        <p>Информация ниже расскажет об управлении и&nbsp;производительности на вашем устройстве, относительно которых была оптимизирована эта страница.</p>
           
    </div>
    <div class="greeting__control">
        <h3>Управление</h3>
        <p>—</p>
    </div>
    <div class="greeting__performance">
        <h3>Производительность</h3>
        <p>N/A</p>

        <div class="greeting__performance-detail">
            <div>Текущая оценка: <b>N/A</b></div>
            <div class="note">
                <div><b style="color:lime"> &lt; 750</b> <span>Высокая <small>(Рабочие станции, ноутбуки, планшеты)</small></span></div>
                <div><b style="color:orange">750 — 1500</b> <span>Средняя <small>(Смартфоны, планшеты, устаревшие компьютеры)</small></span></div>
                <div><b style="color:red">> 1500</b> <span>Низкая <small>(Устаревшие устройства, микрокомпьютеры)</small></span></div>
            </div>
        </div>
    </div>
    <div class="greeting__accept">
        <button class="close">Хорошо</button>
    </div>
    <div class="greeting__close close">&nbsp;</div>
</div>

</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
#manual {
    position: fixed;
    z-index: 12;
    background: radial-gradient(#000E, #111F);
    border:dotted 1px #fff5;
    box-shadow: 0 -15px 15px #000;
    left:25px;
    right:25px;
    top:25px;
    bottom:25px;
    padding: 3vw;
    font-size: 16px;
    font-weight: 300;
    letter-spacing: 0.05em;
    display: none;
    justify-content: flex-start;
    flex-wrap: wrap;
    cursor: default;
    transition: opacity 0.5s ease;

    h2, 
    h3 {
        font-family:'Myriad Pro', 'Proxima Nova';
        text-transform: uppercase;
        color: #f70;
        font-weight: normal;
    }

    h2 {
        font-size: 36px;
        margin:0;
        &::after {
            content: ': )';
            color: #fff;
            display: inline-block;
            transform: rotate(45deg);
            color: #fff;
            margin-left: 20px;
        }
    }
    
    h3 {
        font-size: 20px;
        margin-top: 45px;
    }

    &.show {
        display: flex;
    }

}

.greeting__first {
    width: 100%;
}
.greeting__control {
    width: 65%;
    max-width: 929px;
}
.greeting__performance {
    width: calc(35% - 5vw);
    margin-left: 5vw;
}

.greeting__performance p span {
    display: block;
    margin-top: 15px;
}

.greeting .greeting__performance p span {
    font-weight: 100;
    position: relative;
    padding-left: 40px;
}
.greeting .greeting__performance p span::before {
    content: '';
    position: absolute;
    left: 0;
    width: 24px;
    height: 24px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 12px;
    margin-top: -1px;
}

.greeting .greeting__performance p.fast span::before {content: url(images/ok.png);}
.greeting .greeting__performance p.normal span::before {content: url(images/ok.png);}
.greeting .greeting__performance p.middle span::before {content: url(images/middle.png);}
.greeting .greeting__performance p.slow span::before,
.greeting .greeting__performance p.veryslow span::before {content: url(images/low.png);}

.greeting__performance-detail {
    margin-top: 25px;
    color: #aaa;
}

.greeting__performance-detail div {
    margin-top: 7px;
}

.greeting__performance-detail .note {
    display: flex;
    justify-content:space-between;
 }
 .greeting__performance-detail .note div {
     width: 30%;
     font-size: 15px;
 }
 .greeting__performance-detail .note div b {
    display: block;
    margin-bottom: 7px;
 }

 .greeting__performance-detail .note div small {
     font-size: 13px;
     display: block;
     margin-top: 7px;
 }

.greeting__accept {
    width: 100%;
    text-align: center;
    padding-top:50px;
}


.greeting__accept button {
    background: none;
    border: solid 1px #fff9;
    border-radius: 5px;
    padding: 10px 25px;
    color: #fff;
    font-size: 18px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    font-family: 'Myriad Pro', 'Proxima Nova';
    text-shadow: 0 0 15px #00577c, 0 0 15px #00577c, 0 0 10px #006a97, 0 0 5px #0071a1;
    box-shadow: 0 0 29px #00577c, 0 0 20px #00577c, 0 0 10px #006f9e inset, 0 0 3px #00577c inset;
    transition: all 0.5s ease;
    cursor: pointer;
}/*#1891d*/

.greeting__accept button:hover {
/*     text-shadow: 0 0 15px #f00, 0 0 15px #f00, 0 0 10px #f00, 0 0 5px #f00;
    box-shadow: 0 0 29px #f009, 0 0 20px #f009, 0 0 10px #f009 inset, 0 0 3px #f009 inset; */
    text-shadow: 0 0 15px#0f09, 0 0 15px #0f09, 0 0 10px #0f09, 0 0 5px #0f09;
    box-shadow: 0 0 29px #0f05, 0 0 20px #0f05, 0 0 10px #0f05 inset, 0 0 3px #0f05 inset;
    animation: wow 0.5s ease forwards;
}


@keyframes wow {
    100% {transform: scale(1.1);}
    95% {transform: scale(1.125);}
    85% {transform: scale(1.075);}
    72% {transform: scale(1.15);}
    55% {transform: scale(1.05);}
    30% {transform: scale(1.2);}
}

.greeting__control img {
    width: 100%;
}

.greeting__close {
    position: absolute;
    right: 20px;
    top: 20px;
    width: 30px;
    height: 30px;
    cursor: pointer;
}

.greeting__close::before,
.greeting__close::after {
    content:'';
    position: absolute;
    display:block;
    width: 30px;
    height: 2px;
    background: #fff;
    transform: rotate(45deg);
    top: 14px;
    left:0;
    box-shadow: 0 0 29px #00577c, 0 0 20px #00577c, 0 0 10px #00608a, 0 0 5px #006f9e, 0 0 2px #0072a3;
}
.greeting__close::after {
    transform: rotate(-45deg);
}

.greeting__close:hover::before,
.greeting__close:hover::after {
    box-shadow: 0 0 29px #f00, 0 0 20px #f00, 0 0 10px #f00, 0 0 5px #f00, 0 0 2px #f00;

} 



.greeting h2, 
.greeting h3 {
    font-family:'Myriad Pro', 'Proxima Nova';
    text-transform: uppercase;
    color: #f70;
    font-weight: normal;
}

.greeting h2 {
    font-size: 36px;
    margin:0;
}
.greeting h2::after {
    content: ': )';
    color: #fff;
    display: inline-block;
    transform: rotate(45deg);
    color: #fff;
    margin-left: 20px;
}
.greeting h3 {
    font-size: 20px;
    margin-top: 45px;
}

</style>