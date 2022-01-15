import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import img1 from './teach/教學1.png'
import img2 from './teach/胡牌後.png'
import img3 from './teach/結算.png'
import img4 from './teach/算台.png'
class Teach extends Component{
    constructor(props){
        super(props)

    }
    render(){
        return [
            <h1 align="center">新手教學</h1>,
            <p>可以先看基本台麻規則
                <a href="https://zh.wikipedia.org/wiki/%E5%8F%B0%E7%81%A3%E9%BA%BB%E5%B0%87" target="_blank">WIKI</a>
            </p>,
            <h2 align="center">遊戲介紹</h2>,
            <h3>與台灣麻將的不同:</h3>,
            <div>
                <p>移除花牌</p>
                <p>玩家永遠是莊家</p>
                <p>不抓位、算台取見字</p>
                <p>玩家優先順序比電腦大</p>
                <p>移除部分台數(下面將會詳細說明)</p>
            </div>,
            <h3 align="center">遊戲說明</h3>,
            <h5>選擇角色介面</h5>,
            <div>
                <p>一開始玩家可以選擇角色"傑哥"</p>
                <p>其餘角色可在後面關卡打贏最終BOSS後解鎖</p>
                <p>關卡獲得的金錢可以在此升級角色</p>
                <p>每個角色有兩個獨特技能</p>
                <p>技能有著不同的效果及使用時機</p>
                <p>遇到難纏的敵人時，不仿換隻角色吧!</p>
                <p>設有備份檔案到雲端的功能</p>
            </div>,
            <h5>選擇關卡介面(開始遊戲)</h5>,
            <div>
                <p>目前設有三關，打敗前一關BOSS將可以解鎖下一關</p>
                <p>進入關卡前，將會先查看該關卡故事線</p>
            </div>,
            <h5>戰鬥介面</h5>,
            <div>
                <p>進行四回合的遊戲(一圈)</p>
                <p>每回合胡牌的人可以攻擊放槍的人</p>
                <p>如果是自摸，可以一次攻擊全部敵人</p>
                <p>傷害計算方式:角色攻擊力(底)+當前台數*角色攻擊力(台)</p>
                <h2 align="center">以下為說明圖</h2>
                <img class="pict" src={img1}></img>
                <h1 align="center">一回合結束後</h1>
                <img class="pict" src={img2}></img>
                <img class="pict" src={img3}></img>
                <p>結算後玩家血量大於0 and 所有敵人血量小於0即為勝利</p>
                <p>勝利後會獲得固定金錢</p>
                <p>失敗後甚麼都不會損失</p>
            </div>,
            <h1 align="center">台數計算</h1>,
            <p>本遊戲只還原了部分台灣麻將台數，如下:</p>,
            <img src={img4}></img>,
            <p>看到這裡辛苦你了</p>,
            <p>祝你有個美好的遊戲體驗</p>,
            <p>開發者00857115呂宗祐 00857029陳冠樺</p>
        ]
    }
}
export default Teach