import React, { useState, useEffect } from 'react';
import './AgeGroupSelect.css';
import { getSeqNumArray } from '../../utils';

function Select({ value, limit, isShowError, onChange }) {
    // 設置連續數字陣列
    const numbers = getSeqNumArray(limit);

    return (
        // <select className={`settingsSelect ${isShowError && 'error'}`} value={value} onChange={onChange}>
        <select className={`settingsSelect ${isShowError || value === '' ? 'error' : ''}`} value={value} onChange={onChange}>
            <option value="" hidden></option>
            {numbers.map((num) => {
                return (
                    <option key={num} value={num}>
                        {num}
                    </option>
                );
            })}
        </select>
    );
}

function AgeGroupSelect({ ageGroup, overlapData, onChange }) {
    const [startValue, endValue] = ageGroup;
    const defaultLimit = [0, 20];
    const startLimit = endValue ? [0, endValue] : defaultLimit; // 開始年齡限制
    const endLimit = startValue ? [startValue, 20] : defaultLimit; // 結束年齡限制
    const IsShowAgeMulti = checkIsShowAgeMulti(); // 檢查年齡區間是否重複
    const [isEmptyErrorShown, setIsEmptyErrorShown] = useState(true); // 初始狀態下顯示為 true，表示空值錯誤

    function selectChange(event, type) {
        const value = Number(event.target.value);
        const start = type === 'start' ? value : startValue;
        const end = type === 'end' ? value : endValue;
        onChange({ ageGroup: [start, end] });
    }

    function checkIsShowAgeMulti() {
        const { overlap } = overlapData;
        if (!overlap || overlap.length === 0) return false;
        const sets = overlapData.overlapNumSet;
        const setsArray = Array.from(sets);
        const setFirst = setsArray[0];
        const setLast = setsArray[setsArray.length - 1];
        if (sets?.has(startValue) || sets?.has(endValue)) return true; // 檢查重複年齡數組 是否有設置的起始 / 結束年齡
        if (setFirst > startValue && setLast < endValue) return true; // 檢查重複年齡數組 是否小於設置年齡區間
        return false;
    }

    useEffect(() => {
        // 當 startValue 和 endValue 都不為空時，設置 isEmptyErrorShown 為 false，移除空值錯誤訊息
        if (startValue !== '' && endValue !== '') {
            setIsEmptyErrorShown(false);
        } else {
            setIsEmptyErrorShown(true);
        }
    }, [startValue, endValue]);


    return (
        <div>
            <div className="testBlock">
                <div className="settingsTitle">年齡</div>

                <div className="settingsBlock">
                    <Select
                        value={startValue}
                        limit={startLimit}
                        isShowError={IsShowAgeMulti}
                        onChange={(e) => {
                            selectChange(e, 'start');
                        }}
                    />

                    <div className="and">~</div>

                    <Select
                        value={endValue}
                        limit={endLimit}
                        isShowError={IsShowAgeMulti}
                        onChange={(e) => {
                            selectChange(e, 'end');
                        }}
                    />
                </div>

                {isEmptyErrorShown && <div className="errorText">不可以為空白</div>}
                {IsShowAgeMulti && <div className="errorText">年齡區間不可重疊</div>}
            </div>
        </div>
    );
}

export default AgeGroupSelect;
