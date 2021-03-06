import * as React from 'react'

import {
    Provider,
    useDispatch,
    useSelector,
} from 'react-redux'
import { AnyAction, createStore, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';

/**
 * @returns dispatch 函數
 * 
 * @example
 * const AboutPage = (props: any) => {
 * 
 *  const todo = useWowgoDispatch()
 * 
 *  return (
 *      <button onClick={() => {  dispatch({ type: "INCREMENT", step: 1 }) }}>
 *          INCREMENT
 *      </button>
 *  )
 * 
 */
export const useWowgoDispatch = () => {

    const dispatch = useDispatch()

    return dispatch;
}

/**
 * 
 * @param selector 篩選函數
 * @param equalityFn 判斷篩選函數
 * @returns 篩選過後的狀態值
 * 
 * @example
 * 
 * export interface S {
 *     todo: number
 * }
 * 
 * const AboutPage = (props: any) => {
 * 
 *  const todo = useWowgoSelector<S, number>(state => state.reducer1.todo)
 * 
 *  return (
 *      <p>
 *          {todo}
 *      </p>
 *  )
 * 
 * export default AboutPage
 */
export const useWowgoSelector = <Type, TSelected = unknown>(
    selector: (state: Type) => TSelected,
    equalityFn?: (left: TSelected, right: TSelected) => boolean
): TSelected => {

    const selectValue = useSelector<Type, TSelected>(selector, equalityFn)

    return selectValue;
}


/**
 * 創建 WowgoStore，用以傳入 WowgoProvider
 * @param reducer (initialState: 初始狀態, action: 更新狀態的action) 
 * @example
 * 
 * // 先創建 reducer (reducer1, reducer2...)
 * function reducer1(state = { todo1: 0 }, action) {
 *
 *  switch (action.type) {
 *    case "INCREMENT":
 *      return {
 *        ...state,
 *        todo1: state.todo1 + action.step
 *      };
 *    case "DECREMENT":
 *      return {
 *        ...state,
 *        todo1: state.todo1 - action.step
 *      };
 *    default:
 *      return state;
 *  }
 *}
 * 
 *  const combinedReducer = combineReducers({
 *     reducer1,
 *     reducer2,
 *     ...
 * })
 *
 * const Stroe = createWowgoStore(combinedReducer)
 */
export const createWowgoStore = (reducer: (initialState: any, action: any) => (any)) => createStore(reducer, composeWithDevTools());

export interface ProviderProps {
    /** 
     * 需要使用本Context的所有子組件 
     */
    children?: React.ReactNode;
    /** 
     * 透過 createWowgoStore(reducer) 創建的Store，
     * 註 : reducer: (initialState: any, action: any) => (any) 
    */
    store: Store<any, any>
}

/**
 * 
 * @param props 
 * @returns WowgoProvider
 * 
 * @example
 * const App = () => {
 * return (
 *   <WowgoProvider store={Stroe}>
 *     <Components ... />
 *   </WowgoProvider>
 * );
 * }
 *
 * export default App;
 * 
 */
export const WowgoProvider: React.FC<ProviderProps> = (props) => {
    // console.log(props)
    return (
        <Provider store={props.store}>
            {props.children}
        </Provider>
    )
}
