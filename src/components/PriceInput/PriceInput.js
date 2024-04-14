import React, { useState } from 'react';
import './PriceInput.css';
import { addComma } from '../../utils';

function PriceInput({ value, onChange }) {
    // 創建一個狀態來保存數字和錯誤訊息
    const [errorMessage, setErrorMessage] = useState('不可以為空白');

    function handleInputChange(event) {
        const newValue = event.target.value;
        const newValueWithoutComma = newValue.replace(/,/g, ''); // 刪除所有逗號
        const result = addComma(newValueWithoutComma);

        // 檢查是否為數字
        const isNumeric = /^\d+$/.test(newValueWithoutComma.trim());
        // 如果輸入是數字或者為空，清空錯誤訊息，否則顯示提示訊息
        setErrorMessage(isNumeric || newValueWithoutComma.trim() === '' ? '' : '只能輸入數字');
        // 如果輸入是空，顯示錯誤訊息
        if (newValue.trim() === '') {
            setErrorMessage('不可以為空白');
        }

        onChange({ price: result });
    }

    return (
        <div>
            <div className="testBlock">
                <div className="settingsTitle">入住費用 (每人每晚)</div>
                <div className="settingsBlock">
                    <div className="currencyValue">TWD</div>

                    <input
                        className={`settingsInput ${errorMessage ? 'error' : ''}`} // 添加 error 類名
                        type="text"
                        value={value}
                        onChange={handleInputChange}
                        placeholder="請輸入費用"
                    />
                </div>
                {errorMessage && <div className="errorText">{errorMessage}</div>}
                <div className="hintText">輸入 0 表示免費</div>
            </div>
        </div>
    );
}

export default PriceInput;
