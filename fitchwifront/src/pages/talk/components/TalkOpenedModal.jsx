import React, { useEffect } from "react";

function TalkOpenedModal(props) {
    useEffect(() => {
        document.body.style.cssText = `
        position: fixed;
        top: -${window.scrollY}px;
        width: 100%;
        `;
        return () => {
            const scrollY = document.body.style.top;
            document.body.style.cssText = '';
            window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
        };
    }, []);

    function closeModal() {
        props.closeModal();
    }

    return (
        <div className="Modal" onClick={closeModal}>
            <div className="modalBody" onClick={(e) => e.stopPropagation()}>
                <button id="modalCloseBtn" onClick={closeModal}>
                    ✖
                </button>
                {props.children}
            </div>
        </div>
    );
}

export default TalkOpenedModal;