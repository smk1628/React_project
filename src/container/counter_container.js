import Counter from '../components/counter.jsx'
import { incrementAction,decrementAction,incrementAsyncAction } from '../redux/action_creators/count_actions'
import { connect } from 'react-redux'

/* 
//完整写法

function mapStateToProps(state) {   
    //console.log('state:',state) react-redux 会在内部配合redux里的getSate()函数得到的状态值作为state形参的的实参
    return {count:state}
}


function mapDispatchToProps(dispatch) { //react-redux将redux里的dispatch()分发器函数作为dispatch形参的的实参
    //console.log(dispatch)
    return {
        increment:(value)=>{dispatch(incrementAction(value))},
        decrement:(value)=>{dispatch(decrementAction(value))},
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Counter) //向外暴露容器组件



 */





/* 
//简化写法

let mapStateToProps = state => ({count:state})
let mapDispatchToProps = dispatch => ({
    increment:(value)=>{dispatch(incrementAction(value))},
    decrement:(value)=>{dispatch(decrementAction(value))},
}) 
export default connect(mapStateToProps,mapDispatchToProps)(Counter)


*/

//简写
export default connect(
    state => ({count:state.counter,person:state.person}),
    {
        increment:incrementAction,
        decrement:decrementAction,
        incrementAsync:incrementAsyncAction
    }
)(Counter)
