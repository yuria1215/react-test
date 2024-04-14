import React, { useState, useEffect } from 'react';
import './AgeGroupPriceList.css';
import PriceInput from '../PriceInput/PriceInput.js';
import AgeGroupSelect from '../AgeGroupSelect/AgeGroupSelect.js';
import { getNumberIntervals } from '../../utils';

const defaultItem = { ageGroup: ['', ''], price: '' }; // 預設初始值
const defaultOverlapData = {
    overlapNumSet: null, // 所有重複數字
    overlap: null, // 重疊區間
    notInclude: null // 未包含區間
};

function AgeGroupPriceList({ onChange }) {
    const [isAddDisabled, setIsAddDisabled] = useState(false); // 新增價格是否 Disabled
    const [priceList, setPriceList] = useState([defaultItem]); // 所有價格設定
    const [overlapData, setOverlapData] = useState(defaultOverlapData); // 年齡重疊相關資料

    // 每當價格列表發生變化時，使用更新後的 priceList 調用 onChange
    useEffect(() => {
        onChange && onChange(priceList);
    }, [priceList, onChange]);


    function addPriceListItem() {
        if (isAddDisabled) return;
        setPriceList((pre) => [...pre, defaultItem]);
    }

    // 設置年齡重疊資料
    function setNewOverlapData(newPiceList) {
        const ageGroups = newPiceList.map((i) => i.ageGroup);
        const newOverlapData = { ...getNumberIntervals(ageGroups) };
        setOverlapData((preOverlap) => ({ ...preOverlap, ...newOverlapData }));
        return newOverlapData;
    }

    function deletePriceListItem(index) {
        const isConfirm = window.confirm('是否確認移除該價格?');
        if (!isConfirm) return;
        const list = priceList.filter((item, i) => i !== index);
        setPriceList(list);
        const newOverlapData = setNewOverlapData(list);

        // 清空時重置
        if (list.length === 0) {
            checkAddButtonDisabled(defaultOverlapData);
            setOverlapData(defaultOverlapData);
        } else {
            checkAddButtonDisabled(newOverlapData);
        }
    }

    function checkAddButtonDisabled(overlapData) {
        const { notInclude } = overlapData;
        const isAddDisabled = notInclude && notInclude.length === 0;
        setIsAddDisabled(isAddDisabled);
    }

    function priceListChange(payload, index) {
        setPriceList((preList) => {
            const newList = [...preList];
            newList[index] = { ...newList[index], ...payload };

            // 設置年齡重疊資料
            const newOverlapData = setNewOverlapData(newList);

            // 設置新增價格 Disabled
            checkAddButtonDisabled(newOverlapData);

            return newList;
        });
    }

    function log() {
        const { overlap, notInclude } = overlapData;
        console.log('result', priceList);
        console.log('overlapData', { overlap, notInclude });
    }

    return (
        <div>
            {priceList.map((item, index) => (
                <div key={index} className="testGroup">
                    <div className="testRowHeader">
                        <div className="testRowTitle">價格設定 - {index + 1}</div>

                        {index > 0 && (
                            <div className="testRowDelete" onClick={() => deletePriceListItem(index)}>
                                X 移除
                            </div>
                        )}
                    </div>

                    <div className="testRow">
                        <AgeGroupSelect
                            ageGroup={item.ageGroup}
                            overlapData={overlapData}
                            onChange={(payload) => priceListChange(payload, index)}
                        />

                        <PriceInput value={item.price} onChange={(payload) => priceListChange(payload, index)} />
                    </div>
                </div>
            ))}

            <div className="testGroupBottom">
                <button className="addTestGroup" onClick={addPriceListItem} disabled={isAddDisabled}>
                    + 新增價格設定
                </button>

                <button className="LogResult" onClick={log}> Log Result </button>
            </div>


        </div>
    );
}

export default AgeGroupPriceList;
