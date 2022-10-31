import modal from '../styles/components/modal.module.scss'
import { useSelector, useDispatch } from "react-redux";


export default function Modal() {
    const showModal = useSelector(stock => stock);
    const dispatch = useDispatch();

    function closeModal() {
        dispatch({
            type: "modal", incModal: {
                showModal: false,
                modalText: ""
            }
        });
    }


    return (
        <>
            {showModal["showModal"] &&
                <div className={modal.modal_show} onClick={closeModal}>
                    <div className={modal.modal_content}>
                        <p>{showModal["modalText"]}</p>
                    </div>
                </div>
            }
        </>
    )
}