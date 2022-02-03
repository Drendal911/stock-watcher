import header from '../../styles/components/layout/header.module.scss';
import {useState, useEffect} from 'react';
import etradeIcon from '../../images/etradeIcon.png'
import robinhoodIcon from '../../images/Robinhood-Symbol.png'
import ameritradeIcon from '../../images/ameritrade_logo.png'
import fidelityIcon from '../../images/Fidelity-Logo.png'

export default function Header() {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        //Save new screen width every time it changes
        window.addEventListener('resize', () => {
            setScreenWidth(window.innerWidth);
        });
    }, [screenWidth]);

    return (
        <>

            <div className={header.header_card_special}>
                <h1>Stock Watch</h1>
            </div>
            <div className={header.container}>
                <div className={header.icon_container}>
                    <a className={header.trade_link} href={"https://us.etrade.com/"} rel={"noreferrer noopener"}
                       target={"_blank"}>
                        <img src={etradeIcon} alt={"Etrade Icon Link"}>
                        </img>
                    </a>
                </div>
                <div className={header.icon_container}>
                    <a className={header.trade_link} href={"https://robinhood.com/us/en/"} rel={"noreferrer noopener"}
                       target={"_blank"}>
                        <img src={robinhoodIcon} alt={"Robinhood Icon Link"}/>
                    </a>
                </div>
                <div className={header.icon_container}>
                    <a className={header.trade_link} href={"https://www.tdameritrade.com/"} rel={"noreferrer noopener"}
                       target={"_blank"}>
                        <img src={ameritradeIcon} alt={"Ameritrade Icon Link"}/>
                    </a>
                </div>
                <div className={header.icon_container}>
                    <a className={header.trade_link} href={"https://www.fidelity.com/trading/overview"}
                       rel={"noreferrer noopener"}
                       target={"_blank"}>
                        <img src={fidelityIcon} alt={"Fidelity Icon Link"}/>
                    </a>
                </div>
            </div>

        </>
    )
}