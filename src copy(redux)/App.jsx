import React from 'react'
import { incrementAction,decrementAction } from './redux/action_creators.js'
class App extends React.Component{
    // componentDidMount(){
    //     console.log(this.props.store)
    // }
    increment = ()=>{
        let {value} = this.refs.selectNode
        this.props.store.dispatch(incrementAction(value*1))
    }
    decrement = ()=>{
        let {value} = this.refs.selectNode
        this.props.store.dispatch(decrementAction(value*1))
    }
    incrementIfOdd = ()=>{
        let {value} = this.refs.selectNode
        let count = this.props.store.getState()
        if(count % 2 ===1) this.props.store.dispatch(incrementAction(value*1))
        
    }
    incrementAsync = ()=>{
        let {value} = this.refs.selectNode
        setTimeout(()=>{
            this.props.store.dispatch(incrementAction(value*1))
        },1000)
    }
    render(){
        let count = this.props.store.getState()
        return (
            <>
                <h1>当前和为:{count}</h1>
                <select ref="selectNode">
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

export default App