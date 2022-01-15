import React, { Component } from 'react';
import Stack from 'react-bootstrap/Stack';
import Dialog from './Dialog';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
// import Background1 from './static/level/taipei1.jpg';
// import Background2 from './static/level/taipei2.jpg';
// import Background3 from './static/level/kao.jpg';
import Background1 from "./static/level/level1.jpg"
import Background2 from "./static/level/level2.jpg"
import Background3 from "./static/level/level3.jpg"
class Level extends Component{
    constructor(props){
        super(props)
        if(localStorage.getItem("lock")==null){
            localStorage.setItem("lock",0)
        }
        this.lock=localStorage.getItem("lock")
        if(localStorage.getItem("character")==null){
          localStorage.setItem("character",0)
      }
        this.now=localStorage.getItem("character")
    }

    getStyle(level){
       let tmp={}
       tmp.height="100vmin"
       switch(level){
        case 0: tmp.backgroundImage=`url(${Background1})`
        break
        case 1: tmp.backgroundImage=`url(${Background2})`
        break
        case 2: tmp.backgroundImage=`url(${Background3})`
        break
       }
       tmp.backgroundRepeat='no-repeat'
       if(this.lock<level){
        tmp.filter="blur(" + `8` + "px) brightness(0.7)"
       }
    return tmp
    

    }
    textStyle={
        textAlign:'justify'
    }
    render(){
        return <Container  style={this.style}>
            <Row className="text-justify">
                <h1 class="text-center" style={this.textStyle}>
                <Button variant='outline-primary' href='/'>回首頁</Button><Button variant='outline-primary' href='/CharacterShop'>選擇腳色</Button>
                <span >選擇關卡</span>
                </h1></Row>
            <Row className="justify-content-md-center">
            <Col style={this.getStyle(0)}>
            <Dialog say={
                ["故事是發生在傑哥遇到阿偉後，傑哥希望立法院能修法通過同志法，但他走錯地方了來到台北市議會",
                "叫你們負責人給我出來",
                "給我出來(摔東西)",
                "你誰啊",
                "現在都是流氓當家，黑道治國嗎",
                "別著急阿",
                "只要這個法過了",
                "我就給你看些好康的",
                "我這邊有麵包跟水，要不要來我房間喝",
                "流氓都可以喝水的阿",
                "那你要不要先吞曲棍球",
                "我跟你沒甚麼好溝通的了",
                "直接開始吧",
                "讓我看看!!"
                ]
                } 
                whosay={
                    ["前情題要",
                    "傑哥",
                    "傑哥",
                    "王世堅",
                    "王世堅",
                    "傑哥",
                    "傑哥",
                    "傑哥",
                    "傑哥",
                    "王世堅",
                    "王世堅",
                    "傑哥",
                    "傑哥",
                    "傑哥"
                ]
                }
                title='第一關'disabled={true} onClick={()=>this.play(0)}></Dialog>
            </Col>
            <Col style={this.getStyle(1)}>
            <Dialog say={
                ["打跑王世堅後，傑哥繼續尋找疑似立法院的建築物，但傑哥是路癡，於是跑到了台北市政府",
                "那邊那位阿北，請問立法院怎麼走",
                "立法院9點才開門，你8點來幹甚麼",
                "那我先來吃早餐好了，你覺得我要吃藍色的麵包還是綠色的麵包",
                "都不要吃，因為垃圾不分藍綠",
                "我看你是不懂喔，你是不是不知道我是誰",
                "我只知道你頭殼有問題",
                "我跟你沒甚麼好溝通的了",
                "直接開始吧",
                "讓我看看!!"
                ]
                } 
                whosay={
                    ["前情提要",
                    "傑哥",
                    "柯文哲",
                    "傑哥",
                    "柯文哲",
                    "傑哥",
                    "柯文哲",
                    "傑哥",
                    "傑哥",
                    "傑哥"
                ]
                } title='第二關' disabled={this.lock>=1}onClick={()=>this.play(1)}></Dialog>
            </Col>
            <Col style={this.getStyle(2)}>
            <Dialog say={
                ["後來因為在台北遇到太多怪人，韓國榆決定去高雄走走",
                "結果發現了一個禿子在愛河蓋摩天輪，傑哥決定跟蹤他",
                "(過了很久)",
                "人家都說禿子跟著月亮走，現在怎麼是有一個胖子在跟著禿子走",
                "我這裡有剛出爐的麵包，請問你要吃嗎",
                "這看裡來像是放了三天的麵包",
                "如果是愛情摩天輪和麵包，我一定毫不猶豫選擇愛情摩天輪",
                "我看你是不懂喔",
                "這麵包是我親手做的",
                "裡面有我滿滿的愛心",
                "你知道三立電視台為什麼會變成兩立嗎",
                "因為少了一粒良心",
                "而你現在在做的事就像三立電視台",
                "你很勇喔",
                "我跟你沒甚麼好溝通的了",
                "直接開始吧",
                "讓我看看!!"
            ]
                } 
                whosay={
                    ["前情提要",
                    "前情提要",
                    "",
                    "韓國瑜",
                    "傑哥",
                    "韓國瑜",
                    "韓國瑜",
                    "傑哥",
                    "傑哥",
                    "傑哥",
                    "韓國瑜",
                    "韓國瑜",
                    "韓國瑜",
                    "傑哥",
                    "傑哥",
                    "傑哥",
                    "傑哥"
                ]
                } title='第三關' disabled={this.lock>=2}onClick={()=>this.play(2)}></Dialog>
            </Col >
            </Row>
           
            </Container>;
    }
    play(level){
        localStorage.setItem("level",level)
        let playercharacterlist=['傑哥','王世堅','柯文哲','韓國瑜']
        let enemylist=['王世堅','柯文哲','韓國瑜']
        let chr=['','小弟1','','小弟2']
        let hplist=[200,50,400,450]
        let atklist=[[50,20],[50,30],[30,20],[40,40]]
        let skill=[1,0,2,0]
        let HP=[200+Number(localStorage.getItem("bonusHp")),200,200,200]
        let ATK=[[50+Number(localStorage.getItem("bonusAtk")*2),20+Number(localStorage.getItem("bonusAtk"))],[50,20],[50,20],[50,20]]
        chr[0]=playercharacterlist[Number(localStorage.getItem("character"))]
        skill[0]= Number(localStorage.getItem("character"))+1
        localStorage.setItem("round",JSON.stringify(1))
        localStorage.setItem("doge",JSON.stringify(1))
        if(level==0){
            console.log("level 0")
            chr[2]=enemylist[0]
            ATK[2]=atklist[1]
            HP[2]=hplist[1]
            skill[2]=2
            localStorage.setItem("characterName",JSON.stringify(chr))
            localStorage.setItem("skill",JSON.stringify(skill))
            localStorage.setItem("HP",JSON.stringify(HP))
            localStorage.setItem("ATK",JSON.stringify(ATK))
            //TODO
        }else if(level==1){
            console.log("level 1")
            chr[2]=enemylist[1]
            ATK[2]=atklist[2]
            HP[2]=hplist[2]
            skill[2]=3
            localStorage.setItem("characterName",JSON.stringify(chr))
            localStorage.setItem("skill",JSON.stringify(skill))
            localStorage.setItem("HP",JSON.stringify(HP))
            localStorage.setItem("ATK",JSON.stringify(ATK))
        }else if (level==2){
            console.log("level 2")
            chr[2]=enemylist[2]
            ATK[2]=atklist[3]
            HP[2]=hplist[3]
            skill[2]=4
            localStorage.setItem("characterName",JSON.stringify(chr))
            localStorage.setItem("skill",JSON.stringify(skill))
            localStorage.setItem("HP",JSON.stringify(HP))
            localStorage.setItem("ATK",JSON.stringify(ATK))
        }
    }
}
export default Level