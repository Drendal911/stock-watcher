import toggle from '../styles/components/toggle.module.scss'
import {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";


export default function Toggle() {
    const searchToggle = useRef();
    const toggleStatus = useSelector(stock => stock.companyName);
    const dispatch = useDispatch();


    function toggleSearchSetting() {
        dispatch({type: "toggle", companyName: !toggleStatus});
    }


    return (
        <>
            <div className={toggle.container}>
                <div className={toggle.switch_holder}>
                    <div className={toggle.switch_label}>
                        <span>Search Type:</span>
                    </div>
                    <div className={toggle.switch_toggle}>
                        <input ref={searchToggle} type="checkbox" id="toggle" onChange={toggleSearchSetting}/>
                        <label htmlFor="toggle"/>
                    </div>
                </div>
            </div>
        </>
    )
}