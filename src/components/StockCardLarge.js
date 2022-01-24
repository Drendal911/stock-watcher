import stockCard from '../styles/components/stockCardLarge.module.scss'

export default function StockCardLarge() {
    return (
        <>
            <div className={stockCard.main_container}>
                <div className={stockCard.card_container}>
                    <div className={stockCard.name}>Amazon.com, Inc.</div>
                    <div className={stockCard.symbol}>AMZN</div>
                    <div className={stockCard.price}>2,852.86 <span className={stockCard.price_span}>
                        USD<div className={stockCard.price_change}>-180.49 (-5.95%) today</div></span>
                    </div>
                </div>
            </div>
        </>
    )
}