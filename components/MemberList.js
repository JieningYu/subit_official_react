import Data from "../data/memberlist.json";
import style from "../styles/Join/MemberList.module.css";
import {Component} from "react";
import styles from "../styles/global_components/ImageDescCard.module.css";

function card_cnt_calc(width){////还没有进行适配
    if (width>1225){ return 4; }
    else if (width<=1225 && width>1000){ return 3; }
    else if (width<=1000 && width>680){ return 2; }
    else if (width<=680){ return 1; }
}

class MemberList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:Data
        };
        // console.log("qweweqwe");
        // console.log(this.state.data.current);
        // console.log("this.state.data.currentthis.state.data.current");
    }

    render() {
        return (
            <div className={style.body}>
                <h1 className={style.title}>历届社员列表</h1>
                {
                    this.state.data.current.map(session => (
                        <Session data={session}/>))
                }
                <h1 className={style.sessionTitle}>以下为养老院·荣誉社员</h1>
                {
                    this.state.data.honor.map(session => (
                        <Session data={session}/>))
                }
            </div>
        );
    }
}
export default MemberList;

class Session extends Component {//写出锅了 slice出来没东西传到MemberCard里
    constructor(props) {
        super(props);
        this.state = props;
        this.line_lenth = 4;
        // console.log("prop=")；
        // console.log(this.state.data.member);
    };

    componentDidMount() {
        window.addEventListener("resize", this.resize);
        this.line_lenth = card_cnt_calc(document.body.clientWidth);
    }

    ReSizeMemberCard(member){
        let lenth = member.length;
        let line = Math.ceil((lenth-1)/this.line_lenth);
        for(let i=0;i<line-1;i++){
            let d = member.slice(i*this.line_lenth,i*this.line_lenth+this.line_lenth-1);
            d.map((item) =>(
                <MemberCard data={item}/>
            ));
            // console.log(member.slice(i*this.line_lenth,i*this.line_lenth+this.line_lenth-1));
            // console.log(i*this.line_lenth,i*this.line_lenth+this.line_lenth-1);
            // this.LineMemberList()
        }
        // this.LineMemberList(member.slice(i*this_cnt))
    }

    resize = () => {
        let width = document.body.clientWidth;
        let new_cnt = card_cnt_calc(width);
        if(new_cnt != this.line_lenth) {
            this.line_lenth = new_cnt;
        }
    };

    render(){
        return(
            <div className={style.sessionCard}>
                <h1 className={style.sessionTitle}>{this.state.data.session}</h1>
                {
                    // this.state.data.member.map(i=>(<MemberCard data={i}/>))
                     this.ReSizeMemberCard(this.state.data.member)
                }
            </div>
        );
    }
}

function MemberCard(props){
    // console.log(props);
    return(
        <div className={style.MemberCard}>
            <div className={style.name}>{props.data.name}</div>
            <div className={style.house}>{props.data.house}</div>
        </div>
    );
}