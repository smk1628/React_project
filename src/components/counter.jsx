import React from 'react'
class Counter extends React.Component{
    // componentDidMount(){
    //     console.log(this)
    // }
    increment = ()=>{
        let {value} = this.selectNode
        this.props.increment(value*1)
    }
    decrement = ()=>{
        let {value} = this.selectNode
        this.props.decrement(value*1)
    }
    incrementIfOdd = ()=>{
        let {value} = this.selectNode
        let {count} = this.props
        if(count % 2 ===1) this.props.increment(value*1)
        
    }
    incrementAsync = ()=>{
        let {value} = this.selectNode
        this.props.incrementAsync(value*1,1000)
    }
    render(){
        let {count,person} = this.props
        return (
            <>
                <span>当前和为:{count}</span>&nbsp;&nbsp;
                <span>当前store中存在{person.length}人</span><br/>
                <select ref={(select)=>{this.selectNode = select}}>
                    <option value="1" defaultValue>1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>&nbsp;&nbsp;
                <button onClick={this.increment}>increment</button>&nbsp;&nbsp;
                <button onClick={this.decrement}>decrement</button>&nbsp;&nbsp;
                <button onClick={this.incrementIfOdd}>如果当前和为奇数则加</button>&nbsp;&nbsp;
                <button onClick={this.incrementAsync}>异步加</button>
            </>
        )
    }
}

export default Counter