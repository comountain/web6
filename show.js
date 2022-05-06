import React from "react";
import { Button } from "antd";
import moment from "moment";
import "../utils/Config"
import '../css/main.css';
import '../css/responsive.css';
import '../css/home.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export class ShowDay extends React.Component{
    constructor(props){
        super(props);
        this.state = {data:moment().format('YYYY-MM-DD HH:mm:ss') ,year:"", month:"",day:"",wher1: "今日还未打卡哟~",wher2: "点我打卡", wher : false};
        localStorage.setItem("whether atten","0");
    }

    componentWillMount() {
        setInterval((function() { 
            var day = moment().day();
            if(day !== this.state.day)
            {
                this.setState({
                    wher1: "今日还未打卡哟~",
                    wher2:"点我打卡",
                    wher: false
                });
                var daka;
                if(this.state.wher == false)
                  daka = "否";
                else
                  daka = "是";
                let obj = {"name": global.user.name,"depart": global.user.depart,"time": this.state.data,"daka": daka};
                localStorage.setItem(global.user.name,JSON.stringify(obj));
            }
            this.setState({
                data:moment().format('YYYY-MM-DD HH:mm:ss'),
                year: moment().year(),
                month: moment().month(),
                day: moment().day()
            })
          }).bind(this), 1000)
    }

    render(){
        const change = () => {
            if(this.state.wher === false)
            {
                this.setState({wher1: "滴~今日已打卡", wher2: "加油！今天没有忘记打卡哟~", wher: true})
                let time = localStorage.getItem("whether atten");
                let num = parseInt(time) + 1;
                localStorage.setItem("whether atten",num+"");
                let obj = {"name": global.user.name,"depart": global.user.depart,"time": moment().format('YYYY-MM-DD'),"daka":"是"};
                localStorage.setItem(global.user.name,JSON.stringify(obj));

            }
            else
                return;
        }
        return(
        <div className="col-sm-4" style={{marginLeft: 0, marginTop: 50, border: "1px", width: "300px"}}> 
            <div className="product-image-wrapper">
                <div className="single-products">
                        <div className="productinfo text-center">  
                            <p><b>{this.state.data}</b></p>      
                            <h3><b>{this.state.wher1}</b></h3>
                            <br></br>
                            <p>最早 09：00 &emsp;&emsp; 最晚：18： 30</p>
                            <p><b>{this.state.wher2}</b></p>
                        </div>
                        <div className="product-overlay">
                            <div className="overlay-content" style={{height: "50px"}}>
                                <Button className="btn btn-default add-to-cart" onClick={change}>点我打卡</Button>
                            </div>
                        </div>
                </div>
            </div>
        </div>
        );
    }
}

export class ShowMonth extends React.Component{
    constructor(props){
        super(props);
        this.state = {num1: "暂无哟~", num2: 0};
    }

    

    render(){
        const {info} = this.props;
        const renew = () => {
            let num = localStorage.getItem("whether atten");
            var str = "暂无哟~";
            if(parseInt(num) > 0)
                str = "已打卡";
            this.setState({num1: num, num2: 0});
        }
        return(
        <div className="col-sm-4" style={{marginLeft: 0, marginTop: 50, borderWidth: "5px", width: "300px"}}> 
            <div className="product-image-wrapper">
                <div className="single-products">
                        <div className="productinfo text-center">  
                            <p><b>本月打卡次数</b></p>      
                            <h3><b>{this.state.num1}</b></h3>
                            <br></br>
                            <p><b>本月迟到次数</b></p>   
                            <b>{this.state.num2}</b>
                        </div>
                        <div className="product-overlay">
                            <div className="overlay-content" style={{height: "50px"}}>
                                <Button className="btn btn-default add-to-cart" onClick={renew}>更新数据</Button>
                            </div>
                        </div>
                </div>
            </div>
        </div>
        );
    }

}

