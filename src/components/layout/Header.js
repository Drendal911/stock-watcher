import header from '../../styles/components/layout/header.module.scss';
import {useState, useEffect} from 'react';

export default function Header() {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        //Save new screen width every time it changes
        window.addEventListener('resize', () => {
            setScreenWidth(window.innerWidth);
        });
    }, [screenWidth]);

    return (
        <div className={header.container}>
            <div className={header.header_card}>
                <div>S&P 500</div>
                <div>$4000</div>
                <div>-150(-1.9%)</div>
            </div>

            <div className={header.header_card}>
                <div>DOW</div>
                <div>$4000</div>
                <div>-150(-1.9%)</div>

            </div>

            {screenWidth > 953 ?
                <div className={header.header_card_special}>
                    <h1>Stock Watch</h1>
                </div> : null}

            <div className={header.header_card}>
                <div>NASDAQ</div>
                <div>$4000</div>
                <div>-150(-1.9%)</div>
            </div>

            <div className={header.header_card}>
                <div>NYSE</div>
                <div>$4000</div>
                <div>-150(-1.9%)</div>
            </div>
        </div>

    )
}